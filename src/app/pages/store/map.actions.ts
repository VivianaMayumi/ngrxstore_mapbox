import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export const loadMaps = createAction(
  '[Map Data List Component] Load Maps'
);

export const loadMapsSuccess = createAction(
  '[Map Data Effect] Load Maps Success',
  props<{ mapData: any[] }>()
);

export const loadMapsFailure = createAction(
  '[Map Data Effect] Load Maps Failure',
  props<{ error: any }>()
);


// Load Map Item
export const loadMapMarker = createAction(
  '[Map Marker] Load Map',
  props<{ propertyID: string }>()
);

export const loadMapMarkerSuccess = createAction(
  '[Map Marker Effect] Load Map Marker Success',
  props<{ selectedMarker: any }>()
);
export const loadMapMarkerFailure = createAction(
  '[Map Marker Effect] Load Map Marker Failure',
  props<{ error: any }>()
);

export const markerClick = createAction(
  '[Map Marker] Marker click',
  props<{ coords: any }>()
);

// Edit maker
export const updateMapMarker = createAction(
  '[Map Marker] Update Map Marker',
  props<{ mapData: Update<any> }>()
);
