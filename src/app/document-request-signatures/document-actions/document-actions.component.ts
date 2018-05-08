import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../@service/local-storage.service';
import { EthereumService } from '../../@service/ethereum.service';
import { Signer } from '../../@model/signer.model';
import * as Moment from 'moment';

declare let window: any;
declare let require: any;

const Web3 = require('web3');
const validator = require('validator');

@Component({
  selector: 'app-document-actions',
  templateUrl: './document-actions.component.html',
  styleUrls: ['./document-actions.component.css']
})

export class DocumentActionsComponent implements OnInit {

  docId: string

  currentFile: any

  moment: any

  @Input() signer: Signer = {}

  @Input() creator: any = {}

  signers: Array<Signer> = []

  canRequestSignatures: boolean = true

  onRequestSignaturesFailMessage: string

  isValidSignerAddress: boolean = true

  invalidSignerAddressMessage: string

  isValidSignerEmail: boolean = true

  invalidSignerEmailMessage: string

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService) {
    this.moment = Moment;
    this.signers = [];

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      this.creator.email = this.currentFile.creator.email;

      Object.keys(this.currentFile.signers).forEach(key => {
        let signer = this.currentFile.signers[key];

        this.signers.push(signer);
      });
    });
  }

  openPublishDocumentModal(){
    if (this.signers.length <= 0) {
      this.canRequestSignatures = false;
      this.onRequestSignaturesFailMessage = 'At least 1 signer needs to be added in order to request signatures';
      return false;
    }

    if (!this.creator.email) {
      this.canRequestSignatures = false;
      this.onRequestSignaturesFailMessage = 'You need to add a notification email';
      return false;
    }

    this.canRequestSignatures = true;
    this.onRequestSignaturesFailMessage = '';

    this.eth.openPublishDocumentModal();
  }

  addNotificationEmail(){
    let file = this.ls.getFile(this.docId);

    file.creator.email = this.creator.email;

    this.ls.storeFile(this.docId, file);

    window.$('#btn-add-email').text('Added!');
  }

  addExpirationDate(){}

  displaySignersForm(){
    window.$('#new-signer-form').toggleClass('d-none');
    window.$('#add-signer-btn').toggleClass('d-none');
  }

  addSigner(){
    if (!this._isValidSignerAddress()) return false;

    this.isValidSignerAddress = true;
    this.invalidSignerAddressMessage = '';

    if (!this._isValidSignerEmail()) return false;

    this.isValidSignerEmail = true;
    this.invalidSignerEmailMessage = '';

    let file = this.ls.getFile(this.docId);

    this.signer.status = 'pending';

    file.signers[this.signer.ETHAddress.toUpperCase()] = this.signer;

    this.signers.push(this.signer);

    this.ls.storeFile(this.docId, file);

    this.signer = {};

    this.displaySignersForm();
  }

  _isValidSignerAddress(): boolean {
    if (!Web3.utils.isAddress(this.signer.ETHAddress)) {
      this.isValidSignerAddress = false;
      this.invalidSignerAddressMessage = 'Address is not a valid HEX Ethereum address';

      return false;
    }

    if (this.signer.ETHAddress.toUpperCase() === this.eth.ETHAddress.toUpperCase()) {
      this.isValidSignerAddress = false;
      this.invalidSignerAddressMessage = 'Address should not be equal to the document creator address';

      return false;
    }

    let addressExists = this.signers.map(signer => {
      return signer.ETHAddress.toUpperCase();
    }).indexOf(this.signer.ETHAddress.toUpperCase()) != -1;

    if (addressExists) {
      this.isValidSignerAddress = false;
      this.invalidSignerAddressMessage = 'Address should not match another signer address';

      return false;
    }

    return true;
  }

  _isValidSignerEmail(): boolean {
    if (typeof this.signer.email != 'string' || !validator.isEmail(this.signer.email)) {
      this.isValidSignerEmail = false;
      this.invalidSignerEmailMessage = 'Email is not a valid email address';

      return false;
    }

    if (this.signer.email === this.creator.email) {
      this.isValidSignerEmail = false;
      this.invalidSignerEmailMessage = 'Email should not be equal to the document creator email';

      return false;
    }

    let emailExists = this.signers.map(signer => {
      return signer.email;
    }).indexOf(this.signer.email) != -1;

    if (emailExists) {
      this.isValidSignerEmail = false;
      this.invalidSignerEmailMessage = 'Email should not match another signer email';

      return false;
    }

    return true;
  }
}
