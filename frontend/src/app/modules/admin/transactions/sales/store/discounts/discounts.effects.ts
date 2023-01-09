import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { DiscountsStoreService } from './discounts-store.service';
import * as DiscountActions from './discounts.actions';

@Injectable()
export class DiscountsEffects {

  constructor(private actions$: Actions, private discountsStoreService: DiscountsStoreService) {}

  loadDiscountEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(DiscountActions.loadDiscountRequestedAction),
    mergeMap(() =>{
      return this.discountsStoreService.getAllDiscounts().pipe(
          switchMap((data: any) => {
            return [
              DiscountActions.loadDiscountSucceededAction({ payload: data })
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
