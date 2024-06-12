import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { removeBookFromSelection } from '../../actions/selection-actions';
import { StateType } from '../../reducers/reducer';
import { FC } from 'react';

interface BookInSelectionProps {
  bookId: string;
  selectionId: string;
}

const BookInSelection: FC<BookInSelectionProps> = (props) => {
  const { bookId, selectionId } = props;
  const dispatch = useDispatch();
  const books = useSelector((state: StateType) => state.books);
  let book = books.find((el) => el._id === bookId);
  return (
    <div className="selection_list_item">
      <span>
        <strong>{book?.title}</strong> by {book?.author}
      </span>
      <Button
        onClick={() => dispatch(removeBookFromSelection(bookId, selectionId))}
        variant="outline-danger"
      >
        Delete
      </Button>
    </div>
  );
};

export default BookInSelection;
