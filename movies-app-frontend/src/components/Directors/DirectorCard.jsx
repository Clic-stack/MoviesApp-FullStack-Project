import { Card, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ButtonsEditDelete from '../ButtonsEditDelete';
import { deleteDirectorThunk } from '../../store/slices/directors.slice'
import formatDate from '../../utils/formatDate';

const DirectorCard = ({ director, selectDirector, showOptions=true }) => {

    const { id, image, first_name, last_name, nationality } = director;

    const birthday = formatDate(director.birthday)

    const dispatch = useDispatch();

    return (
        <Col>
      <Card className="director-card h-100">
        {/* Imagen */}
        <Card.Img
          variant="top"
          src={image}
          className="director-card-img"
        />

        {/* Contenido */}
        <Card.Body className="director-card-body d-flex flex-column">
          <Card.Title className="director-card-title">
            {first_name} {last_name}
          </Card.Title>

          <div className="flex-fill director-card-info">
            <div><b>Birthday: </b>{birthday}</div>
            <div><b>Nationality: </b>{nationality}</div>
          </div>

          {showOptions && (
            <ButtonsEditDelete
              onDelete={() => dispatch(deleteDirectorThunk(id))}
              onUpdate={() => selectDirector(director)}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
    );
};

export default DirectorCard;