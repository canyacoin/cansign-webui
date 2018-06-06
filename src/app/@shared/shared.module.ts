import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { DocumentContentComponent } from './document-content/document-content.component';
import { AboutModalComponent } from './about-modal/about-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
  ],
  declarations: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
  ]
})

export class SharedModule { }
