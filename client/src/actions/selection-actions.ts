import SERVER from './server';
import { Dispatch } from 'redux';

export const FETCH_SELECTIONS_FULFILLED = 'FETCH_SELECTIONS_FULFILLED';

export const fetchSelections = async (dispatch: Dispatch<any>) => {
  const res = await SERVER.get('/selections');
  dispatch({ type: FETCH_SELECTIONS_FULFILLED, payload: res.data });
};

export const addBookToSelection =
  (bookId: string, selectionId: string) => async (dispatch: Dispatch<any>) => {
    await SERVER.post('/selections/' + selectionId + '/books', [bookId]);
    dispatch(fetchSelections);
  };

export const createSelection = (selection: any) => async (dispatch: Dispatch<any>) => {
  await SERVER.post('/selections', selection);
  dispatch(fetchSelections);
};

export const removeSelection =
  (selectionId: string) => async (dispatch: Dispatch<any>) => {
    await SERVER.delete('/selections/' + selectionId);
    dispatch(fetchSelections);
  };

export const removeBookFromSelection =
  (bookId: string, selectionId: string) => async (dispatch: Dispatch<any>) => {
    await SERVER.delete('/selections/' + selectionId + '/books/' + bookId);
    dispatch(fetchSelections);
  };
