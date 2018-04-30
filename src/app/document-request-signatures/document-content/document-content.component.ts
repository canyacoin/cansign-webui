import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../../@service/ipfs.service';
import { EthereumService } from '../../@service/ethereum.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css']
})

export class DocumentContentComponent implements OnInit {

  docId: string

  filePath: SafeUrl

  constructor(
    private ipfs: IpfsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private eth: EthereumService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.docId = params['ipfsHash'];

      this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.makeFilePath());
    });
  }

  makeFilePath(){
    return `https://gateway.ipfs.io/ipfs/${this.docId}`;
  }

}
