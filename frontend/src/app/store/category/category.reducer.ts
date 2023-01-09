import { Action, createReducer, on } from '@ngrx/store';
import { CategoryDTO } from 'app/models/category';
import * as CategoryActions from './category.actions';

export const categoryFeatureKey = 'category';

export interface State {
  categories: CategoryDTO[]
}

export const initialState: State = {
  categories: []
};

export const reducer = createReducer(
  initialState,
  on(CategoryActions.loadCategorySucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      categories: payload
    }
  })
);
