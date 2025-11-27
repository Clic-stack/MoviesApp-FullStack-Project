import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addGenreThunk } from '../../store/slices/genres.slice';
import GenreItem from './GenreItem';

const GenresModal = ({ show, handleClose }) => {

    const genres = useSelector(state => state.genres);
    const [newGenre, setNewGenre] = useState("");

    const dispatch = useDispatch();

    // Añadido recientemente
    const addGenre = () => {
    if (newGenre.trim() !== '') {
      dispatch(addGenreThunk(newGenre));
      setNewGenre('');
    }
  };

    return (
        <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">Genres</Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-modal-body">
        {/* Input para nuevo género */}
        <InputGroup className="mb-3">
          <Form.Control
            className="form-control-soft"
            placeholder="New genre"
            value={newGenre}
            onChange={e => setNewGenre(e.target.value)}
          />
          <Button
            variant="outline-success"
            className="custom-button-sm"
            onClick={addGenre}
          >
            Add
          </Button>
        </InputGroup>

        {/* Lista de géneros */}
        <ul className="genres-list">
          {genres.map(genre => (
            <GenreItem genre={genre} key={genre.id} />
          ))}
        </ul>
      </Modal.Body>
    </Modal>
    );
};

export default GenresModal;