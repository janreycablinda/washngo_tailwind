import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, take, takeUntil } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Subject } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private store: Store<any>,
        private _userService: UserService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.store.select("auth").pipe(
            take(1),
            exhaustMap((authState: AppState["auth"]) => {
                if (!authState.user) {
                    this._userService.user$
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((user: User) => {
                            this.user = user;
                            // console.log("this.user", this.user);
                            this.store.dispatch(AuthActions.getUserDataSucceededAction({ payload: user }));
                        });
                    this._unsubscribeAll.next(null);
                    this._unsubscribeAll.complete();
                    // console.log('intercepted', authState);
                }
                return next.handle(req);
            })
        );

    }
}
