import { createReducer, on } from '@ngrx/store';
import * as NotesActions from './notes.actions';
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

    // on(NotesActions.loadNotes, (state: State, { userId }) => {
    //     console.log(`NotesActions.loadNotes ${userId}`);
    //     return {
    //         ...state,
    //     }
    // }),

    on(NotesActions.loadNotesSuccess, (state: State, { notes }) => {
        return {
            ...state,
            notes: notes
        }
    }),

    on(NotesActions.deleteNote, (state: State, { noteId }) => {
        // console.log(`NotesActions.deleteNote ${noteId}`);

        // const updatedNotes = state.notes.filter(n => n.id !== noteId);
        return {
            ...state,
            // notes: updatedNotes,
        }

    }),

    //
    on(NotesActions.deleteNoteSuccess, (state: State, { noteId }) => {
        console.log(`NotesActions.deleteNoteSuccess ${noteId}`);

        const updatedNotes = state.notes.filter(n => n.id !== noteId);
        return {
            ...state,
            notes: updatedNotes,
        }

    }),


);
