import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';

import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

require('./main-view.scss');

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: true,
    };
  };

  componentDidMount() {
    axios.get('https://rapuano-flix.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(newUser) {
    this.setState({
      newUser
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const {movies, selectedMovie, user, newUser} = this.state;

    if(!newUser) return <RegisterView  onRegister={newUser => this.onRegister(newUser)}/>

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={newUser => this.onRegister(newUser)}/>
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <CardColumns>
      { selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() => this.onBackClick()}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
     </CardColumns>
    );
  }
}