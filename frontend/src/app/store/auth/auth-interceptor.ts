import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';
import * as fromApp  from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<any>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("current_user").pipe(
      take(1),  
      exhaustMap(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}