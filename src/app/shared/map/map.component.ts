import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {Observable} from 'rxjs';
import {MapService} from '../../services/map.service';
import {Store, select} from '@ngrx/store';
import * as fromActions from '../../pages/store/map.actions';
import {MapState} from '../../pages/store/map.reducer';
import {selectedMarker, selectMapsData} from '../../pages/store/map.selectors';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
} from 'swiper/core';
import {MapData} from '../../pages/models/map';
import {Update} from '@ngrx/entity';
import {MatSnackBar} from '@angular/material/snack-bar';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  // mapData: any[] = [];
  mapData$: Observable<any[]>;
  data: any;
  controlledSwiper: any;

  model: any = {};
  flagSlide = false;

  constructor(private store: Store<MapState>, private mapService: MapService, private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.mapService.initMap();
    // this.loadMapData();
  }

  ngOnInit() {
    this.store.dispatch(fromActions.loadMaps());
    this.mapData$ = this.store.pipe(select(selectMapsData));
  }

  loadMapData() {
    this.flagSlide = true;
    this.mapData$.subscribe(data => {
      this.data = data;
      for (const i in this.data) {
        this.mapService.createMarkers(i, this.data[i]);
      }
    });
  }


  clickOnMarker(geocode) {
    const coords = {
      Longitude: geocode.Longitude,
      Latitude: geocode.Latitude
    };
    this.store.dispatch(fromActions.markerClick({coords}));
  }

  updateMapMarker(data) {
    this.model = Object.assign(new MapData(), data);
    this.updateData();
  }

  updateData() {
    const update: Update<any> = {
      id: this.model.propertyID,
      changes: this.model
    };
    this.store.dispatch(fromActions.updateMapMarker({mapData: update}));
  }

  replacePin() {
    this.snackBar.open('Select the heart of a card, refresh the page and the pin will change the color', '×', {
      verticalPosition: 'bottom',
      duration: 7000
    });
  }

  zoomToPin() {
    this.snackBar.open('Select a pin and he will zoom to it ', '×', {
      verticalPosition: 'bottom',
      duration: 7000
    });
  }

  autoZoom() {
    this.mapService.autoCenter(this.data);
  }

  // swiper
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }
}
