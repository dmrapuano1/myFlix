//Imports dependencies
import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//Exports ProfileView to MainView
export class ProfileView extends React.Component {
  
  //Function to run on submit of form
  handleSubmit(e, user) {
    //Prevents page from reloading (and other form defaults after submit)
    e.preventDefault();
    //Pulls token from local storage
    let token = localStorage.getItem('token');
    //Request to database to change info in database to newly input info
    axios({
      method: 'put',
      url: `https://rapuano-flix.herokuapp.com/users/${user.Username}`,
      headers: {authorization: `Bearer ${token}`},
      data: {
        //Keeping username the same without user input
        Username: user.Username,
        Password: Password.value,
        Email: Email.value,
        Birthday: Birthday.value
    }})
    .then(response => {
      const data = response.data;
      console.log(data);
      //Visual for user
      alert('Information updated successfully');
      //Stalls window reload enough for alert to go off first
      setTimeout(function() {
        window.open('/profile', '_self')
      }, 1);
    })
    //Catch all for errors
    .catch(e => {
      alert('Something went wrong. Account not updated');
    });
  };

  //Handles delete function in form
  handleDelete(e, user) {
    //Safety to ensure user wants to delete account (protects accidental deletes)
    let value = prompt('Are you sure? This can not be undone. Type \'yes\' to finalize delete');
    //Prevents errors if cancelled without value
    if (value !== null && value !== undefined) {
      //Sets user input to all lower case to match easier (ie yes, YES, yEs all become 'yes')
      value = value.toLowerCase();
    }
    if (value === 'yes') {
      let token = localStorage.getItem('token');
      //If user input 'yes', requests database to delete user that is logged in
      axios.delete(`https://rapuano-flix.herokuapp.com/users/${user.Username}`, {
        headers: {Authorization: `Bearer ${token}`}
      })        
      .then(response => {
        const data = response.data;
        //Visual for user
        alert('Deleted successfully, sending to login page.')
        //Quick logout function
        localStorage.clear();
        //Loads MainView which due to logout will load LoginView
        window.open('/', '_self');
      })
      .catch(e => {
        alert('Something went wrong. Account not deleted');
      });
    }
  }

  render() {

    //Defines all variables used in render plus all variables obtained from MainView
    const {user, Password, setPassword, Email, setEmail, Birthday, setBirthday, favorites, Username} = this.props

    //Prevents error before axios promise returns from MainView
    if(!user) return null

    return (

      <div>
        <Row>
          {/* Current user information display */}
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
                {favorites}
                {/* Links to display of all users movies */}
                <Link to={`/user/movies`}>
                  <Button variant="info">Edit Favorites</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          {/* Edit user form */}
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

              {/* Return to MainView link */}
              <Link to={`/`}>
                  <Button variant="secondary">Home</Button>
              </Link>
              {/* Submit form button. Written so enter key will submit as well */}
              <Button variant="primary" type="submit">Update</Button>
              {/* Button to call delete function */}
              <Button variant="danger" onClick= {() => this.handleDelete(event, user)}>Delete Account</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  };
}

ProfileView.propTypes = {
  card: PropTypes.shape({
    UsernameTitle: PropTypes.string,
    UsernameValue: PropTypes.object,
    EmailTitle: PropTypes.string,
    EmailValue: PropTypes.object,
    BirthdayTitle: PropTypes.string,
    BirthdayValue: PropTypes.object,
    FavoritesValue: PropTypes.shape({
      movie: PropTypes.string
    }),
  }),
}