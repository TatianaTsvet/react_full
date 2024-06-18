import { runSaga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import SERVER from '../actions/server';
import { SHOW_ERROR_MODAL, showError } from '../actions/error-actions';
import { createBook, fetchBooks } from './sagas';
import { CREATE_BOOK, FETCH_BOOKS_FULFILLED } from '../actions/book-actions';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Saga fetchBooks', () => {
  it('should fetch book successfully', async () => {
    const serverSpy = jest.spyOn(SERVER, 'get').mockImplementation(() =>
      Promise.resolve({
        data: { books: [{ author: 'Jack', title: 'News' }] },
      }),
    );

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      // @ts-ignore
      fetchBooks,
    );

    expect(serverSpy).toHaveBeenCalledTimes(1);
    expect(serverSpy).toHaveBeenCalledWith('/books');
    expect(dispatched).toEqual([
      {
        payload: {
          books: [
            {
              author: 'Jack',
              title: 'News',
            },
          ],
        },
        type: FETCH_BOOKS_FULFILLED,
      },
    ]);
  });

  it('should dispatch error', async () => {
    const serverSpy = jest
      .spyOn(SERVER, 'get')
      .mockImplementation(() => Promise.reject('err message'));

    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      // @ts-ignore
      fetchBooks,
    );

    expect(serverSpy).toHaveBeenCalledTimes(1);
    expect(serverSpy).toHaveBeenCalledWith('/books');
    expect(dispatched).toEqual([
      { type: SHOW_ERROR_MODAL, payload: { message: 'err message' } },
    ]);
  });
});

describe('Saga createBook', () => {
  it('should add book', () => {
    const createBookAction = {
      type: CREATE_BOOK,
      payload: { title: 'New book', author: 'John Doe' },
    };
    const generator = createBook(createBookAction);

    expect(generator.next().value).toEqual(
      call(SERVER.post, 'books', createBookAction.payload),
    );
    expect(generator.next().value).toEqual(fetchBooks());
  });

  it('should dispatch error', () => {
    const createBookAction = {
      type: CREATE_BOOK,
      payload: { title: 'New book', author: 'John Doe' },
    };
    const generator = createBook(createBookAction);

    expect(generator.next().value).toEqual(
      call(SERVER.post, 'books', createBookAction.payload),
    );
    expect(generator.next({ data: { err: 'already added' } }).value).toEqual(
      put(showError('already added')),
    );
  });

  it('should dispatch error2', () => {
    const createBookAction = {
      type: CREATE_BOOK,
      payload: { title: 'New book', author: 'John Doe' },
    };
    const generator = createBook(createBookAction);

    expect(generator.next().value).toEqual(
      call(SERVER.post, 'books', createBookAction.payload),
    );
    expect(generator.throw('server error').value).toEqual(put(showError('server error')));
  });
});
