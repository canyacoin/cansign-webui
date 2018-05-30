import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@service/local-storage.service';
import { EthereumService } from '@service/ethereum.service';
import { SharedService } from '@service/shared.service';
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

  @Input() creator: any = {}

  canRequestSignatures: boolean = true

  onRequestSignaturesFailMessage: string

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    public shared: SharedService) {
    this.moment = Moment;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      this.creator.email = this.currentFile.creator.email;
    });
  }

  openPublishDocumentModal(){
    if (Object.keys(this.currentFile.signers).length <= 0) {
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
}
