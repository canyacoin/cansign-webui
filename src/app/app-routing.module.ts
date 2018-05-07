import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsIndexWrapperComponent } from './document-index/documents-index-wrapper/documents-index-wrapper.component';
import { DocumentsNewWrapperComponent } from './document-new/documents-new-wrapper/documents-new-wrapper.component';
import { DocumentsSignWrapperComponent } from './document-sign/documents-sign-wrapper/documents-sign-wrapper.component';
import { DocumentsRequestSignaturesWrapperComponent } from './document-request-signatures/documents-request-signatures-wrapper/documents-request-signatures-wrapper.component';
import { EthereumService } from '@service/ethereum.service';

const routes: Routes = [
  { path: '', redirectTo: '/documents/index', pathMatch: 'full' },
  { path: 'documents/index', component: DocumentsIndexWrapperComponent, },
  { path: 'documents/new', component: DocumentsNewWrapperComponent, },
  { path: 'documents/:ipfsHash/sign',
    component: DocumentsSignWrapperComponent,
    resolve: {
      contract: EthereumService
    }
  },
  { path: 'documents/:ipfsHash/request-signatures',
    component: DocumentsRequestSignaturesWrapperComponent,
    resolve: {
      contract: EthereumService
    }
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
