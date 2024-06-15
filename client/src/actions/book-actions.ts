import { Book } from '../reducers/reducer';

export const FETCH_BOOKS_FULFILLED = 'FETCH_BOOKS_FULFILLED';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

export const fetchBooksAction = { type: FETCH_BOOKS };
export const fetchBooksSuccessActionCreator = (books: Book[]) => ({
  type: FETCH_BOOKS_FULFILLED,
  payload: books,
});
export const createBookActionCreator = (book: Book) => ({
  type: CREATE_BOOK,
  payload: book,
});
export const removeBookActionCreator = (id: string) => ({
  type: REMOVE_BOOK,
  payload: id,
});
