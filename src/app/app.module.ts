import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './@shared/shared.module';

import { DocumentIndexModule } from './document-index/document-index.module';
import { DocumentNewModule } from './document-new/document-new.module';
import { DocumentSignModule } from './document-sign/document-sign.module';
import { DocumentRequestSignaturesModule } from './document-request-signatures/document-request-signatures.module';

import { HeaderComponent } from './header/header.component';
import { IpfsService } from './@service/ipfs.service';
import { LocalStorageService } from './@service/local-storage.service';
import { EthereumService } from './@service/ethereum.service';
import { EmailService } from './@service/email.service';
import { SharedService } from './@service/shared.service';
import { environment } from '@environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DocumentIndexModule,
    DocumentNewModule,
    DocumentSignModule,
    DocumentRequestSignaturesModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    SharedModule
  ],
  providers: [
    IpfsService,
    LocalStorageService,
    EthereumService,
    EmailService,
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
