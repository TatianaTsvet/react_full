import SERVER from './server';
import { Dispatch } from 'redux';

export const fetchSelections = async (dispatch: Dispatch<any>) => {
  let res = await SERVER.get('/selections');
  let selections = res.data;
  dispatch({ type: 'FETCH_SELECTIONS_FULFILLED', payload: selections });
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
