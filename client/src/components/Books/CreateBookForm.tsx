import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isObjectEmpty, isStringEmpty } from '../../utils/utils';
import { createBookActionCreator } from '../../actions/book-actions';

export const CreateBookForm = () => {
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [errors, setErrors] = useState<{ bookName?: string; bookAuthor?: string }>({});

  const onSubmit = async () => {
    let errors: { bookName?: string; bookAuthor?: string } = {};

    if (isStringEmpty(bookName)) {
      errors.bookName = 'required';
    }
    if (isStringEmpty(bookAuthor)) {
      errors.bookAuthor = 'required';
    }

    const creator =  createBookActionCreator({
      title: bookName,
      author: bookAuthor,
    });

    console.log(creator, 'action');

    if (isObjectEmpty(errors)) {
      dispatch(
        createBookActionCreator({
          title: bookName,
          author: bookAuthor,
        }),
      );
      setBookName('');
      setBookAuthor('');
      setErrors({});
    } else {
      setErrors(errors);
    }
  };
  return (
    <div className="create_book_form_wrapper">
      <form
        className="create_book_form row"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="create_book_input col-md-6">
          <label htmlFor="bookName" className="form-label">
            Book Title
          </label>
          <input
            type="text"
            className="form-control"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          {errors.bookName && <span className="form_error">This field is required</span>}
        </div>
        <div className="create_book_input col-md-6">
          <label htmlFor="bookAuthor" className="form-label">
            Book Author
          </label>
          <input
            type="text"
            className="form-control"
            id="bookAuthor"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          {errors.bookAuthor && (
            <span className="form_error">This field is required</span>
          )}
        </div>
        <div className="create_book_form_add_btn_wrapper">
          <button type="submit" className="btn btn-primary">
            Create book
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
