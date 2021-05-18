import { createFeatureSelector, createSelector } from '@ngrx/store';
import {adapter, MapState, mapStateFeatureKey, selectAll} from './map.reducer';

export const selectMapDataFeature = createFeatureSelector<MapState>(mapStateFeatureKey);

export const selectMapsData = createSelector(
  selectMapDataFeature, selectAll
  // (state: MapState) => state.mapData
  // adapter.getSelectors().selectAll
);

export const selectedMarker = createSelector(
  selectMapDataFeature, (state: MapState) => state.selectedMarker
);

export const selectError = createSelector(
  selectMapDataFeature,
  (state: MapState) => state.error
);
