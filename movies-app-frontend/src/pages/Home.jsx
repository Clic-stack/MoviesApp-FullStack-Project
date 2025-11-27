import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/Movies/MovieCard';
import UniversalPagination from '../components/UniversalPagination';

const Home = () => {

    const { movies, genres } = useSelector(state => state);
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    useEffect(() => setMoviesFiltered(movies), [movies]);

    const filterMovies = (itemId, itemFilter) => {
        const filtered = movies.filter(movie =>
            movie[itemFilter].some(item => item.id === itemId)
        )
        setMoviesFiltered(filtered);
    }

    const navigate = useNavigate();

    return (
        <Row>
      {/* Columna izquierda: filtros */}
      <Col md={3} xl={2} className="p-3 form-card">
        <h3 className="section-title mb-3">Filter by genre</h3>
        <ul className="genres-list">
          {genres.map(genre => (
            <li
              key={genre.id}
              className="filter-option"
              onClick={() => filterMovies(genre.id, 'genres')}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </Col>

      {/* Columna derecha: listado de películas */}
      <Col>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h1 className="section-title">Movies</h1>
          <Button
            onClick={() => navigate('/movies/add')}
            className="btn btn-success custom-button"
          >
            Add movie
          </Button>
        </div>

        {/* Aquí sustituimos el Row + map por UniversalPagination */}
        <UniversalPagination
          items={moviesFiltered}
          itemsPerPage={8}
          renderItem={(movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              selectMovie={filterMovies}
            />
          )}
        />
      </Col>
    </Row>
    );
};

export default Home;