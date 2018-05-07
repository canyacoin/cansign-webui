import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@service/local-storage.service';
import { EthereumService } from '@service/ethereum.service';
import { Signer } from '../../@model/signer.model';
import * as Moment from 'moment';

declare let window: any;

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

      this.zone.run(() => console.log('ran'));
    });

    eth.onContractInstanceReady.subscribe(contract => {
      this.contract = contract;
      this.getDocumentData();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.eth.init();

      this.currentFile = this.ls.getFile(this.docId);
    });
  }

  getDocumentData(){
    let contract = this.contract;

    this.signers = [];

    let docId = this.docId;

    contract.getDocumentCreator(docId).then(creator => {
      this.creator.ETHAddress = creator;
    });

    contract.getDocumentSigners(docId).then(_signers => {
      console.log(_signers);

      let signers = {};

      _signers.forEach(address => {
        signers[address] = {
          ETHAddress: address,
        };
      });

      _.forEach(signers, signer => {
        contract.getSignerEmail(docId, signer.ETHAddress).then(email => signer.email = email);
        contract.getSignerTimestamp(docId, signer.ETHAddress).then(timestamp => signer.timestamp = timestamp.valueOf());
        contract.getSignerStatus(docId, signer.ETHAddress).then(status => signer.status = status);
        this.signers.push(signer);
      });

      console.log(signers);

    }).catch(error => console.log(error));
  }
}
