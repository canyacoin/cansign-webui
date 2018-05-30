import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {

  onSignersModal: Subject<any> = new Subject<any>()

  constructor() { }

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
