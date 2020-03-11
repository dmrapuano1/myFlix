import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

require('./genre-view.scss');

export class GenreView extends React.Component {

  render() {
    const {movie} = this.props;

    return (
      <Col className="col-md-3 director-card">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="head-text">{movie.genre.name}</Card.Title>
          <Card.Text className="sub-text">({movie.title})</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="secondary">See Movie</Button>
          </Link>
          <Link to={`/genre/${movie.genre.name}`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}