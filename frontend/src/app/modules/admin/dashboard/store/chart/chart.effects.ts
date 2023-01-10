import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, catchError, of, withLatestFrom, filter, } from 'rxjs';
import { ChartStoreService } from './chart-store.service';
import * as NotificationAction from '../../../../../shared/snackbar/store/snackbar.actions'
import * as ChartDataActions from './chart.actions';
import * as fromApp from 'app/store/app.reducer';
import { salesCountsData } from './chart.selectors';
import { Store } from '@ngrx/store';

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

    loadSales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChartDataActions.loadSalesRequestedtAction),
            withLatestFrom(this.store.select(salesCountsData)),
            filter(([action, data]) => {

                // console.log("loadSalesRequestedtAction effect action", action)
                // console.log("loadSalesRequestedtAction effect action.payload.data", action["payload"]["data"]);
                // console.log("loadSalesRequestedtAction effect data", data)

                if (
                    action["payload"]["data"] === "Today" &&
                    data["today"] === null
                    ||
                    action["payload"]["data"] === "Week" &&
                    data["week"] === null
                    ||
                    action["payload"]["data"] === "Month" &&
                    data["month"] === null
                ) {
                    console.log(`loadSalesRequestedtAction ${action["payload"]["data"]}`, data["month"])
                    return true
                }

                return false
            }),
            // switchMap(([payload, data]) =>
            switchMap(([payload]) =>
                this.chartStoreService.getSales(payload.payload).pipe(
                    switchMap(data => {
                        // console.log("loadSalesRequestedtAction effect data", data)
                        return [
                            ChartDataActions.loadSalesSucceededAction({
                                payload: {
                                    payload: payload.payload,
                                    data: data,
                                }
                            })
                        ]
                    }),
                    catchError(error => of(
                        NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
                    ))
                )
            )
        )
    );

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private chartStoreService: ChartStoreService,
    ) { }
}
