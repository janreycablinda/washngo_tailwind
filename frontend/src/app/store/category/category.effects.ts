import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, Observable, switchMap } from 'rxjs';
import { CategoryStoreService } from './category-store.service';
import * as CategoryActions from './category.actions';



@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions, private categoryStoreService: CategoryStoreService) {}

  loadCategoryEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadCategoryRequestedAction),
    mergeMap(() =>{
      return this.categoryStoreService.getAllCategory().pipe(
          switchMap((data: any) => {
            return [
              CategoryActions.loadCategorySucceededAction({ payload: data })
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
