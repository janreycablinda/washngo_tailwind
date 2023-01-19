import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './notes.reducer';

export const selectNotesState = createFeatureSelector<State>('notes');

export const selectNotes = createSelector(
    selectNotesState,
    (state: State) => state.notes,
)
