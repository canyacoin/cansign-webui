import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DocumentIndexModule } from './document-index/document-index.module';
import { DocumentNewModule } from './document-new/document-new.module';
import { DocumentSignModule } from './document-sign/document-sign.module';
import { DocumentRequestSignaturesModule } from './document-request-signatures/document-request-signatures.module';

import { HeaderComponent } from './header/header.component';


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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
