import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ActorCard from '../components/Actors/ActorCard';
import ActorsForm from '../components/Actors/ActorsForm';
import getOneProperty from '../utils/getOneProperty';
import UniversalPagination from '../components/UniversalPagination';

const Actors = () => {

    const actors = useSelector(state => state.actors);

    const [showActorsForm, setShowActorsForm] = useState(false);
    const [ actorSelected, setActorSelected ] = useState(null);
    const [ actorsFiltered, setActorsFiltered ] = useState([])
    useEffect(() => setActorsFiltered(actors), [actors]);

    const nationalities = getOneProperty(actors, "nationality");
    
    const filterNationality = nationality => {
        const filtered = actors.filter(
            actor => actor.nationality === nationality
        );
        setActorsFiltered(filtered);
    }

    const selectActor = actor => {
        setActorSelected(actor);
        setShowActorsForm(true);
    }

    const closeForm = () => {
        setActorSelected(null);
        setShowActorsForm(false);
    }

    return (
        <>
      <Row>
        {/* Columna izquierda: filtros */}
        <Col md={3} xl={2} className="p-3 form-card">
          <h4 className="section-title mb-3">Filter by nationality</h4>
          <ul className="genres-list">
            {nationalities.map(nationality => (
              <li
                className="filter-option"
                key={nationality}
                onClick={() => filterNationality(nationality)}
              >
                {nationality}
              </li>
            ))}
          </ul>
        </Col>

        {/* Columna derecha: listado de actores */}
        <Col>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="section-title">Actors</h1>
            <Button
              className="btn btn-success custom-button"
              onClick={() => setShowActorsForm(true)}
            >
              Add actor
            </Button>
          </div>

          {/* Aquí sustituimos el Row + map por UniversalPagination */}
          <UniversalPagination
            items={actorsFiltered}
            itemsPerPage={8}
            renderItem={(actor) => (
              <ActorCard
                actor={actor}
                key={actor.id}
                selectActor={selectActor}
              />
            )}
          />
        </Col>
      </Row>

      {/* Formulario modal */}
      <ActorsForm
        show={showActorsForm}
        handleClose={closeForm}
        actorSelected={actorSelected}
      />
    </>
    );
};

export default Actors;