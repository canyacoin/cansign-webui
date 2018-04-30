import { Component, OnInit } from '@angular/core';
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

  display: boolean = false

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService) {

    eth.onPublishDocument.subscribe(data => {
      this.display = data.displayPublishDocumentModal;
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);

      Object.keys(this.currentFile.signers).forEach(key => {
        let signer = this.currentFile.signers[key];
        this.signers.push(signer);
      });
    });
  }

}
