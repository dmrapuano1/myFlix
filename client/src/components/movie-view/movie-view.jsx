//Imports dependencies
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//Pulls proper styles
require('./movie-view.scss');

//Exports MovieView to MainView
export class MovieView extends React.Component {

  render() {
    //Defines values pulled from MainView
    const {movie, onClick} = this.props;

    //Doesn't load until future variables are defined by axios promise in MainView
    if (!movie) return null;

    //Returns all details about movie
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
        {/* Sends user to MainView */}
        <Link to={`/client/`}>
          <Button variant="secondary">Home</Button>
        </Link>
        {/* Sets current movie as user favorite */}
        <Button variant="primary" onClick={() => onClick(movie._id)}>Add to favorites</Button>
      </div>

    );
  }
}

//propTypes to ensure proper load
MovieView.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired
  })
}