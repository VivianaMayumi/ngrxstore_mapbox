import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, catchError, tap, concatMap} from 'rxjs/operators';
import {AppService} from 'src/app/services/app.service';
import * as fromMapActions from '../store/map.actions';
import {of} from 'rxjs';
import {MapService} from '../../services/map.service';
import {Router} from '@angular/router';


@Injectable()
export class MapEffects {

  loadMaps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMapActions.loadMaps),
      mergeMap(() =>
        this.appService.getMapData2().pipe(
          map(mapData => fromMapActions.loadMapsSuccess({mapData: mapData['records']})),
          catchError(error => of(fromMapActions.loadMapsFailure({error})))
        )
      )
    )
  );

  loadMapMarker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMapActions.loadMapMarker),
      mergeMap(action =>
        this.appService.getProperty(action.propertyID).pipe(
          map(property =>
            fromMapActions.loadMapMarkerSuccess({selectedMarker: property})
          ),
          catchError(error =>
            of(fromMapActions.loadMapMarkerFailure({error}))
          )
        )
      )
    )
  );

  updateMapMarker$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromMapActions.updateMapMarker),
        concatMap(action =>
          this.appService.updateProperty(
            action.mapData['propertyID'],
            action.mapData.changes
          )
        ),
        tap(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );


  markerClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMapActions.markerClick),
      tap(({coords}) => {
        this.mapService.flyTo(coords, 15);
      }),
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private appService: AppService,
              private mapService: MapService,
              private router: Router) {
  }

}
