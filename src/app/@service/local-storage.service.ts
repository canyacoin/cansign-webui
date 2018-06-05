import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '@environment/environment';

@Injectable()
export class LocalStorageService {

  endpoints: any = {
    documents: 'documents'
  }

  constructor(
    private db: AngularFireDatabase) {
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
    return this.db.object(`${this.endpoints.documents}/${hash}`).valueChanges()
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
    this.db
      .object(`${this.endpoints.documents}/${hash}`)
      .update(data)

    let files = this.getFiles();

    files[hash] = data;

    this.store({ files });
  }
}
