import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { SalesStoreService } from './sales-store.service';
import * as SalesActions from './sales.actions';


@Injectable()
export class SalesEffects {

  constructor(private actions$: Actions, private salesStoreService: SalesStoreService) {}

  loadTransactionsEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.loadSalesRequestedAction),
    mergeMap(() =>{
      return this.salesStoreService.getAllSales().pipe(
          switchMap((data: any) => {
            return [
              SalesActions.loadSalesSucceededAction({ payload: data })
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
