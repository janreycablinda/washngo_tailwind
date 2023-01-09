import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { ServicesStoreService } from './services-store.service';
import * as ServicesActions from './services.actions';

@Injectable()
export class ServicesEffects {

  constructor(private actions$: Actions, private servicesStoreService: ServicesStoreService) {}

  loadSelectedServicesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ServicesActions.loadSelectedServicesRequestedAction),
    mergeMap((data) =>{
      return this.servicesStoreService.getServices(data.payload).pipe(
          switchMap((data: any) => {
            return [
              ServicesActions.loadSelectedServicesSucceededAction({ payload: data })
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
