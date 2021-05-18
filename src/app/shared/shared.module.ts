import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { FooterComponent } from './footer/footer.component';
import { VerticalMenuComponent } from './vertical-menu/vertical-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MapComponent } from './map/map.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { MapEffects } from '../pages/store/map.effects';
import {SwiperModule} from 'swiper/angular';
import * as fromMap from '../pages/store/map.reducer';

@NgModule({
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FooterComponent,
    VerticalMenuComponent,
    ToolbarComponent,
    MapComponent,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    SwiperModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SwiperModule,
    MatSnackBarModule,
    EffectsModule.forFeature([MapEffects]),
    SwiperModule,
    StoreModule.forFeature(fromMap.mapStateFeatureKey, fromMap.reducer),
  ],
  declarations: [
    FooterComponent,
    VerticalMenuComponent,
    ToolbarComponent,
    MapComponent
  ],

})
export class SharedModule { }
