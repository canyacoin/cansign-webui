import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { DocumentsSignWrapperComponent } from './documents-sign-wrapper/documents-sign-wrapper.component';
import { DocumentActionsComponent } from './document-actions/document-actions.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DocumentsSignWrapperComponent, DocumentActionsComponent]
})
export class DocumentSignModule { }
