import { Component, OnInit } from '@angular/core';
import { IpfsService } from '@service/ipfs.service';

@Component({
  selector: 'app-documents-sign-wrapper',
  templateUrl: './documents-sign-wrapper.component.html',
  styleUrls: ['./documents-sign-wrapper.component.css']
})
export class DocumentsSignWrapperComponent implements OnInit {

  constructor(private ipfs: IpfsService) { }

  ngOnInit() {
    this.ipfs.stop();
  }

}
