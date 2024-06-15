import { useDispatch, useSelector } from 'react-redux';
import { Book, StateType } from '../../reducers/reducer';
import { useCallback } from 'react';
import { removeBookActionCreator } from '../../actions/book-actions';

const Books = () => {
  const books = useSelector((state: StateType) => state.books);
  const dispatch = useDispatch();

  const renderBook = useCallback(
    (book: Book, idx: number) => (
      <li
        key={idx}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <strong>{book.title}</strong> by {book.author}
        </span>
        <span className="pull-right">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => book._id && dispatch(removeBookActionCreator(book._id))}
          >
            DELETE
          </button>
        </span>
      </li>
    ),
    [dispatch],
  );

  return <ul className="list-group books-list">{books.map(renderBook)}</ul>;
};

export default Books;
