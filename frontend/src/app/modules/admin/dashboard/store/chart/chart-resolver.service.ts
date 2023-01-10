import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as ChartActions from './chart.actions';
import { Observable, Subject, map, switchMap, take, takeUntil, withLatestFrom } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { salesSeriesData, salesTargetSeriesData } from './chart.selectors';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class SalesChartResolverService {

    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private _userService: UserService
    ) { }

    // resolve() : Observable<any[]> {
    resolve() {
        return this.store.pipe(
            select(salesSeriesData),
            take(1),
            map(salesSeriesData => {
                // console.log("salesSeriesData", salesSeriesData)
                if (salesSeriesData.length === 0) {

                    // get user branch id
                    this._userService.user$
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((user: User) => {
                            this.user = user;
                            console.log("this.user", this.user)
                        });
                    this._unsubscribeAll.next(null);
                    this._unsubscribeAll.complete();

                    this.store.dispatch(ChartActions.loadTargetSalesSeriesRequestedtAction({ branchId: parseInt(this.user["branch_id"]) }));
                    this.store.dispatch(ChartActions.loadSalesSeriesRequestedtAction({ year: 2023 }));

                    return this.actions$.pipe(
                        ofType(ChartActions.loadSalesSeriesSucceededAction),
                        take(1)
                    );

                } else {
                    return salesSeriesData;
                }
            }),

        );
    }
}
