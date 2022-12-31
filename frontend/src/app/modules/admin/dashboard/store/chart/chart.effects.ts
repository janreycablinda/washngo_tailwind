import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { ChartStoreService } from './chart-store.service';
import * as ChartActions from './chart.actions';

@Injectable()
export class ChartEffects {

  constructor(private actions$: Actions, private chartStoreService: ChartStoreService) {}

  loadChartEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ChartActions.loadChartRequestedAction),
    mergeMap((payload) =>{
      return this.chartStoreService.getChart(payload.year).pipe(
          switchMap((data: any) => {
            return [
              ChartActions.loadChartSucceededAction({ payload: data })
            ]
          }),
          // catchError((error: Error) => {
          //   // this.authService.handleAuthError(error);
          //   return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Username or Password is incorrect!' }}));
          // })
        )
      }
    )
  ));

}
