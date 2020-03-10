import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

export class DirectorCard extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {
    const {movie, onClick} = this.props;

    if (!movie) return null;

    return (
      <div className="director-group">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{movie.director.title}</span>
        </div>
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{movie.director.bio}</span>
        </div>
        <div className="director-dob">
          <span className="label">Date of Birth </span>
          <span className="value">{movie.director.dob}</span>
        </div>
        <div className="director-death-day">
          <span className="label">Date Died </span>
          <span className="value">{movie.director.date_died}</span>
        </div>
        <Link to={`/directors`}>
          <Button variant="primary">Back</Button>
        </Link>
      </div>

    );
  }
}