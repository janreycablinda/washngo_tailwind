import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './chart.actions';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class TargetChartResolverService {

    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private _userService: UserService
    ) { }

    resolve() {
        return this.store.select('chart').pipe(
            take(1),
            switchMap(chartState => {
                if (chartState.chartTargetSeries.length === 0) {

                    this._userService.user$
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((user: User) => {
                            this.user = user;
                        });
                    this._unsubscribeAll.next(null);
                    this._unsubscribeAll.complete();

                    this.store.dispatch(ChartActions.loadTargetChartRequestedAction({ branchId: parseInt(this.user["branch"]["id"]) }));

                    // console.log('TargetChartResolverService', chartState.chartTargetSeries);

                    return this.actions$.pipe(
                        ofType(ChartActions.loadTargetChartSucceededAction),
                        take(1)
                    );
                } else {
                    return chartState.chartTargetSeries;
                }
            })
        )
    }
}
