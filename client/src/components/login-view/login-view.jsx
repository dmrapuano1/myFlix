import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

require('./login-view.scss');

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    //Authentication logic here later
    props.onLoggedIn(Username);
  };

  const handleRegister = (e) => {
    props.onRegister(Username);
  }

  return (
    <Form className="form">
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={Password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="button" className="log_button" onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" type="button" className="log_button" onClick={handleRegister}>Register</Button>
    </Form>
  );

}