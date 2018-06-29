import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../@shared/shared.module';

import { DocumentsIndexWrapperComponent } from './documents-index-wrapper/documents-index-wrapper.component';
import { DropzoneComponent } from './dropzone/dropzone.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FilesListComponent } from './files-list/files-list.component';
import { FileComponent } from './file/file.component';

import { CommonLibModule } from '@canyaio/common-lib';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '/upload',
  autoQueue: false,
  maxFilesize: 50,
  acceptedFiles: 'application/pdf',
};

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    AppRoutingModule,
    SharedModule,
    CommonLibModule,
  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG, },
  ],
  declarations: [
    DocumentsIndexWrapperComponent,
    DropzoneComponent,
    FilesListComponent,
    FileComponent
  ],
  entryComponents: [FileComponent]
})
export class DocumentIndexModule { }
