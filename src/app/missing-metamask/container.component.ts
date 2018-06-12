import { Component, OnInit } from '@angular/core';

declare var require: any

const bowser = require('bowser')

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})

export class ContainerComponent implements OnInit {

  extensionURL: string

  constructor() {}

  ngOnInit() {
    if (bowser.opera) {
      this.extensionURL = 'https://addons.opera.com/en/extensions/details/metamask/'
    } else if (bowser.firefox) {
      this.extensionURL = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
    } else {
      this.extensionURL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
    }
  }

}
