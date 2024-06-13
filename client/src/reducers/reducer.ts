import { Store } from 'redux';

export type CustomStore = Store<StateType, { type: string; payload: any }> & {
  dispatch: unknown;
};

export interface BookSelection {
  author: string;
  title: string;
  _id: string;
  books: any[];
}

export interface Book {
  _id: string;
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
    case 'FETCH_SELECTIONS_FULFILLED':
      return {
        ...state,
        selections: {
          ...state.selections,
          data: action.payload,
        },
      };
    case 'FETCH_BOOKS_FULFILLED':
      return {
        ...state,
        books: [...action.payload.books],
      };
    case 'REMOVE_BOOK_FROM_SELECTION':
      return {
        ...state,
        book: {
          selectionId: action.payload.selectionId,
          bookId: action.payload.bookId,
        },
      };
    case 'CREATE_SELECTION':
      return {
        ...state,
        selections: {
          ...state.selections,
          ...action.payload,
        },
      };
    case 'CREATE_BOOK':
      return {
        ...state,
        selections: {
          ...state.books,
          ...action.payload,
        },
      };
    case 'CREATE_SELECTION_FULFILLED':
      return {
        ...state,
        selections: {
          ...state.selections,
          isPending: false,
          newSelection: null,
        },
      };
    case 'CREATE_BOOK_FULFILLED':
      return {
        ...state,
        selections: {
          ...state.selections,
          isPending: false,
          newSelection: null,
        },
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
