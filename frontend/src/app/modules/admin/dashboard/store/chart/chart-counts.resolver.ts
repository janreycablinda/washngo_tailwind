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
            select(userData),
            take(1),
            switchMap((user) => {

                // console.log("ChartCountsResolver user", user);
                this.store.dispatch(ChartActions.loadSalesRequestedtAction({
                    payload: { data: "Today" }
                }));

                return of(true);
            })
        )

    }
}
