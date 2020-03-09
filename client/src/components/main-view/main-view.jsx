import React from 'react';
import axios from 'axios';
import CardColumns from 'react-bootstrap/CardColumns';
import PropTypes from 'prop-types';

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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  onLoggedIn(authData) {
    console.log(authData + ' authData');
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

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