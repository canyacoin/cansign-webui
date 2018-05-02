import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  contractAddress: string = '0x0ae7483c7f3d40a7516553bff8e338841ca37a4c';

  CanSignContract: any


  onPublishDocument: Subject<any> = new Subject<any>()

  onETHAddress: Subject<any> = new Subject<any>()

  constructor(
    private http: HttpClient) {

    if (!this.web3) {
      this.setWeb3Provider();
      this.getNetworkType();
    }

    if (!this.CanSignContract) {
      this.setContract();
    }
  }

  openPublishDocumentModal(){
    this.onPublishDocument.next({
      displayPublishDocumentModal: true
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

    this.CanSignContract.addDocument.estimateGas(
      hash,
      expirationDate,
      signers,
      txOptions).then(gas => {
        console.log(gas);
        txOptions.gas = gas;

        this.CanSignContract.addDocument(
          hash,
          expirationDate,
          signers,
          txOptions).then(txn => {
            console.log(txn);
          }).catch(error => {
            console.log(error);
          });

      }).catch(error => {
        console.log(error);

      });
  }

  setContract() {
    console.log(CANSIGN);

    let c = contract({abi: CANSIGN.abi});

    c.setProvider(this.web3.currentProvider);

    return c.at(this.contractAddress).then(instance => {
      console.log(instance);
      this.CanSignContract = instance;
    }).catch(error => console.log(error));
  }

  setWeb3Provider() {
    this.web3 = new Web3(Web3.givenProvider);
    console.log(this.web3);
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
