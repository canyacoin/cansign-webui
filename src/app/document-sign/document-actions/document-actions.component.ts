import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@service/local-storage.service';
import { EthereumService } from '@service/ethereum.service';
import { Signer } from '@model/signer.model';
import * as Moment from 'moment';

declare let window: any;
declare let require: any;

const _ = require('lodash');

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

  creator: any = {}

  signers: Array<Signer> = []

  contract: any

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    private zone: NgZone) {
    this.moment = Moment;
    this.signers = [];

    eth.onSignDocument.subscribe(data => {
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile;

      this.getDocumentData();
    });

    eth.onContractInstanceReady.subscribe(contract => {
      this.getDocumentData();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      if (this.eth.CanSignContract) {
        this.getDocumentData();
      } else {
        this.eth.setContract();
      }
    });
  }

  isSigned(){
    return this.currentFile.status === 'signed';
  }

  onSignDocument(){
    this.eth.canSignDocument(this.docId).then(({creator, signers}) => {

      if (creator.ETHAddress.toUpperCase() == this.eth.ETHAddress.toUpperCase()) {
        this.eth.onSignatureDenial.next({
          displayOnSignatureDenialModal: true,
          denyDocumentView: false,
          signatureExists: false,
          signerIsCreator: true,
        })

        return false
      }

      let existingSignatures = this.signers.filter(signer => {
        return signer.status == Signer.STATUS_SIGNED
      }).map(signer => signer.ETHAddress.toUpperCase())

      console.log(existingSignatures)

      let signatureExists = existingSignatures.indexOf(this.eth.ETHAddress.toUpperCase()) != -1
      if (signatureExists) {
        this.eth.onSignatureDenial.next({
          displayOnSignatureDenialModal: true,
          denyDocumentView: false,
          signatureExists: true,
        })

        return false
      }

      this.eth.openSignDocumentModal()

    }).catch(error => {
      this.eth.onSignatureDenial.next({
        displayOnSignatureDenialModal: true,
        denyDocumentView: true,
      })
    })
  }

  getDocumentData(){
    let contract = this.eth.CanSignContract

    let docId = this.docId

    this.eth.canSignDocument(docId).then(({creator, signers}) => {
      this.creator = creator

      this.signers = []

      _.forEach(signers, address => {
        let signer: Signer = {}

        signer.ETHAddress = address

        contract.getSignerEmail(docId, address).then(email => signer.email = email)
        contract.getSignerTimestamp(docId, address).then(timestamp => signer.timestamp = timestamp.valueOf())
        contract.getSignerStatus(docId, address).then(status => signer.status = status)

        signer.tx = this.currentFile.signers[address.toUpperCase()].tx

        this.signers.push(signer)
      })

      this.zone.run(() => console.log('ran'))

    }).catch(error => {
      this.eth.onSignatureDenial.next({
        displayOnSignatureDenialModal: true,
        denyDocumentView: true,
      })
    })
  }
}
