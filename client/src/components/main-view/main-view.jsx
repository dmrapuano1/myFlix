//Imports dependencies 
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Navbar, Button, Row, Card, CardColumns} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
//Imports all views that are referenced in code
import {LoginView} from '../login-view/login-view';
import {RegisterView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {DirectorCard} from '../director-card/director-card';
import {GenreView} from '../genre-view/genre-view';
import {GenreCard} from '../genre-card/genre-card';
import {ProfileView} from '../profile-view/profile-view';
import {FavoriteMovies} from '../favorite-movies/favorite-movies';
//Imports React-redux code from index.jsx
import { connect } from 'react-redux';

//Pulls scss
require('./main-view.scss');

//Exports MainView to all other views
export class MainView extends React.Component {

  constructor() {
    super();

    //sets the state of all read only variables
    this.state = {
      movies: [],
      directors: [],
      favorites: [],
      userData: [],
      selectedMovie: null,
      user: null,
      newUser: true,
    };
  };

  //Gets all movies from database
  getMovies(token) {
    axios.get("https://rapuano-flix.herokuapp.com/movies", {
      //Sends token to authorize
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Changes state so in future can pull movies and only after they have rendered
      this.setState({
        movies: response.data
      });
    })
    //Catch all for errors
    .catch(error => {
      console.log(error);
    });
  }

  //Gets all directors from database
  getDirectors(token) {
    axios.get("https://rapuano-flix.herokuapp.com/directors", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        directors: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Gets active (logged in) user and their data
  getUser(token) {
    let user = localStorage.getItem('user');
    axios.get(`https://rapuano-flix.herokuapp.com/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        userData: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Pulls the favorite movies of logged in user
  getFavorites(token) {
    let user = localStorage.getItem('user');
    axios.get(`https://rapuano-flix.herokuapp.com/users/${user}/movies`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data)
      this.setState({
        favorites: response.data.FavoriteMovies
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  //Adds selected movie to user's favorites
  handleAdd(movieID) {
    //Defines user and token from localStorage so they don't have to be in function call
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    //requests POST of new movie to favorites
    axios({
      method: 'post',
      url: `https://rapuano-flix.herokuapp.com/users/${user}/movies/${movieID}`,
      headers: {authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        favorites: response.data
      });
      //Visual for user
      alert('Added movie to favorites list!');
    })
    .catch(error => {
      console.log(error);
      alert('Something went wrong. Movie not added.');
    });
  }

  //requests delete of movie from favorites
  handleDelete(movieID) {
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')

    axios.delete(`https://rapuano-flix.herokuapp.com/users/${user}/movies/${movieID}`, {
      headers: {authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        favorites: response.data
      });
      alert('Movie removed from list.')
      //stalls refresh of window so alert will go off first
      setTimeout(() => 
        //Re-opens window to ensure deleted movie is removed from view as well
        {window.open('/user/movies', '_self');
      }, 1);
    })
    .catch(error => {
      console.log(error);
      alert('Something went wrong. Movie not deleted.');
    });
  }

  //Loads page properly on page load
  componentDidMount() {
    //Checks for token
    let accessToken = localStorage.getItem('token');
    //If there is a token, sets token to value
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      //then runs the proper functions to load MainView
      this.getMovies(accessToken);
      this.getDirectors(accessToken);
      this.getUser(accessToken);
    }
  }

  //Logs user out
  onLogout() {
    //Removes all local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //Opens login view afterwords
    window.open('/', '_self');
  }

  //sets values to user when logged in
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    //Runs everything to load MainView properly
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getDirectors(authData.token);
    this.getUser(authData.token);
  }

  //Changes view from register to login after user registers successfully
  onRegister(newUser) {
    this.setState({
      newUser
    });
  }

  //Pulls movieID from user favorites and finds/assigns movie data from database
  movieIDtoName(userData, movies) {
    if (userData[0]){
    let favMovies = [];
    let i, value, movie;
    //loops through movie IDs
    for (i=0; i< userData[0].FavoriteMovies.length; i++) {
      value = userData[0].FavoriteMovies[i];
      //defines movie when match is found
      movie = movies.find( m => m._id === value)
      //When match is found, pushes into favMovies array
      if (movie){
        //Skips any duplicated favorites in database
        if(favMovies.indexOf(movie.title) === -1){
          //Actual act of pushing non-duplicated item into array
          favMovies.push(movie.title)
          }
      }
    }
    //Maps array into div elements to have better visual on render
    let favElement = favMovies.map( m => <Card.Text key={m}>{m}</Card.Text>)
    return favElement
    }
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    const {movies, user, newUser, directors, userData, onClick, target} = this.state;

    //Defines favMovies as editable variable
    let favMovies;

    //Loads RegisterView if user clicks register button
    if(!newUser) return <RegisterView  onRegister={newUser => this.onRegister(newUser)}/>
    //Loads LoginView if no local storage data
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={newUser => this.onRegister(newUser)}/>
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;
    //Defines favMovies after everything loads for ProfileView to render properly
    if (userData) {
      favMovies = this.movieIDtoName(userData, movies);
    }
    //Ensures proper screen is loaded and no errors if favMovies is not defined
    if (!favMovies) return <div className="main-view"/>;

    return (
      //Allows for URL routing and persistent views
      <Router>
        {/* Navbar view */}
        <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
          {/* Gives a button to click no matter the size outside of sandwich menu */}
          <Navbar.Brand href="http://localhost:1234/profile" className="navbar-brand">{user}'s flix!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Start of sandwich menu */}
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            {/* Navigation for all major sections of app */}
            <Button href="http://localhost:1234/" variant="light mr-1" size="lg" className="home-button">Home</Button>
            <Button href="http://localhost:1234/directors" variant="light mr-1" size="lg" className="profile-button">Directors</Button>
            <Button href="http://localhost:1234/genres" variant="light mr-1" size="lg" className="profile-button">Genres</Button>
            <Button href="http://localhost:1234/profile" variant="light mr-1" size="lg" className="profile-button">Profile</Button>
          <Button variant="primary ml-1" size="lg" className="logout-button" onClick={() => this.onLogout()}>Log out</Button>
          </Navbar.Collapse>
        </Navbar>
        {/* Route to MainView */}
        <Router>
          <div className="main-view">
            <Switch>
            <Route exact path="/" render={() => 
              // Makes three columns for cards
              <CardColumns className="main-view-cards">
                {/* Takes each movies and puts them in a new card as defined in MovieCard */}
                { movies.map( m => <MovieCard key={m._id} movie={m}/>)}
              </CardColumns>}/>
              {/* Route to target movie */}
            <Route path="/movies/:movieID" render={ ({match}) =>
              <CardColumns>
                {/* Finds targeted movie in movies array and sends info to MovieView */}
                <MovieView movie={movies.find( m => m._id === match.params.movieID)} onClick={(movieID) => this.handleAdd(movieID)}/>
              </CardColumns>
            }/>
            {/* Route to show all directors */}
            <Route path="/directors" render={() => 
              // mx-auto centers Rows (CardColumns for bootstrap Row/Col)
              <Row className="mx-auto">
                {/* Maps directors like movies above */}
                {directors.map( d => <DirectorView key={d._id} director={d}/>)}
              </Row>}/>
            {/* Route to show specific director */}
            <Route path="/director/:director" render={ ({match}) => 
              <DirectorCard director={movies.find( m => m.director.name === match.params.director)}/>
            }/>
            {/* Route to show all genres */}
            <Route path="/genres" render={() => 
              <Row className="mx-auto">
                { movies.map( m => <GenreView key={m._id} movie={m}/>)}
              </Row>}/>
            {/* Route to show specific genre */}
            <Route path="/genre/:genre" render={ ({match}) =>
              <GenreCard movie={movies.find( m => m.genre.name === match.params.genre)}/>
            }/>
            {/* Route to show users profile */}
            <Route path="/profile" render={() => 
              <ProfileView user={userData[0]} favorites={favMovies} onRegister={newUser => this.onRegister(newUser)}/>
            }/>
            {/* Route to show users favorite movies */}
            <Route path="/user/movies" render={() => 
              <Row className="mx-auto">
                {favMovies.map (m => <FavoriteMovies key={m.key} onClick={(target) => this.handleDelete(target)} movie={m.key} movieList={movies}/>)}
              </Row>
            }/>
            <Route render={()=> <div className="fourZeroFour">404 Error: Page not found</div>}/>
            </Switch>
          </div>
        </Router>
      </Router>
    );
  }
}

//propTypes to ensure main features render correctly
MainView.propTypes = {
  MovieView: PropTypes.shape({
    movie: PropTypes.shape({
      imagePath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.object.isRequired,
      director: PropTypes.object.isRequired
    })
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