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

  store(data) {
    localStorage.setItem('cansign', JSON.stringify(data));
  }
}
