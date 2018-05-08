import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { EmailService } from './email.service';

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

  networkURL: string = 'https://ropsten.etherscan.io'

  // contractAddress: string = '0xbae44c16eb3365d35c4bed1cdb0d12fbdddd7b39'; // local
  contractAddress: string = '0x16094108ea1291004876430d9e9c71bd53cb8a1e'; // ropsten

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
    let currentFile = this.ls.getFile(document.hash);
    currentFile.signers[this.ETHAddress.toUpperCase()].tx = receipt.tx;
    currentFile.signers[this.ETHAddress.toUpperCase()].status = 'signed';

    let allSignersHaveSigned = _.every(currentFile.signers, 'tx');
    if (allSignersHaveSigned) {
      currentFile.status = 'signed';

      // TODO notify creator that document has been signed by all signers
    }

    this.ls.storeFile(document.hash, currentFile);

    this.onSignDocument.next({
      displaySignDocumentModal: true,
      onBeforeSign: false,
      onError: false,
      onSigning: false,
      onAfterSigning: true,
      receipt: receipt,
      currentFile: currentFile,
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
    let expirationDate = 0;
    let signers = _.flatMap(document.signers, signer => {
      return signer.ETHAddress;
    });

    console.log(hash, expirationDate, signers);

    this.CanSignContract.addDocument.estimateGas(
      hash,
      expirationDate,
      signers,
      txOptions).then(gas => {
        txOptions.gas = gas;

        this.onPublishing();

        this.CanSignContract.addDocument(
          hash,
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
    currentFile.tx = receipt.tx;
    currentFile.status = 'published';

    this.ls.storeFile(document.hash, currentFile);

    this.onPublishDocument.next({
      displayPublishDocumentModal: true,
      onBeforePublish: false,
      onError: false,
      onPublishing: false,
      onAfterPublishing: true,
      currentFile: currentFile,
      receipt: receipt,
    });

    this.email.onAfterPublishing(document);
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
    console.log(CANSIGN);

    let c = contract({abi: CANSIGN.abi});

    c.setProvider(this.web3.currentProvider);

    return c.at(this.contractAddress).then(instance => {
      console.log(instance);
      this.CanSignContract = instance;
      this.onContractInstanceReady.next(instance);
    }).catch(error => console.log(error));
  }

  setWeb3Provider() {
    this.web3 = new Web3(Web3.givenProvider);
    console.log(this.web3);
  }

  getETHAddress(){
    this.web3.eth.getAccounts().then(accounts => {
      console.log(accounts);
      this.ETHAddress = accounts[0];
      this.onETHAddress.next(this.ETHAddress);
    });
  }

  getNetworkType(){
    this.web3.eth.net.getNetworkType().then(type => {
      this.networkType = type;
    }).catch(console.log);
  }

}
