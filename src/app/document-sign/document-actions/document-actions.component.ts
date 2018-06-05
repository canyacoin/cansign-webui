import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@service/local-storage.service';
import { EthereumService } from '@service/ethereum.service';
import { IpfsService } from '@service/ipfs.service';
import { SharedService } from '@service/shared.service';
import { Signer } from '@model/signer.model';
import { Document } from '@model/document.model';
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

  currentFile: Document = new Document()

  lastModified: string
  uploadedAt: string

  moment: any

  @Input() signer: Signer = {}

  creator: any = {}

  signers: Array<Signer> = []

  contract: any

  onAllSigners: Subject<any> = new Subject<any>()

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    public ipfs: IpfsService,
    public shared: SharedService,
    private zone: NgZone) {
    this.moment = Moment;

    eth.onSignDocument.subscribe(data => {
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile

      this.getDocumentData()

      if (data.onAfterSigning) {
        let allSignersHaveSigned = _.every(this.currentFile.signers, ['status', Signer.STATUS_SIGNED])
        if (allSignersHaveSigned) {
          this.currentFile.status = Document.STATUS_SIGNED
          this.ls.updateDocument(this.currentFile.hash, this.currentFile)
          // TODO notify creator that document has been signed by all signers
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.eth.setContract().then(() => {
        this.getDocumentData()
      })
    });
  }

  isSigned(){
    return this.currentFile.status === Document.STATUS_SIGNED;
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
    let docId = this.docId

    this.eth.canSignDocument(docId).then(({creator, signers}) => {

      this.creator = creator

      this.signers = []

      this.ls.getDocument(docId).subscribe(doc => {
        this.currentFile = doc

        this.signers = Object.keys(this.currentFile.signers).map(signer => {
          return this.currentFile.signers[signer]
        })
      })

    }).catch(error => {
      this.eth.onSignatureDenial.next({
        displayOnSignatureDenialModal: true,
        denyDocumentView: true,
      })
    })
  }
}
