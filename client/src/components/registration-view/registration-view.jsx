import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

require('./registration-view.scss');

export function RegisterView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    //Database logic here later
    props.onRegister(Username);
  };

  const handleBack = (e) => {
    e.preventDefault();
    let currentUser = true
    props.onRegister(currentUser)
  }

  return (
    <Form className="form">
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} placeholder="Enter alpha-numeric username" required onChange={e => setUsername(e.target.value)}/>
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
      
      <Button variant="primary" type="button" className="reg_button" onClick={handleSubmit}>Register Now!</Button>
      <Button variant="secondary" type="button" className="reg_button" onClick={handleBack}>Existing user</Button>
    </Form>
  );

}