import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGenreThunk, updateGenreThunk } from '../../store/slices/genres.slice';

const GenreItem = ({ genre }) => {

    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ genreUpdated, setGenreUpdated ] = useState(genre.name);
    
    const dispatch = useDispatch();

    const update = () => {
        dispatch(updateGenreThunk(genre.id, genreUpdated));
        setIsUpdating(false);
    }

    return (
        <li key={genre.id} className="genres-item">
      {isUpdating ? (
        <input
          className="form-control-soft"
          value={genreUpdated}
          onChange={e => setGenreUpdated(e.target.value)}
        />
      ) : (
        <div
          className="genre-name"
          onClick={() => setIsUpdating(true)}
        >
          {genreUpdated}
        </div>
      )}

      {isUpdating && (
        <button
          className="btn btn-warning custom-button-sm ms-2"
          onClick={update}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      )}
      <button
        className="btn btn-danger custom-button-sm ms-2"
        onClick={() => dispatch(deleteGenreThunk(genre.id))}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </li>
    );
};

export default GenreItem;
