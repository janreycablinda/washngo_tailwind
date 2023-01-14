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
import { selectNotes } from './notes.selectors';
import * as NotesActions from './notes.actions';

@Injectable({
    providedIn: 'root'
})
export class NotesResolver implements Resolve<boolean> {

    constructor(
        private store: Store<fromApp.AppState>,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store.pipe(
            select(selectNotes),
            take(1),
            withLatestFrom(this.store.pipe(select(userData))),
            switchMap(([notes, userData]) => {

                console.log(`NotesResolver activated`);
                // console.log(`NotesResolver notes`, notes);
                // console.log(`NotesResolver userData`, userData);

                // console.log(`NotesResolver notes.length`, notes.length);
                if (notes.length === 0) {
                    const userId = typeof userData["id"] === 'number' ? userData["id"] : +userData["id"];

                    this.store.dispatch(NotesActions.loadNotes({
                        userId
                    }));
                }
                return of(true);
            }),

        )
        // return of(true);

    }
}
