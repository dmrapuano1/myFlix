//Imports dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//Links to proper scss
// require('./movie-card.scss');

//Exports MovieCard to MainView
export class MovieCard extends React.Component {

  render() {
    //Pulls movie from MainView
    const {movie} = this.props

    //Renders basic movie information
    return (
      <Card border="info" style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          {/* Link to MainView to load more detailed movie information */}
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

//propTypes to ensure code load view properly
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
}