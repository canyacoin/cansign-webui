import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../@service/local-storage.service';

declare let window: any;

@Component({
  selector: 'app-document-actions',
  templateUrl: './document-actions.component.html',
  styleUrls: ['./document-actions.component.css']
})

export class DocumentActionsComponent implements OnInit {

  docId: string

  currentFile: any

  constructor(
    private route: ActivatedRoute,
    private ls: LocalStorageService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.currentFile = this.ls.getFile(this.docId);
    });
  }

  displaySignersForm(){
    window.$('#new-signer-form').toggleClass('d-none');
    window.$('#add-signer-btn').toggleClass('d-none');
  }
}
