import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

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
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.director.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Biography: </span>
          <span className="value">{movie.director.bio}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Years of life </span>
          <span className="value">`{movie.director.dob} - {movie.director.date_died}`</span>
        </div>
        <Link to={`/`}>
          <Button variant="primary">Back</Button>
        </Link>
      </div>

    );
  }
}