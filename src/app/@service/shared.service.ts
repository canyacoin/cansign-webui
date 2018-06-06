import { Injectable } from '@angular/core';
import { Document } from '@model/document.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {

  onSignersModal: Subject<any> = new Subject<any>()

  onRemoveFiles: Subject<any> = new Subject<any>()

  onCancelUpload: Subject<any> = new Subject<any>()

  onAboutClick: Subject<any> = new Subject<any>()

  dateFormats: any = {
    long: 'dddd, MMMM Do YYYY'
  }

  currentFile: Document = new Document()

  constructor() {}

  removeFiles(filesIndexes){
    console.log(filesIndexes)
    this.onRemoveFiles.next(filesIndexes)
  }

  cancelUpload(fileIndex){
    console.log(fileIndex)
    this.onCancelUpload.next(fileIndex)
  }

  openAddSignerModal(){
    this.onSignersModal.next({
      display: true,
      onAddSigner: true,
      onSignersList: false,
    })
  }

  displayAboutModal(){
    this.onAboutClick.next({
      display: true,
      onAbout: true,
    })
  }

  openSignersListModal(){
    this.onSignersModal.next({
      display: true,
      onAddSigner: false,
      onSignersList: true,
    })
  }

}
