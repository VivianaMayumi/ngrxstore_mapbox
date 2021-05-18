import {Injectable} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // for center the map
  initialCenter = {
    lat: 32.8203525,
    lng: -97.0117411,
  };
  initialZoom = 10;
  style = 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;

  model: any = {};

  initMap() {
    this.mapbox.accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: this.style,
      center: [this.initialCenter.lng, this.initialCenter.lat], // longitud, Latitude
      zoom: this.initialZoom // starting zoom 9
    });
  }

  createMarkers(item: string, records: any) {
    const popup = new mapboxgl.Popup({offset: 25})
      .setHTML(
        `<h3>${records.name}</h3> <p>${records.streetAddress}, ${records.city}</p>`
      );

    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = 'marker-' + item;

    if (records.favorite) {
      el.style.backgroundImage = 'url(' + '/assets/images/ic-red.png' + ')';
    } else {
      el.style.backgroundImage = 'url(' + '/assets/images/ic-green.png' + ')';
    }

    new mapboxgl.Marker(el)
      .setLngLat([records.geocode.Longitude, records.geocode.Latitude])
      .setPopup(popup)
      .addTo(this.map);

    el.addEventListener('click', (e) => {
      /* Fly to the point */
      this.flyTo({Longitude: records.geocode.Longitude, Latitude: records.geocode.Latitude}, 15);
    });
  }

  flyTo(center, zoom: number) {
    this.map.flyTo({
      center: [center.Longitude, center.Latitude],
      zoom
    });
  }

  autoCenter(mapData) {
    const coordinates = [];
    for (const i in mapData) {
      coordinates.push([mapData[i].geocode.Longitude, mapData[i].geocode.Latitude]);
    }
    const bounds = coordinates.reduce( ( bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    this.map.fitBounds(bounds, {
      padding: 20
    });
  }


}
