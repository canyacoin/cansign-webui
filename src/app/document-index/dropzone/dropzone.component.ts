import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../../@service/ipfs.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})

export class DropzoneComponent implements OnInit {

  dzMessage: string = `
    <i class="fa fa-cloud-upload-alt"></i>
    <h4>Drag a document to upload</h4>
    <p>- or -</p>
    <span class="btn btn-primary">Browse</span>
  `

  nodeIsReady: boolean = false

  constructor(private ipfs: IpfsService) {
    ipfs.onNodeReady.subscribe(isReady => {
      this.nodeIsReady = isReady;
    });
  }

  ngOnInit() {}

  onUploadError($evt) {
    console.log($evt);
  }

  onUploadSuccess(file, $evt) {
    console.log(file, $evt);
  }

  onFileAdded(file, $evt?) {
    console.log(file);

    let reader = new FileReader();

    reader.onloadend = () => {
      this.ipfs.fileCount++;
      let f = {
        index: this.ipfs.fileCount,
        name: file.name,
        type: file.type,
        size: file.size,
        progress: 0,
        lastModified: file.lastModified,
        uploadedAt: (new Date()).getTime(),
        status: 'uploaded',
        signers: {},
        creator: {},
        routes: {},
      };
      this.ipfs.onFileAdded.next(f);
      this.ipfs.upload(reader.result, f);
    }

    reader.readAsArrayBuffer(file);
  }

}
