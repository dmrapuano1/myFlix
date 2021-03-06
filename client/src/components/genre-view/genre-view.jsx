//Imports dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//Imports scss
// require('./genre-view.scss');

//Exports GenreView to MainView
export class GenreView extends React.Component {

  render() {
    //Pulls movie from MainView
    const {movie} = this.props;

    //Returns view
    return (
      <Col className="col-md-3 director-card">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="head-text">{movie.genre.name}</Card.Title>
          <Card.Text className="sub-text">({movie.title})</Card.Text>
          {/* Links to origin movie */}
          <Link to={`/client/movies/${movie._id}`}>
            <Button variant="secondary">See Movie</Button>
          </Link>
          {/* Pulls Genre details to view */}
          <Link to={`/client/genre/${movie.genre.name}`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}

//propTypes to ensure view is rendered properly
GenreView.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    movie: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired
  })
}