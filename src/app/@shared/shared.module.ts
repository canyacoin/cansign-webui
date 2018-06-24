import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { DocumentContentComponent } from './document-content/document-content.component';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
    TranslateModule
  ],
  declarations: [
    FooterComponent,
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
  ]
})

export class SharedModule { }
