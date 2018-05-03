import { Component, OnInit, NgZone } from '@angular/core';
import { IpfsService } from '../../@service/ipfs.service';

declare var require: any;

const clipboard = require('clipboard');

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})

export class FileComponent implements OnInit {

  index: number

  name: string

  status: string

  size: number

  pctg: number

  progress: number

  ipfsLink: string = '<span class="link-placeholder">[ipfs link will appear here]</span>'

  ipfsHash: string

  constructor(
    private zone: NgZone,
    public ipfs: IpfsService) {}

  ngOnInit() {
  }

  renderIpfsLink() {
    console.log(this.ipfsHash);
    let link = `https://gateway.ipfs.io/ipfs/${this.ipfsHash}`;
    this.ipfsLink = `<span class="copy copy-${this.ipfsHash}"><i class="fa fa-copy"></i></span> <a href="${link}" target="_blank" class="link text-truncate" style="width: 120px;">${this.ipfsHash}</a>`;
    this.zone.run(() => console.log('field run'));

    new clipboard(`.copy-${this.ipfsHash}`, {
      text: function(trigger) {

        trigger.innerHTML = '<i class="fa fa-check"></i>';
        trigger.classList.add('copied');
        setTimeout(() => {
          trigger.innerHTML = '<i class="fa fa-copy"></i>';
          trigger.classList.remove('copied');
        }, 2000);

        return link;
      }
    });
  }

  isUploaded(){
    return this.status === 'uploaded';
  }

  isPublished(){
    return this.status === 'published';
  }

  isSigned(){
    return this.status === 'signed';
  }


}
