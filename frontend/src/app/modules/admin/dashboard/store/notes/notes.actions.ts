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
