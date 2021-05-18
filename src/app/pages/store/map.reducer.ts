import {Action, createFeatureSelector, createReducer, createSelector, MetaReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as fromActions from './map.actions';
import {environment} from '../../../environments/environment';


export const mapStateFeatureKey = 'mapState';

export interface MapState extends EntityState<any> {
  // mapData: any[];
  error: any;
  selectedMarker: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({ selectId: (mapData: any) => mapData.propertyID });

export const initialState = adapter.getInitialState({
  // mapData: undefined,
  error: undefined,
  selectedMarker: undefined
});


const mapReducer = createReducer(
  initialState,
  on(fromActions.loadMapsSuccess, (state, action) => {
    return adapter.addMany(action.mapData, state);
  }),
  on(fromActions.loadMapsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromActions.loadMapMarkerSuccess, (state, action) => {
    return {
      ...state,
      selectedMarker: action.selectedMarker
    };
  }),
  on(fromActions.loadMapMarkerFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(fromActions.updateMapMarker, (state, action) =>
    adapter.updateOne(action.mapData, state)
  )
);

export function reducer(state: MapState | undefined, action: Action) {
  return mapReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
