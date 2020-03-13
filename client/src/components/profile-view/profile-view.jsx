import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: '',
      Password: '',
      setPassword: '',
      Email: '',
      setEmail: '',
      Birthday: '',
      setBirthday: '',
    }

  }
  
  handleSubmit(e, user) {
    e.preventDefault();
    let token = localStorage.getItem('token');
    axios({
      method: 'put',
      url: `https://rapuano-flix.herokuapp.com/users/${user.Username}`,
      headers: {authorization: `Bearer ${token}`},
      data: {
      Username: user.Username,
      Password: Password.value,
      Email: Email.value,
      Birthday: Birthday.value
    }})
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/profile', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('Error updating the user');
      alert('Something went wrong. Account not updated');
    });
  };

  handleDelete(e, user) {
    let value = prompt('Are you sure? This can not be undone. Type \'yes\' to finalize delete');
    if (value !== null && value !== undefined) {
      value = value.toLowerCase();
    }
    if (value === 'yes') {
      let token = localStorage.getItem('token');
      
      axios.delete(`https://rapuano-flix.herokuapp.com/users/${user.Username}`, {
        headers: {Authorization: `Bearer ${token}`}
      })        
      .then(response => {
        const data = response.data;
        alert('Deleted successfully, sending to login page.')
        localStorage.clear();
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('Error deleting the user');
        alert('Something went wrong. Account not deleted');
      });
    }
  }

  render() {

    const {user, Password, setPassword, Email, setEmail, Birthday, setBirthday, favorites, Username} = this.props

    if(!user) return null
    console.log(favorites)

    return (

      <div>
        <Row>
          <Col className="col-md-6">
            <Card border="info" style={{ width: '16rem' }}>
              <Card.Body>
                <Card.Title>Current Info:</Card.Title>
                <Card.Text className="head-text">Username:</Card.Text>
                <Card.Text>{user.Username}</Card.Text>
                <Card.Text className="head-text">Email:</Card.Text>
                <Card.Text>{user.Email}</Card.Text>
                <Card.Text className="head-text">Birthday:</Card.Text>
                <Card.Text>{user.Birthday}</Card.Text>
                <Card.Text className="head-text">Favorite Movies:</Card.Text>
                <Card.Text>{favorites}</Card.Text>
                <Link to={`/user/movies`}>
                  <Button variant="info">Edit Favorites</Button>
                </Link>
                
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-md-6">
            <Form className="form" onSubmit={e => this.handleSubmit(event, user)}>          
              <Form.Group controlId="Password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={Password} placeholder="Enter desired password" required/>
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control type="email" value={Email} placeholder="Enter your e-mail" required/>
              </Form.Group>

              <Form.Group controlId="Birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" max={Date()} value={Birthday} placeholder="Enter as YYYY-MM-DD. Optional"/>
              </Form.Group>

              <Link to={`/`}>
                  <Button variant="secondary">Home</Button>
              </Link>
              <Button variant="primary" type="submit">Update</Button>
              <Button variant="danger" onClick= {() => this.handleDelete(event, user)}>Delete Account</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  };
}
// RegisterView.propTypes = {
//   form: PropTypes.shape({
//     Username: PropTypes.string,
//     Password: PropTypes.string,
//     Email: PropTypes.string,
//     Birthday: PropTypes.instanceOf(Date)
//   })
// }