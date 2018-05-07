import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { DocumentContentComponent } from './document-content/document-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    DocumentContentComponent
  ],
  declarations: [FooterComponent, DocumentContentComponent]
})

export class SharedModule { }
