import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { IpfsService } from '@service/ipfs.service';
import { EthereumService } from '@service/ethereum.service';
import { SharedService } from '@service/shared.service';
import { LocalStorageService } from '@service/local-storage.service';
import { FileComponent } from '../file/file.component';

declare var require: any

const _ = require('lodash')

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})

export class FilesListComponent implements OnInit {

  @ViewChild("filesList", { read: ViewContainerRef }) container

  fileComponents: any = {}

  hasNoFiles: boolean = false

  uploadEnded: boolean = false

  constructor(
    private ipfs: IpfsService,
    private resolver: ComponentFactoryResolver,
    private ls: LocalStorageService,
    private shared: SharedService,
    private eth: EthereumService) {

    ls.init();

    shared.onCancelUpload.subscribe(fileIndex => {
      _.each(this.fileComponents, comp => {
        if (comp.instance.index == fileIndex) {
          comp.destroy()
          delete this.fileComponents[comp.instance.index]
          return false
        }
      });
    });

    shared.onRemoveFiles.subscribe(filesIndexes => {
      let files = ls.getFiles()

      filesIndexes.forEach(index => {
        _.each(this.fileComponents, comp => {
          if (comp.instance.ipfsHash == index) {
            delete files[comp.instance.ipfsHash]
            comp.destroy()
            delete this.fileComponents[comp.instance.index]
            return false
          }
        })
      })

      ls.store({ files })
    });

    ipfs.onFileAdded.subscribe(data => {
      this.hasNoFiles = false;
      this.uploadEnded = false;
      this.listFile(data);
    });

    ipfs.onFileUpload.subscribe(data => {
      this.fileComponents[data.index].instance.pctg = data.pctg;
    });

    ipfs.onStreamEnd.subscribe(data => {
      this.fileComponents[data.index].instance.streamEnded = true;
    });

    ipfs.onFileUploadEnd.subscribe(({ ipfsFile, fileObj }) => {
      if (this.uploadEnded) return false;

      this.eth.setContract().then(contract => {
        contract.getDocumentId(ipfsFile.hash).then(id => {
          let fileExists = id != ''
          if (fileExists) {
            this.fileComponents[fileObj.index].destroy()
            delete this.fileComponents[fileObj.index]
            let files = ls.getFiles()
            delete files[ipfsFile.hash]
            this.ls.store({ files })
            return false
          }

          let fileComponent = this.fileComponents[fileObj.index].instance;

          fileComponent.ipfsHash = ipfsFile.hash
          fileComponent.isUploading = false
          fileComponent.streamEnded = false
          fileComponent.renderIpfsLink()

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
            creator: fileObj.creator,
            routes: fileObj.routes,
          }
          console.log(data)

          this.ls.storeFile(ipfsFile.hash, data)
          this.ls.updateDocument(ipfsFile.hash, data)
          this.uploadEnded = true
        })
      })
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
      let fileObj = files[key];

      this.ipfs.fileCount++;

      fileObj.index = this.ipfs.fileCount;

      this.listFile(fileObj);

      let fileComp = this.fileComponents[fileObj.index].instance;
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

    this.fileComponents[data.index] = file;
  }

}
