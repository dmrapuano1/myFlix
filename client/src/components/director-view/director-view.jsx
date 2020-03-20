//Imports dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//Imports scss
require('./director-view.scss');

//creates DirectorView and exports to MainView
export class DirectorView extends React.Component {

  render() {
    //Pulls director from MainView
    const {director} = this.props;

    //returns view
    return (
      <Col className="col-md-3 director-card">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="h1">{director.director.name}</Card.Title>
          <Link to={`/client/director/${director.director.name}`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}

//propTypes to ensure proper view is returned 
DirectorView.propTypes = {
  Card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    button: PropTypes.object.isRequired
  })
}