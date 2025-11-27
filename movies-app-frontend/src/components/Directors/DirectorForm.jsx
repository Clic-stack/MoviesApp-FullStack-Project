import { useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addDirectorThunk, updateDirectorThunk } from '../../store/slices/directors.slice';
import EmptyImg from '../EmptyImg';
import ModalForm from '../ModalForm';

const defaultDirector = { firstName: "", lastName: "", birthday: "", nationality: "", image: "" }

const DirectorsForm = ({ show, handleClose, directorSelected }) => {

    const [ director, setDirector ] = useState(defaultDirector);

    useEffect(() => {
        if (directorSelected) {
            const normalized = {
                firstName: directorSelected.first_name,
                lastName: directorSelected.last_name,
                birthday: directorSelected.birthday,
                nationality: directorSelected.nationality,
                image: directorSelected.image
            };
            setDirector(normalized);
        } else {
            setDirector(defaultDirector);
        }
    }, [directorSelected]);

    const editDirector = (field, value) => setDirector({...director, [field]: value});

    const dispatch = useDispatch();

    const saveDirector = () => {
        const normalizedDirector = {
            first_name: director.firstName,
            last_name: director.lastName,
            birthday: director.birthday,
            nationality: director.nationality,
            image: director.image
        };

        if (!directorSelected) {
            dispatch(addDirectorThunk(normalizedDirector));
        } else {
            dispatch(updateDirectorThunk(directorSelected.id, normalizedDirector));
        }

        handleClose();
        setDirector(defaultDirector);
    };

    return (
        <ModalForm
      show={show}
      handleClose={handleClose}
      title="Directors form"
      save={saveDirector}
    >
      <Form>
        <Row className="mb-3">
          <Col xs={9}>
            <FloatingLabel label="Image URL">
              <Form.Control
                className="form-control-soft"
                required
                placeholder="Image URL"
                value={director.image}
                onChange={e => editDirector("image", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <EmptyImg src={director.image} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FloatingLabel label="First name">
              <Form.Control
                className="form-control-soft"
                required
                placeholder="First name"
                value={director.firstName}
                onChange={e => editDirector("firstName", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Last name">
              <Form.Control
                className="form-control-soft"
                required
                placeholder="Last name"
                value={director.lastName}
                onChange={e => editDirector("lastName", e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FloatingLabel label="Nationality">
              <Form.Control
                className="form-control-soft"
                required
                placeholder="Nationality"
                value={director.nationality}
                onChange={e => editDirector("nationality", e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Birthday">
              <Form.Control
                className="form-control-soft"
                required
                type="date"
                placeholder="Birthday"
                value={director.birthday}
                onChange={e => editDirector("birthday", e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
    </ModalForm>
    );
};

export default DirectorsForm;