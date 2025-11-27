import { useMemo } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActorCard from '../components/Actors/ActorCard';
import ButtonsEditDelete from '../components/ButtonsEditDelete';
import DirectorCard from '../components/Directors/DirectorCard';
import { deleteMovieThunk } from '../store/slices/movies.slice';

const MovieDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movies = useSelector(state => state.movies);
    const movie = useMemo(() => {
        return movies.find(m => m.id === +id)
    }, [movies]);

    if (!movie) return <></>

    const deleteMovie = () => {
        dispatch(deleteMovieThunk(movie.id))
        navigate("/")
    }

    return (
        <>
      <Row className="mb-4">
        {/* Imagen de la película */}
        <Col sm={3} md={4} xl={3}>
          {movie.image ? (
            <img src={movie.image} alt={movie.name} className="img-fluid form-card" />
          ) : (
            <div className="empty-image">Sin imagen</div>
          )}
        </Col>

        {/* Detalles de la película */}
        <Col>
          <h1 className="movie-name-input">{movie.name}</h1>

          {/* Lista de géneros */}
          <ListGroup horizontal className="genres-list mb-3">
            {movie.genres?.map(genre => (
              <ListGroup.Item key={genre.id} className="genres-item">
                <span className="genre-name">{genre.name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <p className="mt-3">
            <b>Release year:</b> {movie.release_year}
          </p>
          <p>{movie.synopsis}</p>

          {/* Directores */}
          <h3 className="section-title mt-4">Directors</h3>
          <Row xs={1} sm={2} xl={3} className="g-4">
            {movie.directors?.map(director => (
              <DirectorCard director={director} key={director.id} showOptions={false} />
            ))}
          </Row>

          {/* Actores */}
          <h3 className="section-title mt-5">Actors</h3>
          <Row xs={1} sm={2} xl={3} className="g-4">
            {movie.actors?.map(actor => (
              <ActorCard actor={actor} key={actor.id} showOptions={false} />
            ))}
          </Row>
        </Col>
      </Row>

      {/* Botones de acción flotantes */}
      <div className="options-movie-buttons">
        <ButtonsEditDelete
          size="lg"
          rounded
          onDelete={deleteMovie}
          onUpdate={() => navigate(`/movies/update/${movie.id}`)}
        />
      </div>
    </>
    );
};

export default MovieDetail;