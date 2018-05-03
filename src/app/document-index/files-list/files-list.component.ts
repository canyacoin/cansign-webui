import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { IpfsService } from '../../@service/ipfs.service';
import { LocalStorageService } from '../../@service/local-storage.service';
import { FileComponent } from '../file/file.component';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})

export class FilesListComponent implements OnInit {

  @ViewChild("filesList", { read: ViewContainerRef }) container

  fileComponents: Array<any> = []

  hasNoFiles: boolean = false

  constructor(
    private ipfs: IpfsService,
    private resolver: ComponentFactoryResolver,
    private ls: LocalStorageService) {

    ls.init();

    ipfs.onFileAdded.subscribe(data => {
      this.hasNoFiles = false;
      this.listFile(data);
    });

    ipfs.onFileUpload.subscribe(data => {
      console.log(data, this.fileComponents);
      this.fileComponents[data.index].instance.pctg = data.pctg;
    });

    ipfs.onFileUploadEnd.subscribe(({ ipfsFile, fileObj }) => {
      let fileComponent = this.fileComponents[fileObj.index].instance;

      let fileExists = this.ls.getFile(ipfsFile.hash);
      if (fileExists) {
        console.log(fileObj);
        this.fileComponents[fileObj.index].destroy();
        this.fileComponents.splice(fileObj.index, 1);
        this.ipfs.fileCount--;
        return;
      }

      fileComponent.ipfsHash = ipfsFile.hash;
      fileComponent.renderIpfsLink();

      let data = {
        hash: ipfsFile.hash,
        path: ipfsFile.path,
        size: ipfsFile.size,
        name: fileObj.name,
        type: fileObj.type,
        lastModified: fileObj.lastModified,
        uploadedAt: fileObj.uploadedAt,
        pctg: 0,
        status: fileObj.status,
        signers: fileObj.signers,
      }

      this.ls.storeFile(ipfsFile.hash, data);
    });
  }

  ngOnInit() {
    this.ipfs.fileCount = -1;

    let files = this.ls.getFiles();

    if (Object.keys(files).length == 0) {
      this.hasNoFiles = true;
      return null;
    }

    Object.keys(files).forEach(key => {
      this.ipfs.fileCount++;

      let fileObj = files[key];
      this.ipfs.files.push(fileObj);
      this.listFile(fileObj);

      let fileComp = this.fileComponents[this.ipfs.fileCount].instance;
      fileComp.ipfsHash = fileObj.hash;
      fileComp.pctg = 0;
      fileComp.renderIpfsLink();
    });
  }

  listFile(data) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(FileComponent);

    let file = this.container.createComponent(factory);

    file.instance.index = data.index;

    file.instance.name = data.name;

    file.instance.status = data.status;

    file.instance.size = data.size;

    file.instance.pctg = this.ipfs.fileProgressPerimeter;

    this.fileComponents.push(file);
  }

}
