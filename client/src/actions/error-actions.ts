export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';

export const showError = (message: string) => ({
  type: SHOW_ERROR_MODAL,
  payload: { message },
});
