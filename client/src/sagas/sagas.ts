import { showError } from '../actions/error-actions';
import { call, put } from 'redux-saga/effects';
import SERVER from '../actions/server';
import { fetchBooksSuccessActionCreator } from '../actions/book-actions';
import { Book } from '../reducers/reducer';
import { fetchSelectionsAction } from '../actions/selection-actions';

export function* fetchBooks() {
  try {
    let res = (yield call(SERVER.get, '/books')) as { data: Book[] };
    if (res?.data) {
      yield put(fetchBooksSuccessActionCreator(res.data));
    }
  } catch (e) {
    yield put(showError(e as string));
  }
}

type CreateBookAction = { type: string; payload: Book };

export function* createBook({ payload }: CreateBookAction) {
  try {
    const res = (yield call(SERVER.post, 'books', payload)) as { data: { err?: string } };
    if (res?.data?.err) {
      yield put(showError(res.data.err));
    } else {
      yield fetchBooks();
      yield put(fetchSelectionsAction);
    }
  } catch (e) {
    yield put(showError(e as string));
  }
}

type RemoveBookAction = { type: string; payload: string };

export function* removeBook({ payload }: RemoveBookAction) {
  try {
    yield call(SERVER.delete, '/books/' + payload);
    yield fetchBooks();
  } catch (e) {
    yield put(showError(e as string));
  }
}
