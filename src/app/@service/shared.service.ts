import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {

  onSignersModal: Subject<any> = new Subject<any>()

  onRemoveFiles: Subject<any> = new Subject<any>()

  onCancelUpload: Subject<any> = new Subject<any>()

  dateFormats: any = {
    long: 'dddd, MMMM Do YYYY'
  }

  constructor() { }

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

  openSignersListModal(){
    this.onSignersModal.next({
      display: true,
      onAddSigner: false,
      onSignersList: true,
    })
  }

}
