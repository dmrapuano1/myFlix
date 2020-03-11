import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {Link} from 'react-router-dom';

require('./director-view.scss');

export class DirectorView extends React.Component {

  render() {
    const {director} = this.props;

    return (
      <Col className="col-md-3 director-card">
      <Card bg="light" style={{ width: '16rem' }}>
        <Card.Body>
          <Card.Title className="h1">{director.director.name}</Card.Title>
          <Link to={`/director/${director.director.name}`}>
            <Button variant="info">Details</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col>

    );
  }
}