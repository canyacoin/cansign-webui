import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '@service/shared.service';
import { EthereumService } from '@service/ethereum.service';
import { LocalStorageService } from '@service/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Signer } from '@model/signer.model';

declare let window: any;
declare let require: any;

const _ = require('lodash');
const Web3 = require('web3');
const validator = require('validator');

@Component({
  selector: 'app-add-signer-modal',
  templateUrl: './add-signer-modal.component.html',
  styleUrls: ['./add-signer-modal.component.css']
})

export class AddSignerModalComponent implements OnInit {

  docId: string

  currentFile: any

  display: boolean = false

  onAddSigner: boolean = false
  onSignersList: boolean = false

  signers: Array<Signer> = []

  @Input() signer: Signer = {}

  creator: any = {}

  isValidSignerAddress: boolean = true

  invalidSignerAddressMessage: string

  isValidSignerEmail: boolean = true

  invalidSignerEmailMessage: string

  constructor(
    public shared: SharedService,
    private route: ActivatedRoute,
    public eth: EthereumService,
    private ls: LocalStorageService) {

    shared.onSignersModal.subscribe(data => {
      this.display = data.display
      this.onAddSigner = data.onAddSigner
      this.onSignersList = data.onSignersList

      this.init()
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash']
    });
  }

  init(){
    this.currentFile = this.shared.currentFile
    this.creator.email = this.currentFile.creator.email

    if (this.currentFile.signers) {
      this.signers = []

      Object.keys(this.currentFile.signers).forEach(key => {
        let signer = this.currentFile.signers[key]

        this.signers.push(signer)
      })
    }
  }

  removeSigner(signer: Signer){
    let file = this.ls.getFile(this.docId)

    delete file.signers[signer.ETHAddress.toUpperCase()]

    this.ls.storeFile(this.docId, file)
    this.ls.updateDocument(this.docId, file)

    _.remove(this.signers, _signer => {
      return _signer.ETHAddress.toUpperCase() == signer.ETHAddress.toUpperCase()
    })
  }

  addSigner(){
    if (!this._isValidSignerAddress()) return false

    this.isValidSignerAddress = true
    this.invalidSignerAddressMessage = ''

    if (!this._isValidSignerEmail()) return false

    this.isValidSignerEmail = true
    this.invalidSignerEmailMessage = ''

    let file = this.ls.getFile(this.docId)

    this.signer.status = Signer.STATUS_PENDING

    file.signers[this.signer.ETHAddress.toUpperCase()] = this.signer

    this.signers.push(this.signer)

    this.ls.storeFile(this.docId, file)
    this.ls.updateDocument(this.docId, file)

    this.signer = {}

    this.onAddSigner = false
    this.onSignersList = true
  }

  _isValidSignerAddress(): boolean {
    if (!Web3.utils.isAddress(this.signer.ETHAddress)) {
      this.isValidSignerAddress = false
      this.invalidSignerAddressMessage = 'documents-request.invalid-hex-address'

      return false
    }

    if (this.signer.ETHAddress.toUpperCase() === this.eth.ETHAddress.toUpperCase()) {
      this.isValidSignerAddress = false
      this.invalidSignerAddressMessage = 'documents-request.address-equals-creator'

      return false
    }

    let addressExists = this.signers.map(signer => {
      return signer.ETHAddress.toUpperCase();
    }).indexOf(this.signer.ETHAddress.toUpperCase()) != -1;

    if (addressExists) {
      this.isValidSignerAddress = false
      this.invalidSignerAddressMessage = 'documents-request.address-equals-another-address'

      return false
    }

    return true
  }

  _isValidSignerEmail(): boolean {
    if (typeof this.signer.email != 'string' || !validator.isEmail(this.signer.email)) {
      this.isValidSignerEmail = false
      this.invalidSignerEmailMessage = 'documents-request.invalid-email-address'

      return false
    }

    if (this.signer.email === this.creator.email) {
      this.isValidSignerEmail = false
      this.invalidSignerEmailMessage = 'documents-request.email-equals-creator-email'

      return false
    }

    let emailExists = this.signers.map(signer => {
      return signer.email;
    }).indexOf(this.signer.email) != -1;

    if (emailExists) {
      this.isValidSignerEmail = false
      this.invalidSignerEmailMessage = 'documents-request.email-equals-another-email'

      return false
    }

    return true
  }

}
