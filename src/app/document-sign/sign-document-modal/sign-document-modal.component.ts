import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../@service/local-storage.service';
import { EthereumService } from '../../@service/ethereum.service';
import { Signer } from '../../@model/signer.model';

@Component({
  selector: 'app-sign-document-modal',
  templateUrl: './sign-document-modal.component.html',
  styleUrls: ['./sign-document-modal.component.css']
})
export class SignDocumentModalComponent implements OnInit {

  currentFile: any

  docId: string

  signers: Array<Signer> = []

  tx: string

  display: boolean = false
  onBeforeSign: boolean = false
  onError: boolean = false
  onSigning: boolean = false
  onAfterSigning: boolean = false

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eth: EthereumService,
    private zone: NgZone) {

    eth.onSignDocument.subscribe(data => {
      this.display = data.displaySignDocumentModal;
      this.onBeforeSign = data.onBeforeSign;
      this.onError = data.onError;
      this.onSigning = data.onSigning;
      this.onAfterSigning = data.onAfterSigning;
      this.currentFile = data.currentFile ? data.currentFile : this.currentFile;
      this.tx = data.receipt ? data.receipt.tx : '';

      this.init();
      this.zone.run(() => console.log('ran'));
    });

  }

  ngOnInit() {
  }

  init(){
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
    this.onBeforeSign = false;
    this.onError = false;
    this.onSigning = false;
    this.onAfterSigning = false;
  }

}
