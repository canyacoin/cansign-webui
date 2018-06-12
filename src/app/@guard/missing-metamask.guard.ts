import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

declare let require: any;
declare var window: any;

let Web3 = require('web3');

@Injectable()
export class MissingMetamaskGuard implements CanActivate {

  constructor(
    private router: Router) {}

  canActivate() {
    console.log(Web3.givenProvider)
    if (!Web3.givenProvider) {
      this.router.navigateByUrl('/missing-metamask')
      return false
    }

    return true
  }
}
