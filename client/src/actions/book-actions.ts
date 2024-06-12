import SERVER from './server';
import { Dispatch } from 'redux';

export const fetchBooks = async (dispatch: Dispatch<any>) => {
  let res = await SERVER.get('/books');
  let books = res.data;
  dispatch({ type: 'FETCH_BOOKS_FULFILLED', payload: { books } });
};

export const createBook = (book: any) => async (dispatch: Dispatch<any>) => {
  await SERVER.post('books', book);
  dispatch(fetchBooks);
};

export const removeBook = (id: string) => async (dispatch: Dispatch<any>) => {
  await SERVER.delete('/books/' + id);
  dispatch(fetchBooks);
};
