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

  @Input() creator: any = {}

  signers: Array<Signer> = []

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    private zone: NgZone) {
    this.moment = Moment;
    this.signers = [];

    eth.onSignDocument.subscribe(data => {
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile;

      this.updateSigners();

      this.zone.run(() => console.log('ran'));
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      this.creator.email = this.currentFile.creator.email;

      this.updateSigners();
    });
  }

  updateSigners(){
    this.signers = [];

    Object.keys(this.currentFile.signers).forEach(key => {
      let signer = this.currentFile.signers[key];

      this.signers.push(signer);
    });
  }
}
