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
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile;

      this.getDocumentData();
    });

    this.onAllSigners.subscribe(signers => {
      let allSignersHaveSigned = _.every(signers, ['status', Signer.STATUS_SIGNED])
      if (allSignersHaveSigned) {
        this.currentFile.status = Document.STATUS_SIGNED
        // TODO notify creator that document has been signed by all signers
      }
    })
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

      // this.getDocumentMeta(docId)

      // this.getSignersData(signers)

    }).catch(error => {
      this.eth.onSignatureDenial.next({
        displayOnSignatureDenialModal: true,
        denyDocumentView: true,
      })
    })
  }

  getDocumentMeta(docId){
    let contract = this.eth.CanSignContract

    return Promise.all([
      contract.getDocumentName(docId),
      contract.getDocumentLastModifiedDate(docId),
      contract.getDocumentUploadedAtDate(docId),
      ]).then(([name, lastModified, uploadedAt]) => {

        // console.log(name, lastModified.valueOf(), uploadedAt.valueOf())

        this.currentFile.name = name
        // this.currentFile.lastModified = lastModified.valueOf()
        // this.currentFile.uploadedAt = uploadedAt.valueOf()

        // this.lastModified = this.moment.unix(lastModified.valueOf()).format(this.shared.dateFormats.long)
        // this.uploadedAt = this.moment.unix(uploadedAt.valueOf()).format(this.shared.dateFormats.long)

        this.zone.run(() => console.log('ran'))
      }).catch(error => console.log(error))
  }

  getSignersData(signers){
    if (signers.length <= 0) {
      this.onAllSigners.next(this.signers)
      return false
    }

    let docId = this.docId

    let contract = this.eth.CanSignContract

    let signer: Signer = {}

    let address = signers.pop()

    signer.ETHAddress = address

    return Promise.all([
      contract.getSignerEmail(docId, address),
      contract.getSignerTimestamp(docId, address),
      contract.getSignerStatus(docId, address),
      contract.getSignerBlockNumber(docId, address),
      ]).then(([email, timestamp, status, blockNumber]) => {

        signer.email = email
        signer.timestamp = timestamp.valueOf()
        signer.status = status
        signer.blockNumber = blockNumber.valueOf()

        if (!signer.tx) {
          this.eth.getSignature(address, blockNumber.valueOf()).then(hash => {
            signer.tx = hash
          })
        }

        this.signers.push(signer)

        this.zone.run(() => console.log('ran'))

        this.getSignersData(signers)
      }).catch(error => console.log(error))
  }
}
