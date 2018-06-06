import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EmailService } from './email.service';
import { Signer } from '@model/signer.model';
import { Document } from '@model/document.model';

declare let require: any;
declare var window: any;

let _ = require('lodash');
let Web3 = require('web3');
let ethers = require('ethers');
let contract = require('truffle-contract');
const CANSIGN = require('cansign.v1.abi');

@Injectable()
export class EthereumService {

  web3: any

  ETHAddress: string

  networkType: string

  networkURL: string = 'https://ropsten.etherscan.io' // ropsten
  // networkURL: string = 'https://etherscan.io' // prod

  apiURL: string = 'https://ropsten.etherscan.io/api' // ropsten
  // apiURL: string = 'https://api.etherscan.io/api' // prod

  apiKey: string = 'TX6HH57IVP95H4SWRM97SY57AAHA24KAXU'

  contractAddress: string = '0x7b0e7c7420de7bc53d10cf50d9ef11745d429644'; // local
  // contractAddress: string = '0xfb0a401e0b124323fa57f66d0c9a962759289af5'; // ropsten

  CanSignContract: any


  onPublishDocument: Subject<any> = new Subject<any>()

  onSignDocument: Subject<any> = new Subject<any>()

  onETHAddress: Subject<any> = new Subject<any>()

  onContractInstanceReady: Subject<any> = new Subject<any>()

  onSignatureDenial: Subject<any> = new Subject<any>()

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private email: EmailService) {}

  resolve(){
    if (!this.web3) {
      this.initWeb3();
    }

    if (!this.CanSignContract) {
      this.setContract();
    }
  }

  initWeb3(){
    this.setWeb3Provider();
    this.getETHAddress();
    this.getNetworkType();
  }

  openPublishDocumentModal(){
    this.onPublishDocument.next({
      displayPublishDocumentModal: true,
      onBeforePublish: true,
      onError: false,
      onPublishing: false,
      onAfterPublishing: false,
    });
  }

  openSignDocumentModal(){
    this.onSignDocument.next({
      displaySignDocumentModal: true,
      onBeforeSign: true,
      onError: false,
      onSigning: false,
      onAfterSigning: false,
    });
  }


  canSignDocument(docId: string){
    this.getETHAddress()

    let contract = this.CanSignContract

    let canSignDocument = false

    let result = {
      creator: {
        ETHAddress: null
      },
      signers: []
    }

    return new Promise((resolve, reject) => {
      contract.getDocumentCreator(docId).then(creator => {
        console.log(creator)
        result.creator.ETHAddress = creator

        contract.getDocumentSigners(docId).then(signers => {
          console.log(signers)
          signers.push(creator)

          canSignDocument = signers.map(address => address.toUpperCase()).indexOf(this.ETHAddress.toUpperCase()) != -1;

          signers.pop()

          if (!canSignDocument) reject(false)

          result.signers = signers

          return resolve(result)
        })
      })
    })
  }

  signDocument(document){
    console.log(document);

    this.initWeb3();

    let txOptions = {
      from: this.ETHAddress,
      to: this.contractAddress,
      gas: 6000000,
      gasPrice: 21000000000,
    };

    let hash = document.hash;
    let signatureTimestamp = (new Date()).getTime();
    let signerEmail = document.signers[this.ETHAddress.toUpperCase()].email;

    this.CanSignContract.sign.estimateGas(
      hash,
      signatureTimestamp,
      signerEmail,
      txOptions).then(gas => {
        txOptions.gas = gas;

        this.onSigning();

        this.CanSignContract.sign(
          hash,
          signatureTimestamp,
          signerEmail,
          txOptions).then(receipt => {
            console.log(receipt);
            this.onAfterSigning(receipt, document);
            // TODO Store txn in database linked to user eth address and doc hash
          }).catch(error => {
            console.log(error);
            this.onSignError();
          });

      }).catch(error => {
        console.log(error);
        this.onSignError();
      });
  }

  onSigning(){
    this.onSignDocument.next({
      displaySignDocumentModal: true,
      onBeforeSign: false,
      onError: false,
      onSigning: true,
      onAfterSigning: false,
    });
  }

  onAfterSigning(receipt, document){
    let signer = document.signers[this.ETHAddress.toUpperCase()]
    signer.tx = receipt.tx
    signer.status = Signer.STATUS_SIGNED

    this.ls.updateDocument(document.hash, document)

    this.onSignDocument.next({
      displaySignDocumentModal: true,
      onBeforeSign: false,
      onError: false,
      onSigning: false,
      onAfterSigning: true,
      receipt: receipt,
      currentFile: document,
    });

    // TODO notify creator that document has been signed by signer
  }

  onSignError(){
    this.onSignDocument.next({
      displaySignDocumentModal: true,
      onBeforeSign: false,
      onError: true,
      onSigning: false,
      onAfterSigning: false,
    });
  }



  publishDocument(document) {
    console.log(document);

    let txOptions = {
      from: this.ETHAddress,
      to: this.contractAddress,
      gas: 6000000,
      gasPrice: 21000000000,
    };

    let hash = document.hash;
    let name = document.name;
    let lastModified = document.lastModified;
    let uploadedAt = document.uploadedAt;
    let expirationDate = 0;
    let signers = _.flatMap(document.signers, signer => {
      return signer.ETHAddress;
    });

    console.log(hash, expirationDate, signers);

    this.CanSignContract.addDocument.estimateGas(
      hash,
      name,
      lastModified,
      uploadedAt,
      expirationDate,
      signers,
      txOptions).then(gas => {
        txOptions.gas = gas;

        this.onPublishing();

        // TODO contract should return error event if document hash already exists

        this.CanSignContract.addDocument(
          hash,
          name,
          lastModified,
          uploadedAt,
          expirationDate,
          signers,
          txOptions).then(receipt => {
            console.log(receipt);
            this.onAfterPublishing(receipt, document);
            // TODO Store txn in database linked to user eth address and doc hash
          }).catch(error => {
            console.log(error);
            this.onPublishError();
          });

      }).catch(error => {
        console.log(error);
        this.onPublishError();
      });
  }

  onPublishing(){
    this.onPublishDocument.next({
      displayPublishDocumentModal: true,
      onBeforePublish: false,
      onError: false,
      onPublishing: true,
      onAfterPublishing: false,
    });
  }

  onAfterPublishing(receipt, document){
    let currentFile = this.ls.getFile(document.hash);
    currentFile.creator.ETHAddress = this.ETHAddress
    currentFile.tx = receipt.tx;
    currentFile.status = Document.STATUS_PUBLISHED;

    this.ls.storeFile(document.hash, currentFile);
    this.ls.updateDocument(document.hash, currentFile);

    this.onPublishDocument.next({
      displayPublishDocumentModal: true,
      onBeforePublish: false,
      onError: false,
      onPublishing: false,
      onAfterPublishing: true,
      currentFile: currentFile,
      receipt: receipt,
    });

    this.email.onAfterPublishing(currentFile);
  }

  onPublishError(){
    this.onPublishDocument.next({
      displayPublishDocumentModal: true,
      onBeforePublish: false,
      onError: true,
      onPublishing: false,
      onAfterPublishing: false,
    });
  }

  setContract() {
    if (this.CanSignContract) {
      return new Promise((resolve, reject) => {
        resolve(this.CanSignContract)
      })
    }

    console.log(CANSIGN);

    let c = contract({abi: CANSIGN.abi})

    c.setProvider(this.web3.currentProvider)

    return c.at(this.contractAddress).then(instance => {

      console.log(instance)
      this.CanSignContract = instance
      this.onContractInstanceReady.next(instance)
    }).catch(error => console.log(error))
  }

  setWeb3Provider() {
    return new Promise((resolve, reject) => {
      if (this.web3) resolve(this.web3)

      this.web3 = new Web3(Web3.givenProvider)
      console.log(this.web3)
    })
  }

  getETHAddress(){
    return new Promise((resolve, reject) => {
      if (this.ETHAddress) {
        resolve(this.ETHAddress)
      }

      this.web3.eth.getAccounts().then(accounts => {
        console.log(accounts)
        resolve(accounts[0])
        this.ETHAddress = accounts[0]
        this.onETHAddress.next(this.ETHAddress)
      })
    })
  }

  getNetworkType(){
    return this.web3.eth.net.getNetworkType().then(type => {
      this.networkType = type;
    }).catch(console.log);
  }
}
