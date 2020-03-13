//Import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
//Imports scss
require('./favorite-movies.scss');

//Exports FavoriteMovies from MainView
export class FavoriteMovies extends React.Component {

  render() {
    //Defines variables for view
    const {movie, movieList, onClick} = this.props;
    //Defines movie ID for delete function
    let targetMovie = movieList.find(target => target.title === movie.key)

    //Returns view
    return (
      <Col className="col-md-4 favCard">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="h1">{movie}</Card.Title>
          {/* event handler for delete */}
          <Button variant="danger" onClick={() => onClick(targetMovie._id)}>Delete</Button>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}

//propTypes to ensure view is returned properly
FavoriteMovies.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired
  })
}