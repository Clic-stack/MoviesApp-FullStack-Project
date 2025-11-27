import { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActorsForm from '../components/Actors/ActorsForm';
import DirectorsForm from '../components/Directors/DirectorForm';
import EmptyImg from '../components/EmptyImg';
import GenresModal from '../components/Genres/GenresModal';
import ItemsSelect from '../components/ItemsSelect';
import { addMovieThunk, updateMovieThunk } from '../store/slices/movies.slice';
import searchAndFormatMovie from '../utils/searchAndFormatMovie';

const defaultMovie = {
  name: "", 
  image: "", 
  synopsis: "", 
  release_year: "", 
  genres: [], 
  directors: [], 
  actors: []
}

const MovieForm = () => {

    const { genres, actors, directors, movies } = useSelector(state => state);

    const { id } = useParams();

    useEffect(() => {
        if (id && movies.length) setMovie(searchAndFormatMovie(movies, +id))
    }, [id, movies])

    const [movie, setMovie] = useState(defaultMovie);
    const editMovie = (field, value) => setMovie({ ...movie, [field]: value });
    
    const [showForm, setShowForm] = useState({ genres: false, actors: false, directors: false });
    const openForm = form => setShowForm({ ...showForm, [form]: true });
    const closeForm = form => setShowForm({ ...showForm, [form]: false });


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saveMovie = () => {
        const normalizedMovie = {
            name: movie.name,
            image: movie.image,
            synopsis: movie.synopsis,
            release_year: movie.release_year,
            genres: movie.genres,       // ya son IDs
            directors: movie.directors, // ya son IDs
            actors: movie.actors        // ya son IDs
        };

        if (!id) {
            dispatch(addMovieThunk(normalizedMovie));
            navigate("/");
        } else {
            dispatch(updateMovieThunk(+id, normalizedMovie));
            navigate(`/movies/${id}`);
        }
    };


    return (
        <div className="movie-form-container">
      <Row className="gx-4">
        {/* Columna izquierda: imagen */}
        <Col xs={12} md={5}>
          <FloatingLabel label="Image url" className="mb-4">
            <Form.Control
              className="form-control-soft"
              placeholder="Image url"
              value={movie.image}
              onChange={e => editMovie('image', e.target.value)}
            />
          </FloatingLabel>
          <EmptyImg src={movie.image} />
        </Col>

        {/* Columna derecha: formulario */}
        <Col xs={12} md={7}>
          <div className="form-card p-4">
            <input
              className="movie-name-input mb-5"
              placeholder="Movie name"
              value={movie.name}
              onChange={e => editMovie('name', e.target.value)}
            />

            {/* Géneros */}
            <div className="section-header d-flex justify-content-between align-items-start">
              <h4 className="section-title">Genres</h4>
              <Button
                className="btn btn-outline-success custom-button-sm"
                size="sm"
                onClick={() => openForm('genres')}
              >
                Add genre
              </Button>
            </div>
            <ItemsSelect
              items={genres}
              itemStructure={genre => <Card.Body className="form-card">{genre.name}</Card.Body>}
              itemsSelected={movie.genres}
              setItemsSelected={e => editMovie('genres', e)}
            />

            {/* Año de estreno */}
            <FloatingLabel label="Release year" className="mb-4">
              <Form.Control
                className="form-control-soft"
                type="number"
                value={movie.release_year}
                onChange={e => editMovie('release_year', e.target.value)}
              />
            </FloatingLabel>

            {/* Sinopsis */}
            <FloatingLabel label="Synopsis" className="mt-3">
              <Form.Control
                className="form-control-soft"
                as="textarea"
                placeholder="Synopsis"
                style={{ height: '150px' }}
                value={movie.synopsis}
                onChange={e => editMovie('synopsis', e.target.value)}
              />
            </FloatingLabel>

            {/* Directores */}
            <div className="section-header d-flex justify-content-between align-items-start mt-4">
              <h4 className="section-title">Directors</h4>
              <Button
                className="btn btn-outline-success custom-button-sm"
                size="sm"
                onClick={() => openForm('directors')}
              >
                Add Director
              </Button>
            </div>
            <ItemsSelect
              items={directors}
              itemStructure={director => (
                <Card.Body className="form-card">
                  {director.first_name} {director.last_name}
                </Card.Body>
              )}
              itemsSelected={movie.directors}
              setItemsSelected={e => editMovie('directors', e)}
            />

            {/* Actores */}
            <div className="section-header d-flex justify-content-between align-items-start mt-4">
              <h4 className="section-title">Actors</h4>
              <Button
                className="btn btn-outline-success custom-button-sm"
                size="sm"
                onClick={() => openForm('actors')}
              >
                Add actor
              </Button>
            </div>
            <ItemsSelect
              items={actors}
              itemStructure={actor => (
                <Card.Body className="form-card">
                  {actor.first_name} {actor.last_name}
                </Card.Body>
              )}
              itemsSelected={movie.actors}
              setItemsSelected={e => editMovie('actors', e)}
            />
          </div>
        </Col>
      </Row>

      {/* Botón flotante */}
      <div className="options-movie-buttons">
        <Button
          className="btn btn-success custom-button"
          size="lg"
          onClick={saveMovie}
        >
          Save movie
        </Button>
      </div>

      {/* Modales */}
      <GenresModal show={showForm.genres} handleClose={() => closeForm('genres')} />
      <ActorsForm show={showForm.actors} handleClose={() => closeForm('actors')} />
      <DirectorsForm show={showForm.directors} handleClose={() => closeForm('directors')} />
    </div>
    );
};

export default MovieForm;