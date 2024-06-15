import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { StateType } from '../../reducers/reducer';
import { FC, useMemo } from 'react';
import { removeBookFromSelectionActionCreator } from '../../actions/selection-actions';

interface BookInSelectionProps {
  bookId: string;
  selectionId: string;
}

const BookInSelection: FC<BookInSelectionProps> = ({ bookId, selectionId }) => {
  const books = useSelector((state: StateType) => state.books);
  const dispatch = useDispatch();

  const book = useMemo(() => books.find((el) => el._id === bookId), [books]);

  return (
    <div className="selection_list_item">
      <span>
        <strong>{book?.title}</strong> by {book?.author}
      </span>
      <Button
        onClick={() =>
          dispatch(removeBookFromSelectionActionCreator(bookId, selectionId))
        }
        variant="outline-danger"
      >
        Delete
      </Button>
    </div>
  );
};

export default BookInSelection;
