import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap, catchError, of, tap } from 'rxjs';
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
                    console.log("getSalesChart data", data)
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

    loadTargetChartEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ChartActions.loadTargetChartRequestedAction),
        mergeMap((payload) => {
            return this.chartStoreService.getTargetChart(payload.branchId).pipe(
                switchMap((data: any) => {
                    console.log("getTargetChart data", data)
                    return [
                        ChartActions.loadTargetChartSucceededAction({ payload: data })
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

    // updateTargetChartRequestedAction
    updateTargetChartEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(ChartActions.updateTargetChartRequestedAction),
        mergeMap((payload) => {

            return this.chartStoreService.updateTargetChart(payload["payload"]).pipe(
                switchMap((data: any) => {
                    console.log("updateTargetChart data", data)

                    return [
                        NotificationAction.notificationResponse({ payload: { type: 'success', message: 'Target Sales Updated Successfully!' } }),
                        ChartActions.updateTargetChartSucceededAction({ payload: data })
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
