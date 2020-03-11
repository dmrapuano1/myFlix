import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'

import {Link} from 'react-router-dom';

require('./genre-card.scss');

export class GenreCard extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {
    const {movie} = this.props;

    if (!movie) return null;

    return (
      <Col className="col-md-6">
      <Card border="info" style={{width: '16rm'}} className="genre-group">
        <Card.Body>
          <Card.Title className="head-text">{movie.genre.name}</Card.Title>
          <Card.Text className="sub-text">({movie.title})</Card.Text>
          <Card.Text>{movie.genre.description}</Card.Text>
          <Link to={`/genres`}>
            <Button variant="primary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>
    );
  }
}