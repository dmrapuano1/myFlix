import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

require('./movie-view.scss');

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {
    const {movie, onClick} = this.props;

    if (!movie) return null;

    return (
      <div className="movie-group">
        <div className="movie-picture">
          <img className="movie-poster" src={movie.imagePath}/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.genre.name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.director.name}</span>
        </div>
        <Link to={`/`}>
          <Button variant="primary">Back</Button>
        </Link>
      </div>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired
  }).isRequired,
}