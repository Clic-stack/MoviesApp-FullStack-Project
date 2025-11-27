import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DirectorCard from '../components/Directors/DirectorCard';
import DirectorForm from '../components/Directors/DirectorForm';
import getOneProperty from '../utils/getOneProperty';
import UniversalPagination from '../components/UniversalPagination'

const Directors = () => {

    const directors = useSelector(state => state.directors);

    const [showDirectorsForm, setShowDirectorsForm] = useState(false);
    const [directorSelected, setDirectorSelected] = useState(null);
    const [ directorsFiltered, setDirectorsFiltered ] = useState([]);
    useEffect(() => setDirectorsFiltered(directors), [directors]);

    const nationalities = getOneProperty(directors, "nationality");
    
    const filterNationality = nationality => {
        const filtered = directors.filter(
            actor => actor.nationality === nationality
        );
        setDirectorsFiltered(filtered);
    }

    const selectDirector = director => {
        setDirectorSelected(director);
        setShowDirectorsForm(true);
    }

    const closeForm = () => {
        setDirectorSelected(null);
        setShowDirectorsForm(false);
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

        {/* Columna derecha: listado de directores */}
        <Col>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="section-title">Directors</h1>
            <Button
              className="btn btn-success custom-button"
              onClick={() => setShowDirectorsForm(true)}
            >
              Add director
            </Button>
          </div>

          {/* Aquí sustituimos el Row + map por UniversalPagination */}
                    <UniversalPagination
                      items={directorsFiltered}
                      itemsPerPage={8}
                      renderItem={(director) => (
                        <DirectorCard
                          director={director}
                          key={director.id}
                          selectDirector={selectDirector}
                        />
                      )}
                    />
                  </Col>
                </Row>

      {/* Formulario modal */}
      <DirectorForm
        show={showDirectorsForm}
        handleClose={closeForm}
        directorSelected={directorSelected}
      />
    </>
    );
};

export default Directors;