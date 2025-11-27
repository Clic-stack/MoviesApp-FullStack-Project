import { Button, Modal } from 'react-bootstrap';

const ModalForm = ({ children, show, handleClose, save, title}) => {
    return (
        <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-modal-body">
        {children}
      </Modal.Body>

      <Modal.Footer className="custom-modal-footer">
        <Button
          variant="secondary"
          className="custom-button-sm"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="primary"
          className="custom-button"
          onClick={save}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    );
};

export default ModalForm;