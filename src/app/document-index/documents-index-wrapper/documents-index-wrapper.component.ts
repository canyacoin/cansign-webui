import { Component, OnInit } from '@angular/core';
import { IpfsService } from '@service/ipfs.service';

declare var BancorConvertWidget: any;

@Component({
  selector: 'app-documents-index-wrapper',
  templateUrl: './documents-index-wrapper.component.html',
  styleUrls: ['./documents-index-wrapper.component.css']
})

export class DocumentsIndexWrapperComponent implements OnInit {

  constructor(private ipfs: IpfsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    BancorConvertWidget.init({
      'type': '1',
      'baseCurrencyId': '5a6f61ece3de16000123763a',
      'pairCurrencyId': '5937d635231e97001f744267',
      'primaryColor': '#00BFFF',
      'primaryColorHover': '55DAFB'
    });
  }

}
