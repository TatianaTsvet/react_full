import { ofType } from 'redux-observable';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import SERVER from '../actions/server';
import { showError } from '../actions/error-actions';
import {
  ADD_BOOK_TO_SELECTION,
  ADD_BOOK_TO_SELECTION_ABORTED,
  addBookToSelectionPendingAction,
  CREATE_SELECTION,
  CREATE_SELECTION_ABORTED,
  createSelectionPendingAction,
  FETCH_SELECTIONS,
  FETCH_SELECTIONS_FULFILLED,
  FETCH_SELECTIONS_STARTED,
  FETCH_SELECTIONS_STOP,
  fetchSelectionsAction,
  REMOVE_BOOK_FROM_SELECTION,
  REMOVE_BOOK_FROM_SELECTION_ABORTED,
  REMOVE_SELECTION,
  REMOVE_SELECTION_ABORTED,
  removeBookFromSelectionPendingAction,
  removeSelectionPendingAction,
} from '../actions/selection-actions';

export const fetchSelectionEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(FETCH_SELECTIONS),
    switchMap(() =>
      from(SERVER.get('/selections')).pipe(
        map(({ data }) => ({
          type: FETCH_SELECTIONS_FULFILLED,
          payload: data,
        })),
        takeUntil(action$.pipe(ofType(FETCH_SELECTIONS_STOP))),
        startWith({ type: FETCH_SELECTIONS_STARTED }),
        catchError((e) => of(showError(e))),
      ),
    ),
  );

export const addBookToSelectionEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(ADD_BOOK_TO_SELECTION),
    switchMap(({ payload: { selectionId, bookId } }) =>
      from(SERVER.post('/selections/' + selectionId + '/books', [bookId])).pipe(
        map(() => fetchSelectionsAction),
        takeUntil(action$.pipe(ofType(ADD_BOOK_TO_SELECTION_ABORTED))),
        startWith(addBookToSelectionPendingAction),
        catchError((e) => of(showError(e))),
      ),
    ),
  );

export const createSelectionEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(CREATE_SELECTION),
    switchMap(({ payload }) =>
      from(SERVER.post('/selections', payload)).pipe(
        map(() => fetchSelectionsAction),
        takeUntil(action$.pipe(ofType(CREATE_SELECTION_ABORTED))),
        startWith(createSelectionPendingAction),
        catchError((e) => of(showError(e))),
      ),
    ),
  );

export const removeSelectionEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(REMOVE_SELECTION),
    switchMap(({ payload: { id } }) =>
      from(SERVER.delete('/selections/' + id)).pipe(
        map(() => fetchSelectionsAction),
        takeUntil(action$.pipe(ofType(REMOVE_SELECTION_ABORTED))),
        startWith(removeSelectionPendingAction),
        catchError((e) => of(showError(e))),
      ),
    ),
  );

export const removeBookFromSelectionEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(REMOVE_BOOK_FROM_SELECTION),
    switchMap(({ payload: { selectionId, bookId } }) =>
      from(SERVER.delete('/selections/' + selectionId + '/books/' + bookId)).pipe(
        map(() => fetchSelectionsAction),
        takeUntil(action$.pipe(ofType(REMOVE_BOOK_FROM_SELECTION_ABORTED))),
        startWith(removeBookFromSelectionPendingAction),
        catchError((e) => of(showError(e))),
      ),
    ),
  );
