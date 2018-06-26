import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { DocumentContentComponent } from './document-content/document-content.component';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonLibModule } from '@canyaio/common-lib';

@NgModule({
  imports: [
    CommonModule,
    CommonLibModule
  ],
  exports: [
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
    TranslateModule,
    CommonLibModule
  ],
  declarations: [
    DocumentContentComponent,
    CardsComponent,
    AboutModalComponent,
  ]
})

export class SharedModule { }
