import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, catchError, of, } from 'rxjs';
import { ChartStoreService } from './chart-store.service';
import * as NotificationAction from '../../../../../shared/snackbar/store/snackbar.actions'
import * as ChartDataActions from './chart.actions';

@Injectable()
export class ChartEffects {

    loadSalesSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChartDataActions.loadSalesSeriesRequestedtAction),
            switchMap(payload =>
                this.chartStoreService.getSalesSeries(payload.year).pipe(
                    switchMap(data => {
                        // console.log("effect data", data)
                        return [
                            ChartDataActions.loadSalesSeriesSucceededAction({ payload: data })
                        ]
                    }),
                    catchError(error => of(
                        NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
                    ))
                )
            )
        ));

    loadTargetSalesSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChartDataActions.loadTargetSalesSeriesRequestedtAction),
            switchMap(payload =>
                this.chartStoreService.getTargetSalesSeries(payload.branchId).pipe(
                    switchMap(data => {
                        // console.log("loadTargetSalesSeries effect data", data)
                        return [
                            ChartDataActions.loadTargetSalesSeriesSucceededAction({ payload: data })
                        ]
                    }),
                    catchError(error => of(
                        NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
                    ))
                )
            )
        ));

    updateTargetSalesSeries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChartDataActions.updateTargetSalesSeriesRequestedtAction),
            switchMap(payload =>
                this.chartStoreService.updateTargetSalesSeries(payload.payload).pipe(
                    switchMap(res => {
                        console.log("updateTargetSalesSeriesRequestedtAction effect data", res)
                        return [
                            ChartDataActions.updateTargetSalesSeriesSucceededAction({ payload: res })
                        ]
                    }),
                    catchError(error => of(
                        NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
                    ))
                )
            )
        ));

    constructor(
        private actions$: Actions,
        private chartStoreService: ChartStoreService,
    ) { }
}
