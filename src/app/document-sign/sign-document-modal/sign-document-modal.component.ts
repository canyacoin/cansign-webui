import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@service/local-storage.service';
import { EthereumService } from '@service/ethereum.service';
import { SharedService } from '@service/shared.service';
import { Signer } from '@model/signer.model';
import { Document } from '@model/document.model';

@Component({
  selector: 'app-sign-document-modal',
  templateUrl: './sign-document-modal.component.html',
  styleUrls: ['./sign-document-modal.component.css']
})
export class SignDocumentModalComponent implements OnInit {

  currentFile: Document = new Document()

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
    public shared: SharedService,
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
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash']
    })
  }

  init(){
    this.currentFile = this.shared.currentFile
  }

  onSignDocument(){
    this.eth.canSignDocument(this.docId).then(({creator, _signers}) => {

      this.eth.signDocument(this.currentFile)

    }).catch(error => {
      this.eth.onSignatureDenial.next({
        displayOnSignatureDenialModal: true,
        denyDocumentView: true,
      })
    })
  }

  reset(){
    this.display = false;
    this.onBeforeSign = false;
    this.onError = false;
    this.onSigning = false;
    this.onAfterSigning = false;
  }

}
