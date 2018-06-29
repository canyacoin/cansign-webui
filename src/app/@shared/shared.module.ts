import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { DocumentContentComponent } from './document-content/document-content.component';
import { AboutModalComponent } from './about-modal/about-modal.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
    TranslateModule
  ],
  declarations: [
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
  ]
})

export class SharedModule { }
