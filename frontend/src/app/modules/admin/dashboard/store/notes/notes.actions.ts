import { createAction, props } from '@ngrx/store';
import { NoteDTO } from 'app/models/note';

export const loadNotes = createAction(
    '[Notes] Load Notes',
    props<{ userId: number }>()
);

export const loadNotesSuccess = createAction(
    '[Notes] Load Notes Success',
    props<{ notes: NoteDTO[] }>()
);

export const deleteNote = createAction(
    '[Notes] Delete Note',
    props<{ noteId: number }>()
);
export const deleteNoteSuccess = createAction(
    '[Notes] Delete Note Success',
    props<{ noteId: number }>()
);
export const deleteNoteFailure = createAction(
    '[Notes] Delete Note Failure',
    props<{ error: any }>()
);
