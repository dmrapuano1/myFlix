import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'

import {Link} from 'react-router-dom';

require('./director-card.scss');

export class DirectorCard extends React.Component {
  constructor() {
    super();

    this.state = {};
  };

  render() {
    const {director} = this.props;

    if (!director) return null;

    return (
      <Col className="col-md-6">
      <Card border="info" style={{width: '16rm'}} className="director-group">
        <Card.Body>
          <Card.Title className="head-text">{director.director.name}</Card.Title>
          <Card.Text>Lived {director.director.dob} to {director.director.date_died}</Card.Text>
          <Card.Text className="head-text">Biography:</Card.Text>
          <Card.Text>{director.director.bio}</Card.Text>
          <Link to={`/directors`}>
            <Button variant="secondary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>
    );
  }
}