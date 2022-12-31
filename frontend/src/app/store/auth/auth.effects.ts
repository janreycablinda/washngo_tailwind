import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as AuthAction from './auth.actions';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import * as NotificationAction from '../../shared/snackbar/store/snackbar.actions'

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions, 
    private http: HttpClient,
    ) {}

  loginUserEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginRequestedAction),
    mergeMap((data) =>{
      return this.http.post<any>(environment.backend_url + '/api/auth/login', data).pipe(
          switchMap((data: any) => {
            console.log(data);
            // this.authService.handleAuthentication(data);
            // return [
            //   AuthAction.getUserDataRequestedAction({ payload: data })
            // ]
            return [];
          }),
          catchError((error: Error) => {
            // this.authService.handleAuthError(error);
            return of(NotificationAction.notificationResponse({payload: { type: 'authError', message: 'Username or Password is incorrect!' }}));
          })
        )
      }
    )
  ));
}
