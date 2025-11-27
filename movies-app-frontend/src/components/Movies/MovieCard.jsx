import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, selectMovie }) => {

    const { name, image, release_year } = movie;

    const isLong = movie.synopsis.length > 120;

    const synopsis = !isLong ? movie.synopsis : movie.synopsis.slice(0, 120)+"..."

    const navigate = useNavigate();

    return (
        <Col>
      <Card
        className="movie-card h-100"
        onClick={() => navigate(`/movies/${movie.id}`)}
      >
        {/* Imagen */}
        <Card.Img
          variant="top"
          src={image}
          className="movie-card-img"
        />

        {/* Contenido */}
        <Card.Body className="movie-card-body">
          <Card.Title className="movie-card-title">
            {name} ({release_year})
          </Card.Title>
          <Card.Text className="movie-card-text">
            {synopsis}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    );
};

export default MovieCard;