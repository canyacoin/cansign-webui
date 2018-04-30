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

  constructor(
    private http: HttpClient) {

    if (!this.web3) {
      this.setWeb3Provider();
    }
  }

  setWeb3Provider() {
    this.web3 = new Web3(Web3.givenProvider);
    console.log(this.web3);
    this.web3.eth.getAccounts().then(accounts => {
      console.log(accounts);
      this.ETHAddress = accounts[0];
    });
  }

}
