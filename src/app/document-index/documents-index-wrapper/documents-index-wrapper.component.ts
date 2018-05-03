import { Component, OnInit } from '@angular/core';
import { IpfsService } from '@service/ipfs.service';

@Component({
  selector: 'app-documents-index-wrapper',
  templateUrl: './documents-index-wrapper.component.html',
  styleUrls: ['./documents-index-wrapper.component.css']
})

export class DocumentsIndexWrapperComponent implements OnInit {

  constructor(private ipfs: IpfsService) {
    ipfs.onNodeReady.subscribe(isReady => {
      if (isReady) {
        ipfs.start();
      }
    });
  }

  ngOnInit() {
    this.ipfs.start();
  }

}
