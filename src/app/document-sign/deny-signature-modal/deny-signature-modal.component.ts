import { Component, OnInit } from '@angular/core';
import { EthereumService } from '@service/ethereum.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-deny-signature-modal',
  templateUrl: './deny-signature-modal.component.html',
  styleUrls: ['./deny-signature-modal.component.css']
})

export class DenySignatureModalComponent implements OnInit {

  display: boolean = false
  onSignatureDenial: boolean = false

  constructor(
    private eth: EthereumService,
    private router: Router) {

    eth.onSignatureDenial.subscribe(data => {
      this.display = data.displayOnSignatureDenialModal;
      this.onSignatureDenial = data.denyDocumentView;
    });

  }

  ngOnInit() {}

  exit(){
    return this.router.navigate(['/documents/index']);
  }

}
