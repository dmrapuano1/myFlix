import React from 'react';
import { connect } from 'react-redux';
import {Navbar, CardColumns, Button} from 'react-bootstrap'

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

/**
 * @function mapStateToProps
 * @param {*} state 
 * @returns {state} visibilityFilter
 */
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * @function MoviesList
 * @param {*} props 
 * returns different view if no movies are present
 * @returns {tag} <div className="main-view"/>
 * @returns {tag} <div className="movies-list">...</div>
 */
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
    <Navbar bg="light" className="shadow-sm p-4 filter">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Navbar>
    <CardColumns className="main-view-cards">
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
    </CardColumns>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);