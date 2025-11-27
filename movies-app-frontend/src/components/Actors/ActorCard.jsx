import { Card, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ButtonsEditDelete from '../ButtonsEditDelete';
import { deleteActorThunk } from '../../store/slices/actors.slice';
import formatDate from '../../utils/formatDate';

const ActorCard = ({ actor, selectActor, showOptions=true }) => {

    const { id, image, first_name, last_name, nationality } = actor;

    const birthday = formatDate(actor.birthday);

    const dispatch = useDispatch();

    return (
        <Col>
      <Card className="actor-card h-100">
        {/* Imagen */}
        <Card.Img
          variant="top"
          src={image}
          className="actor-card-img"
        />

        {/* Contenido */}
        <Card.Body className="actor-card-body d-flex flex-column">
          <Card.Title className="actor-card-title">
            {first_name} {last_name}
          </Card.Title>

          <div className="flex-fill actor-card-info">
            <div><b>Birthday: </b>{birthday}</div>
            <div><b>Nationality: </b>{nationality}</div>
          </div>

          {showOptions && (
            <ButtonsEditDelete
              onDelete={() => dispatch(deleteActorThunk(id))}
              onUpdate={() => selectActor(actor)}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
    );
};

export default ActorCard;