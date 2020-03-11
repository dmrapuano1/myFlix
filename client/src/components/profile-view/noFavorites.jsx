import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom';

require('./profile-view.scss');

export class NoFavorites extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {
    const {movie, onClick} = this.props;

    if (!movie) return null

    return (
      <Card border="info" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title>No favorites yet!</Card.Title>
          <Card.Text>See movies to find new favorites to add! They will appear here.</Card.Text>
          <Link to={`/`}>
            <Button variant="info">Go to movies</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

NoFavorites.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
}