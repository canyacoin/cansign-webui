import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

declare let require: any;
declare var window: any;

let Web3 = require('web3');
let ethers = require('ethers');
let contract = require('truffle-contract');

@Injectable()
export class EthereumService {

  web3: any

  ETHAddress: string

  networkType: string

  contractAddress: string = '0x0yghji987'

  networkURL: string = 'https://ropsten.etherscan.io'


  onPublishDocument: Subject<any> = new Subject<any>()

  onETHAddress: Subject<any> = new Subject<any>()

  constructor(
    private http: HttpClient) {

    if (!this.web3) {
      this.setWeb3Provider();
      this.getNetworkType();
    }
  }

  openPublishDocumentModal(){
    this.onPublishDocument.next({
      displayPublishDocumentModal: true
    });
  }

  publishDocument(document){
    console.log(document);
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
