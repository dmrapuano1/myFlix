import React from 'react';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from 'react-router-dom';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../registration-view/registration-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {DirectorCard} from '../director-view/director-card';

require('./main-view.scss');

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      directors: [],
      genres: [],
      selectedMovie: null,
      user: null,
      newUser: true,
    };
  };

  getMovies(token) {
    axios.get("https://rapuano-flix.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getDirectors(token) {
    axios.get("https://rapuano-flix.herokuapp.com/directors", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        directors: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getGenres(token) {
    axios.get("https://rapuano-flix.herokuapp.com/genres", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        genres: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }

  onRegister(newUser) {
    this.setState({
      newUser
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const {movies, user, newUser, directors, genres} = this.state;

    if(!newUser) return <RegisterView  onRegister={newUser => this.onRegister(newUser)}/>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={newUser => this.onRegister(newUser)}/>
    
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
          <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Button href="http://localhost:1234/directors" variant="light mr-1" size="lg" className="profile-button">Directors</Button>
            <Button href="http://localhost:1234/genres" variant="light mr-1" size="lg" className="profile-button">Genres</Button>
            <Button href="http://localhost:1234/profile" variant="light mr-1" size="lg" className="profile-button">Profile</Button>
          <Button variant="primary ml-1" size="lg" className="logout-button" onClick={() => this.onLogout()}>Log out</Button>
          </Navbar.Collapse>
        </Navbar>
        <Router>
          <div className="main-view">
            <Route exact path="/" render={() => 
              <CardColumns className="main-view-cards">
                { movies.map( m => <MovieCard key={m._id} movie={m}/>)}
              </CardColumns>}/>
            <Route path="/movies/:movieID" render={ ({match}) =>
              <CardColumns>
                <MovieView movie={movies.find( m => m._id === match.params.movieID)}/>
              </CardColumns>}/>
            <Route path="/directors" render={() => 
              <Row className="mx-auto">
                {directors.map( d => <DirectorView key={d._id} director={d}/>)}
              </Row>}/>
            <Route path="/directors/:director" render={ ({match}) =>
              <CardColumns>
                <DirectorCard movie={movies.find( m => m.director.name === match.params.director)}/>
              </CardColumns>}/>
            <Route path="/genres" render={() => 
              <Row className="mx-auto">
                { genres.map( m => <GenreView key={m._id} genre={m}/>)}
              </Row>}/>
            
          </div>
        </Router>
      </Router>
    );
  }
}

MainView.propTypes = {
  MovieView: PropTypes.shape({
    movie: PropTypes.shape({
      imagePath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.object.isRequired,
      director: PropTypes.object.isRequired
    }).isRequired,
  }),
  MovieCard: PropTypes.shape({
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  })
}