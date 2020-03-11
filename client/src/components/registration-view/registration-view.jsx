import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

require('./registration-view.scss');

export function RegisterView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://rapuano-flix.herokuapp.com/accounts', {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    })
    .then(response => {
      console.log(response);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
    props.onRegister(Username);
  };

  const handleBack = (e) => {
    e.preventDefault();
    let currentUser = true
    props.onRegister(currentUser)
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} placeholder="Enter alpha-numeric username" autoFocus={true} required onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={Password} placeholder="Enter desired password" required onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="Email">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control type="email" value={Email} placeholder="Enter your e-mail" required onChange={e => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="Birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" max={Date()} value={Birthday} placeholder="Enter as YYYY-MM-DD. Optional" onChange={e => setBirthday(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" className="reg_button">Register Now!</Button>
      <Button variant="secondary" type="button" className="reg_button" onClick={handleBack}>Existing user</Button>
    </Form>
  );
}

RegisterView.propTypes = {
  form: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.instanceOf(Date)
  })
}