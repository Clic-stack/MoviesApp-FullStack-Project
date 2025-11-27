
import { Button } from 'react-bootstrap';

const ButtonsEditDelete = ({ onDelete, onUpdate, size='sm', rounded=false }) => {
    return (
        <div className="d-flex justify-content-end buttons-edit-delete">
      {/* Botón eliminar */}
      <Button
        variant="danger"
        size={size}
        className={`me-2 custom-button-delete ${rounded ? 'rounded-circle' : ''}`}
        onClick={onDelete}
      >
        <i className="fa-solid fa-trash-can"></i>
      </Button>

      {/* Botón editar */}
      <Button
        variant="warning"
        size={size}
        className={`custom-button-edit ${rounded ? 'rounded-circle' : ''}`}
        onClick={onUpdate}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Button>
    </div>
    );
};

export default ButtonsEditDelete;