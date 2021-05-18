import { NgModule } from '@angular/core';
import {MainComponent} from './main/main.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'index',
    component: MainComponent,
    data: {
      title: 'Main'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
