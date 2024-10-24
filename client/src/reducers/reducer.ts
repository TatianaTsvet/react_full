import { Store } from 'redux';
import { FETCH_BOOKS_FULFILLED } from '../actions/book-actions';
import { FETCH_SELECTIONS_FULFILLED } from '../actions/selection-actions';

export type CustomStore = Store<StateType, { type: string; payload: any }> & {
  dispatch: unknown;
};

export interface BookSelection {
  author: string;
  title: string;
  _id: string;
  books: string[][];
}

export interface Book {
  _id?: string;
  author: string;
  title: string;
}

export interface StateType {
  books: Book[];
  selections: {
    data: BookSelection[];
  };
  modal: {
    message?: string;
    isShow?: boolean;
  };
}

const initialState: StateType = {
  books: [],
  selections: { data: [] },
  modal: {},
};

export const reducer = (
  state = initialState,
  action: { type: string; payload: any },
): any => {
  switch (action.type) {
    case FETCH_SELECTIONS_FULFILLED:
      return {
        ...state,
        selections: {
          ...state.selections,
          data: action.payload,
        },
      };
    case FETCH_BOOKS_FULFILLED:
      return {
        ...state,
        books: action.payload,
      };
    case 'HIDE_ERROR_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: false,
        },
      };
    case 'SHOW_ERROR_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          message: action.payload.message,
          isShow: true,
        },
      };
    default:
      return state;
  }
};
