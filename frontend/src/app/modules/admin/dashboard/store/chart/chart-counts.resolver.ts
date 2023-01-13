import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, switchMap, take, withLatestFrom } from 'rxjs';
import * as fromApp from 'app/store/app.reducer';
import { userData } from 'app/store/auth/auth.selectors';
import * as ChartActions from './chart.actions';
import { selectChartsState } from './chart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ChartCountsResolver implements Resolve<boolean> {

    constructor(
        private store: Store<fromApp.AppState>,
        // private actions$: Actions,
        // private _userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store.pipe(
            select(selectChartsState),
            take(1),
            withLatestFrom(this.store.pipe(select(userData))),
            switchMap(([chartState, userData]) => {

                console.log(`ChartCountsResolver chartState`, chartState);
                // console.log(`ChartCountsResolver userData`, userData);

                // console.log(`ChartCountsResolver chartState["salesCounts"]`, chartState["salesCounts"]);
                if (chartState["salesCounts"]["today"] === null) {
                    this.store.dispatch(ChartActions.loadSalesRequestedtAction({
                        payload: { data: "Today" }
                    }));
                }

                console.log(`ChartCountsResolver chartState["expensesCounts"]`, chartState["expensesCounts"]);
                if (chartState["expensesCounts"]["today"] === null) {
                    this.store.dispatch(ChartActions.loadExpensesRequestedtAction({
                        payload: {data: "Today", branch_id: userData["branch_id"]}
                    }));
                }

                return of(true);
            }),

        )

    }
}
