import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Formik } from 'formik';
import { isObjectEmpty } from '../../utils/utils';
import { createBookActionCreator } from '../../actions/book-actions';
import { Dispatch, DispatchWithoutAction } from 'react';

const CreateBookForm = () => {
  const dispatch = useDispatch();

  const onSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: Dispatch<boolean>;
      resetForm: DispatchWithoutAction;
    },
  ) => {
    // no need to validate; we disable the button if form not valid
    dispatch(
      createBookActionCreator({
        title: values.bookName,
        author: values.bookAuthor,
      }),
    );
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="create_book_form_wrapper">
      <Formik initialValues={{ bookName: '', bookAuthor: '' }} onSubmit={onSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="create_book_form row" onSubmit={handleSubmit}>
            <div className="create_book_input col-md-6">
              <label htmlFor="bookName" className="form-label">
                Book Title
              </label>
              <Field
                type="text"
                className="form-control"
                name="bookName"
                value={values.bookName}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={validateRequiredField}
                data-testid="bookName"
              />
              <ErrorMessage name="bookName">
                {(message) => <span className="form_error">{message}</span>}
              </ErrorMessage>
            </div>
            <div className="create_book_input col-md-6">
              <label htmlFor="bookAuthor" className="form-label">
                Book Author
              </label>
              <Field
                type="text"
                className="form-control"
                name="bookAuthor"
                value={values.bookAuthor}
                onChange={handleChange}
                onBlur={handleBlur}
                validate={validateRequiredField}
                data-testid="bookAuthor"
              />
              <ErrorMessage name="bookAuthor">
                {(message) => <span className="form_error">{message}</span>}
              </ErrorMessage>
            </div>
            <div className="create_book_form_add_btn_wrapper">
              <button
                type="submit"
                disabled={
                  isObjectEmpty(touched) || !isObjectEmpty(errors) || isSubmitting
                }
                className="btn btn-primary"
                data-testid="bookSubmit"
              >
                Create book
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBookForm;

function validateRequiredField(value: any) {
  let error;
  if (!value) {
    error = 'This field is required';
  }
  return error;
}
