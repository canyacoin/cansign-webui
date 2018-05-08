import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { DocumentContentComponent } from './document-content/document-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent
  ],
  declarations: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent,
  ]
})

export class SharedModule { }
