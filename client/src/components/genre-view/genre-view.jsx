import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

require('./genre-view.scss');

export class GenreView extends React.Component {

  render() {
    const {genre} = this.props;

    return (
      <Col className="col-md-3 director-card">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title>{genre.genre.name}</Card.Title>
          <Link to={`/genres/`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}