//Imports dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//Imports scss
require('./genre-card.scss');

//Exports GenreCard to MainView
export class GenreCard extends React.Component {

  render() {
    //Pulls movie from MainView
    const {movie} = this.props;

    //Waits for promise to return with defined movie before running
    if (!movie) return null;

    //Returns view
    return (
      <Col className="col-md-6">
      <Card border="info" style={{width: '16rm'}} className="genre-group">
        <Card.Body>
          <Card.Title className="head-text">{movie.genre.name}</Card.Title>
          <Card.Text className="sub-text">({movie.title})</Card.Text>
          <Card.Text>{movie.genre.description}</Card.Text>
          {/* Links back to previous view */}
          <Link to={`/client/genres`}>
            <Button variant="primary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>
    );
  }
}

//propTypes to ensure view is returned properly
GenreCard.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    movie: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired
  })
}