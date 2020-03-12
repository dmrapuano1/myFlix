import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

export class FavoriteMovies extends React.Component {

  render() {
    const {movie, movieList, onClick} = this.props;

    let targetMovie = movieList.find(target => target.title === movie)

    return (
      <Col className="col-md-3">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="h1">{movie}</Card.Title>
          <Button variant="danger" onClick={() => onClick(targetMovie._id)}>Delete</Button>
           
        </Card.Body>
      </Card>
      </Col>

    );
  }
}

FavoriteMovies.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    // button: PropTypes.object.isRequired
  })
}