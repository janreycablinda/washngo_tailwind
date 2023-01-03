import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './chart.actions';
import { switchMap, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
    providedIn: 'root'
})
export class TargetChartResolverService {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve() {
        return this.store.select('chart').pipe(
            take(1),
            switchMap(chartState => {
                if (chartState.chartTargetSeries.length === 0) {
                    this.store.dispatch(ChartActions.loadChartRequestedAction({ year: 2023 }));
                    console.log('TargetChartResolverService', chartState.chartTargetSeries);
                    return this.actions$.pipe(
                        ofType(ChartActions.loadChartSucceededAction),
                        take(1)
                    );
                } else {
                    return chartState.chartTargetSeries;
                }
            })
        )
    }
}
