import { Component, OnInit } from '@angular/core';
import { IpfsService } from '@service/ipfs.service';

@Component({
  selector: 'app-documents-request-signatures-wrapper',
  templateUrl: './documents-request-signatures-wrapper.component.html',
  styleUrls: ['./documents-request-signatures-wrapper.component.css']
})
export class DocumentsRequestSignaturesWrapperComponent implements OnInit {

  constructor(
    private ipfs: IpfsService) { }

  ngOnInit() {
    this.ipfs.stop();
  }

}
