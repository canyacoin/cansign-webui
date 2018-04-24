import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsIndexWrapperComponent } from './document-index/documents-index-wrapper/documents-index-wrapper.component';

const routes: Routes = [
  { path: '', redirectTo: '/documents/index', pathMatch: 'full' },
  { path: 'documents/index', component: DocumentsIndexWrapperComponent, }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
