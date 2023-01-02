import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap, catchError, of } from 'rxjs';
import { ChartStoreService } from './chart-store.service';
import * as ChartActions from './chart.actions';
import * as NotificationAction from '../../../../../shared/snackbar/store/snackbar.actions'

@Injectable()
export class ChartEffects {

    constructor(private actions$: Actions, private chartStoreService: ChartStoreService) { }

    loadChartEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ChartActions.loadChartRequestedAction),
        mergeMap((payload) => {
            return this.chartStoreService.getSalesChart(payload.year).pipe(
                switchMap((data: any) => {
                    console.log("effect data", data)
                    return [
                        ChartActions.loadChartSucceededAction({ payload: data })
                    ]
                }),
                catchError((error: Error) => {
                    // this.authService.handleAuthError(error);
                    return of(NotificationAction.notificationResponse({ payload: { type: 'chartError', message: 'Chart API Error!' } }));
                })
            )
        }
        )
    ));

}
