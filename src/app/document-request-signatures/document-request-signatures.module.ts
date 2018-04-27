import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { DocumentsRequestSignaturesWrapperComponent } from './documents-request-signatures-wrapper/documents-request-signatures-wrapper.component';
import { DocumentContentComponent } from './document-content/document-content.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    DocumentsRequestSignaturesWrapperComponent,
    DocumentContentComponent
  ]
})
export class DocumentRequestSignaturesModule { }
