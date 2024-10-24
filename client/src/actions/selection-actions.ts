export const FETCH_SELECTIONS = 'FETCH_SELECTIONS';
export const FETCH_SELECTIONS_FULFILLED = 'FETCH_SELECTIONS_FULFILLED';
export const FETCH_SELECTIONS_STOP = 'FETCH_SELECTIONS_STOP';
export const FETCH_SELECTIONS_STARTED = 'FETCH_SELECTIONS_STARTED';
export const ADD_BOOK_TO_SELECTION = 'ADD_BOOK_TO_SELECTION';
export const FETCH_SELECTIONS_ERROR = 'FETCH_SELECTIONS_ERROR';
export const ADD_BOOK_TO_SELECTION_ABORTED = 'ADD_BOOK_TO_SELECTION_ABORTED';
export const ADD_BOOK_TO_SELECTION_PENDING = 'ADD_BOOK_TO_SELECTION_PENDING';
export const CREATE_SELECTION = 'CREATE_SELECTION';
export const CREATE_SELECTION_ABORTED = 'CREATE_SELECTION_ABORTED';
export const CREATE_SELECTION_PENDING = 'CREATE_SELECTION_PENDING';
export const REMOVE_SELECTION = 'REMOVE_SELECTION';
export const REMOVE_SELECTION_ABORTED = 'REMOVE_SELECTION_ABORTED';
export const REMOVE_SELECTION_PENDING = 'REMOVE_SELECTION_PENDING';
export const REMOVE_BOOK_FROM_SELECTION = 'REMOVE_BOOK_FROM_SELECTION';
export const REMOVE_BOOK_FROM_SELECTION_ABORTED = 'REMOVE_BOOK_FROM_SELECTION_ABORTED';
export const REMOVE_BOOK_FROM_SELECTION_PENDING = 'REMOVE_BOOK_FROM_SELECTION_PENDING';


export const removeBookFromSelectionPendingAction = {
  type: REMOVE_BOOK_FROM_SELECTION_PENDING,
};
export const removeSelectionPendingAction = { type: REMOVE_SELECTION_PENDING };
export const createSelectionPendingAction = { type: CREATE_SELECTION_PENDING };

export const addBookToSelectionActionCreator = (bookId: string, selectionId: string) => ({
  type: ADD_BOOK_TO_SELECTION,
  payload: {
    bookId,
    selectionId,
  },
});

export const createSelectionActionCreator = (payload: {
  title: string;
  author: string;
  email: string;
}) => ({ type: CREATE_SELECTION, payload });

export const addBookToSelectionPendingAction = { type: ADD_BOOK_TO_SELECTION_PENDING };

export const fetchSelectionsAction = { type: FETCH_SELECTIONS };

export const fetchSelectionsStartedAction = (err: any) => ({
  type: FETCH_SELECTIONS_ERROR,
  payload: err,
});

export const removeBookFromSelectionActionCreator = (
  bookId: string,
  selectionId: string,
) => ({
  type: REMOVE_BOOK_FROM_SELECTION,
  payload: {
    bookId,
    selectionId,
  },
});

export const removeSelectionActionCreator = (id: string) => ({
  type: REMOVE_SELECTION,
  payload: { id },
});
