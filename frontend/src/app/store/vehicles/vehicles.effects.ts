import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { VehiclesStoreService } from './vehicles-store.service';
import * as VehicleActions from './vehicles.actions';

@Injectable()
export class VehiclesEffects {


  constructor(private actions$: Actions, private vehiclesStoreService: VehiclesStoreService) {}

  loadVehiclesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(VehicleActions.loadVehiclesRequestedAction),
    mergeMap(() =>{
      return this.vehiclesStoreService.getAllVehicles().pipe(
          switchMap((data: any) => {
            return [
              VehicleActions.loadVehiclesSucceededAction({ payload: data })
            ]
          }),
          // catchError((error: Error) => {
          //   return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          // })
        )
      }
    )
  ));
}
