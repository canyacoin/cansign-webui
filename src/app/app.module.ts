import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { DocumentIndexModule } from './document-index/document-index.module';
import { DocumentNewModule } from './document-new/document-new.module';
import { DocumentSignModule } from './document-sign/document-sign.module';
import { DocumentRequestSignaturesModule } from './document-request-signatures/document-request-signatures.module';

import { HeaderComponent } from './header/header.component';
import { IpfsService } from './@service/ipfs.service';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '/upload',
  autoQueue: false,
  maxFilesize: 50,
  acceptedFiles: null
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentIndexModule,
    DocumentNewModule,
    DocumentSignModule,
    DocumentRequestSignaturesModule,
    DropzoneModule,
  ],
  providers: [
    IpfsService,
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
