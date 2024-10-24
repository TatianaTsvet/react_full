import { Book } from '../reducers/reducer';

export const FETCH_BOOKS_FULFILLED = 'FETCH_BOOKS_FULFILLED';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

export const FETCH_ONE_BOOK_FULFILLED = 'FETCH_ONE_BOOK_FULFILLED'
export const FETCH_ONEBOOK_STOP = 'FETCH_ONEBOOK_STOP'
export const FETCH_ONE_BOOK = 'FETCH_ONE_BOOK'
export const FETCH_ONE_BOOK_STARTED = 'FETCH_ONE_BOOK_STARTED'

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

export const fetchOneBookActionCreator = (bookId: string) => ({
  type: FETCH_ONE_BOOK,
  payload: bookId
})

export const fetchOneBookFullfiledActionCreator = (book: Book) => ({
  type: FETCH_ONE_BOOK_FULFILLED,
  payload: book
})

export const fetchOneBookStopActionCreator = () => ({
  type: FETCH_ONEBOOK_STOP,
})

export const fetchOneBookStartActionCreator = () => ({
  type: FETCH_ONE_BOOK_STARTED,
})
