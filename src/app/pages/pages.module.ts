import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {MainComponent} from './main/main.component';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class PagesModule { }
