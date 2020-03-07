import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

require('./movie-card.scss');

export class MovieCard extends React.Component {

  render() {
    const {movie, onClick} = this.props

    return (
      <Card border="info" style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="info">Details</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}