import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';
import { ContainerComponent } from './container.component';
import { CommonLibModule } from '@canyaio/common-lib';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonLibModule
  ],
  declarations: [ContainerComponent]
})
export class MissingMetamaskModule { }
