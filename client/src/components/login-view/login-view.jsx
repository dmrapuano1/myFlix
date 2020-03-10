import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

require('./login-view.scss');

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //Sends request to server
    axios.post('http://rapuano-flix.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
    .then(response => {
      const data = response.data
      props.onLoggedIn(data);
    })
    .catch(error => {
      console.log('No user found');
    });
  };

  const handleRegister = (e) => {
    var Username = null;
    props.onRegister(Username);
  }

  return (
    <Form className="form">
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} placeholder="Enter your username" required onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={Password} placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="button" className="log_button" onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="button" className="log_button" onClick={handleRegister}>Register</Button>
    </Form>
    
  );
}

LoginView.propTypes = {
  form: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
  })
}