import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { SalesStoreService } from './sales-store.service';
import * as SalesActions from './sales.actions';


@Injectable()
export class SalesEffects {

  constructor(private actions$: Actions, private salesStoreService: SalesStoreService) {}

  loadTransactionsEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.loadSalesRequestedAction),
    mergeMap(() =>{
      return this.salesStoreService.getAllSales().pipe(
          switchMap((data: any) => {
            return [
              SalesActions.loadSalesSucceededAction({ payload: data })
            ]
          }),
          // catchError((error: Error) => {
          //   return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          // })
        )
      }
    )
  ));

  addTransactionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.addSaleRequestedAction),
    mergeMap((payload) =>{
      console.log(payload);
      return this.salesStoreService.addSale(payload.payload).pipe(
          switchMap((data: any) => {
            console.log(data);
            return [
              SalesActions.addSaleSucceededAction({ payload: data })
            ]
          }),
          // catchError((error: Error) => {
          //   return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          // })
        )
      }
    )
  ));

  deleteTransactionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.deleteSaleRequestedAction),
    mergeMap((payload) =>{
      console.log(payload);
      return this.salesStoreService.deleteSale(payload.id).pipe(
          switchMap((data: any) => {
            return [
              SalesActions.deleteSaleSucceededAction({ id: data.id })
            ]
          }),
          // catchError((error: Error) => {
          //   return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          // })
        )
      }
    )
  ));

  getWorkOrderEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(SalesActions.loadWorkOrderRequestedAction),
    mergeMap(() =>{
      return this.salesStoreService.getWorkOrder().pipe(
          switchMap((data: any) => {
            console.log(data);
            return [
              SalesActions.loadWorkOrderSucceededAction({ payload: data })
            ]
          }),
          // catchError((error: Error) => {
          //   return of(NotificationAction.notificationResponse({payload: { type: 'error', message: 'Ops, something went wrong!' }}));
          // })
        )
      }
    )
  ));
}
