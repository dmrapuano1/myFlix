//importing dependencies
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom';
//Obtaining scss for file
require('./director-card.scss');

//Creates DirectorCard and exports for use in main-view
export class DirectorCard extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {

    //Pulls director from main-view
    const {director} = this.props;

    //keeps future code from running until promise returns and director is defined
    if (!director) return null;

    //returns view as desired
    return (
      //Col to use bootstraps
      <Col className="col-md-6">
        {/* Card to use react */}
        <Card border="info" style={{width: '16rm'}} className="director-group">
          <Card.Body>
            <Card.Title className="head-text">{director.director.name}</Card.Title>
            <Card.Text>Lived {director.director.dob} to {director.director.date_died}</Card.Text>
            <Card.Text className="head-text">Biography:</Card.Text>
            <Card.Text>{director.director.bio}</Card.Text>
            {/* Returns to prior page */}
            <Link to={`/directors`}>
              <Button variant="secondary">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}


//propTypes to ensure view is returned correctly
DirectorCard.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    dates: PropTypes.string.isRequired
  })
}