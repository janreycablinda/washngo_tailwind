import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotesStoreService } from './notes-store.service';
import * as NotesActions from './notes.actions';
import * as NotificationAction from '../../../../../shared/snackbar/store/snackbar.actions'
import { NoteDTO } from 'app/models/note';

@Injectable()
export class NotesEffects {

    loadNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NotesActions.loadNotes),
            switchMap(({ userId }) => this.notesStoreService.getNotes(userId).pipe(
                switchMap((notes: NoteDTO[]) => [
                    NotesActions.loadNotesSuccess({ notes })
                ]),
                catchError(error => of(
                    NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
                ))
            ))
        )
    );

    // deleteNote$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(NotesActions.loadNotes),
    //         switchMap(({ userId }) => this.notesStoreService.getNotes(userId).pipe(
    //             switchMap((notes: NoteDTO[]) => [
    //                 NotesActions.loadNotesSuccess({ notes })
    //             ]),
    //             catchError(error => of(
    //                 NotificationAction.notificationResponse({ payload: { type: 'chartError', message: `Chart API Error! ${error}` } })
    //             ))
    //         ))
    //     )
    // );

    constructor(
        private actions$: Actions,
        private notesStoreService: NotesStoreService
    ) { }
}
