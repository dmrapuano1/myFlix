//Imports dependencies
import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

//Pulls proper scss file
require('./registration-view.scss');

//Exports RegisterView to MainView -as function-
export function RegisterView(props) {

  //Defines variables similar to setState in other views
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  /**
   * Runs after form submits 
   * @function handleSubmit
   * @param e event
   * returns false if sign in fails
   * @returns {boolean} false
   * @returns {action} axios request
  */
  const handleSubmit = (e) => {
    //Prevents default form patterns (most importantly page refresh)
    e.preventDefault();
    //Checks password and confirmPassword are the same
    if (Password !== ConfirmPassword) {
      alert ('Passwords do not match.')
      return false
    }
    //Requests post of new user to database
    axios.post('https://rapuano-flix.herokuapp.com/accounts', {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    })
    //If successful, sends data to console
    .then(response => {
      console.log(response);
      alert('User registered. Please log in.');
      if (response.data) {
        props.onRegister(Username);
      };
    })
    //Catch all for errors
    .catch(e => {
      console.log('error registering the user')
      alert('User not registered. Please check the form and try again.')
      return false
    });
  };

  /**
   * Function to load LoginView if user hits back button
   * @function handleBack
   * @param e event
   * @returns {function} onRegister(currentUser)
  */
  const handleBack = (e) => {
    e.preventDefault();
    //Logic on MainView to show LoginView or RegisterView
    let currentUser = true
    props.onRegister(currentUser)
  }

  //Actual rendered view
  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        {/* Auto focuses for user ease */}
        {/* Required to not allow submit without proper information in form */}
        <Form.Control type="text" value={Username} placeholder="Enter alpha-numeric username" autoFocus={true} required onChange={e => setUsername(e.target.value)}/>
      </Form.Group>
      
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={Password} placeholder="Enter desired password" required onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      
      <Form.Group controlId="ConfirmPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control type="password" value={ConfirmPassword} placeholder="Reenter your password" required onChange={e => setConfirmPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="Email">
        <Form.Label>E-mail:</Form.Label>
        {/* Type email to require correct format */}
        <Form.Control type="email" value={Email} placeholder="Enter your e-mail" required onChange={e => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="Birthday">
        <Form.Label>Birthday:</Form.Label>
        {/* Type date to show calender with max=todays date, displaying that as default on opening of calender */}
        <Form.Control type="date" max={Date()} value={Birthday} placeholder="Enter as MM-DD-YYYY. Optional" onChange={e => setBirthday(e.target.value)}/>
      </Form.Group>
      {/* Submits form and runs handleSubmit, written so enter key does so as well */}
      <Button variant="primary" type="submit" className="reg_button">Register Now!</Button>
      <Button variant="secondary" type="button" className="reg_button" onClick={handleBack}>Existing user</Button>
    </Form>
  );
}

//propTypes to ensure proper page render
RegisterView.propTypes = {
  form: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.instanceOf(Date)
  })
}