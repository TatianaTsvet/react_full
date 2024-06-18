import { reducer } from './reducer';

const initialState = {
  books: [],
  selections: { data: [] },
  modal: {},
};

describe('Reducer', () => {
  test('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should return modal data', () => {
    expect(
      reducer(undefined, {
        type: 'SHOW_ERROR_MODAL',
        payload: { message: 'err message' },
      }),
    ).toEqual({
      books: [],
      selections: { data: [] },
      modal: {
        message: 'err message',
        isShow: true,
      },
    });
  });
});
