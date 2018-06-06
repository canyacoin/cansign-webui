import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '@environment/environment';
import { SharedService } from '@service/shared.service';

@Injectable()
export class LocalStorageService {

  endpoints: any = {
    documents: 'documents'
  }

  constructor(
    private db: AngularFireDatabase,
    private shared: SharedService) {
  }

  init() {
    let storage = localStorage.getItem('cansign');

    if (storage) {
      return null;
    }

    localStorage.setItem('cansign', JSON.stringify({files: {}}));
  }

  get() {
    return JSON.parse(localStorage.getItem('cansign'));
  }

  getFiles() {
    return this.get().files;
  }

  getDocument(hash){
    return new Promise((resolve, reject) => {
      let subscription = this.db.object(`${this.endpoints.documents}/${hash}`)
        .valueChanges()
        .subscribe(doc => {
          subscription.unsubscribe()
          this.shared.currentFile = doc
          resolve(doc)
        })
    })
  }

  updateDocument(hash, data){
    return this.db.object(`${this.endpoints.documents}/${hash}`)
      .update(data)
  }

  getFile(hash) {
    return this.getFiles()[hash];
  }

  store(data) {
    localStorage.setItem('cansign', JSON.stringify(data));
  }

  storeFile(hash, data) {
    let files = this.getFiles();

    files[hash] = data;

    this.store({ files });
  }
}
