import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DocumentIndexModule } from './document-index/document-index.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentIndexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
