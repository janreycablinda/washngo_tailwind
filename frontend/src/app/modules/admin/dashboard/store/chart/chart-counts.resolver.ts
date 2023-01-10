import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { UserService } from 'app/core/user/user.service';
import { Observable, of, switchMap, take } from 'rxjs';
import * as fromApp from 'app/store/app.reducer';
import { userData } from 'app/store/auth/auth.selectors';
import * as ChartActions from './chart.actions';
import { salesCountsData } from './chart.selectors';

@Injectable({
    providedIn: 'root'
})
export class ChartCountsResolver implements Resolve<boolean> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private _userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store.pipe(
            select(salesCountsData),
            take(1),
            switchMap((salesCounts) => {

                // console.log("ChartCountsResolver salesCounts", salesCounts);
                if (!salesCounts["today"]) {
                    this.store.dispatch(ChartActions.loadSalesRequestedtAction({
                        payload: { data: "Today" }
                    }));
                }

                return of(true);
            })
        )

    }
}
