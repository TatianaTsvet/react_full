import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../reducers/reducer';

function ErrorModal() {
  const errorModal = useSelector((state: StateType) => state.modal);
  const dispatch = useDispatch();
  return (
    <>
      {errorModal?.isShow && <div className="modal_overlay" />}
      <Modal
        show={errorModal?.isShow}
        onHide={() => dispatch({ type: 'HIDE_ERROR_MODAL' })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{errorModal?.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch({ type: 'HIDE_ERROR_MODAL' });
            }}
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;
