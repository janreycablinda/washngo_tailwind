import { createReducer, on } from '@ngrx/store';
// import * as NotesActions from './notes.actions';
import { NoteDTO } from 'app/models/note';

export const notesFeatureKey = 'notes';

export interface State {
    notes: NoteDTO[];
}

export const initialState: State = {
    notes: [],
};

export const notesReducer = createReducer(
    initialState,

    // on(NotesActions.loadNotesSucceededAction, (state: State, { payload }) => {
    //     return {
    //         ...state,
    //         notes: payload,

    //     }
    // }),

);
