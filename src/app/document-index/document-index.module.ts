import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsIndexWrapperComponent } from './documents-index-wrapper/documents-index-wrapper.component';
import { DropzoneComponent } from './dropzone/dropzone.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '/upload',
  autoQueue: false,
  maxFilesize: 50,
  acceptedFiles: null
};

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG, },
  ],
  declarations: [DocumentsIndexWrapperComponent, DropzoneComponent]
})
export class DocumentIndexModule { }
