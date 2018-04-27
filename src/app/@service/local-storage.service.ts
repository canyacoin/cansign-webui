import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

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

  getFile(hash) {
    return this.getFiles()[hash];
  }

  store(data) {
    localStorage.setItem('cansign', JSON.stringify(data));
  }

  storeFile({ ipfsFile, fileObj }) {
    let files = this.getFiles();

    files[ipfsFile.hash] = {
      hash: ipfsFile.hash,
      path: ipfsFile.path,
      size: ipfsFile.size,
      name: fileObj.name,
      type: fileObj.type,
      lastModified: fileObj.lastModified,
      uploadedAt: fileObj.uploadedAt,
      pctg: 0,
      status: fileObj.status,
    }

    this.store({ files });
  }
}
