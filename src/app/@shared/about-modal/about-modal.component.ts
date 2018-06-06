import { Component, OnInit } from '@angular/core';
import { SharedService } from '@service/shared.service';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.css']
})

export class AboutModalComponent implements OnInit {

  display: boolean = false

  onAbout: boolean = false

  constructor(public shared: SharedService) {
    shared.onAboutClick.subscribe(data => {
      this.display = data.display
      this.onAbout = data.onAbout
    })
  }

  ngOnInit() {
  }

}
