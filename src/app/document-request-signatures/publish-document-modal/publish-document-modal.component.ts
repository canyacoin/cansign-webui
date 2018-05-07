import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../@service/local-storage.service';
import { EthereumService } from '../../@service/ethereum.service';
import { Signer } from '../../@model/signer.model';

@Component({
  selector: 'app-publish-document-modal',
  templateUrl: './publish-document-modal.component.html',
  styleUrls: ['./publish-document-modal.component.css']
})

export class PublishDocumentModalComponent implements OnInit {

  currentFile: any

  docId: string

  signers: Array<Signer> = []

  tx: string

  display: boolean = false
  onBeforePublish: boolean = false
  onError: boolean = false
  onPublishing: boolean = false
  onAfterPublishing: boolean = false

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    private zone: NgZone) {

    eth.onPublishDocument.subscribe(data => {
      this.display = data.displayPublishDocumentModal;
      this.onBeforePublish = data.onBeforePublish;
      this.onError = data.onError;
      this.onPublishing = data.onPublishing;
      this.onAfterPublishing = data.onAfterPublishing;
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile;
      this.tx = data.receipt ? data.receipt.tx : '';

      this.init();
      this.zone.run(() => console.log('ran'));
    });

  }

  ngOnInit() {
  }

  init(){
    this.signers = [];

    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      Object.keys(this.currentFile.signers).forEach(key => {
        let signer = this.currentFile.signers[key];
        this.signers.push(signer);
      });
    });
  }

  reset(){
    this.display = false;
    this.onBeforePublish = false;
    this.onError = false;
    this.onPublishing = false;
    this.onAfterPublishing = false;
  }

}
