import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { isObjectEmpty, isStringEmpty } from '../../utils/utils';
import { createSelectionActionCreator } from '../../actions/selection-actions';

const CreateSelectionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectionName: '',
      selectionAuthor: '',
      selectionEmail: '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const { selectionName, selectionAuthor, selectionEmail } = data;
    const errors: { selectionName?: string; selectionAuthor?: string } = {};

    if (isStringEmpty(selectionName)) {
      errors.selectionName = 'required';
    }
    if (isStringEmpty(selectionAuthor)) {
      errors.selectionAuthor = 'required';
    }
    if (isObjectEmpty(errors)) {
      dispatch(
        createSelectionActionCreator({
          title: selectionName,
          author: selectionAuthor,
          email: selectionEmail,
        }),
      );
      reset();
    }
  };

  return (
    <div className="create_selection_form_wrapper">
      <form
        className="create_selection_form row"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionName" className="form-label">
            Selection Title
          </label>
          <input
            {...register('selectionName', { required: true })}
            className="form-control"
          />
          {errors.selectionName?.type === 'required' && (
            <span className="form_error">This field is required</span>
          )}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionAuthor" className="form-label">
            Selection Author
          </label>
          <input
            {...register('selectionAuthor', { required: true })}
            className="form-control"
          />
          {errors.selectionAuthor?.type === 'required' && (
            <span className="form_error">This field is required</span>
          )}
        </div>
        <div className="create_selection_input col-md-4">
          <label htmlFor="selectionAuthor" className="form-label">
            E-mail
          </label>
          <input
            {...register('selectionEmail', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Not a valid email',
              },
            })}
            className="form-control"
          />
          {errors.selectionEmail?.type === 'required' && (
            <span className="form_error">This field is required</span>
          )}
          {errors.selectionEmail?.message && (
            <span className="form_error">{errors.selectionEmail?.message}</span>
          )}
        </div>
        <div className="create_selection_form_add_btn_wrapper">
          <button type="submit" className="btn btn-primary">
            Create selection
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSelectionForm;
