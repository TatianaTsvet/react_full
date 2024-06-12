export const showError = (message: string) => ({
  type: 'SHOW_ERROR_MODAL',
  payload: { message },
});
