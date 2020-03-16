//Imports dependencies
import { combineReducers } from 'redux';
//Imports required actions
import { SET_FILTER, SET_MOVIES, SET_DIRECTORS, SET_USER_DATA, SET_FAVORITES } from '../actions/actions';

//Function called in main-view
function visibilityFilter(state = '', action) {
  //Switch where if action is true, switch is true
  switch (action.type) {
    case SET_FILTER:
      //When function is ran, returns just the value (removes the SET_FILTER portion)
      return action.value;
    default:
      //If the type is incorrect, returns value as entered
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}

function userData(state = [], action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.value;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  directors,
  userData,
  favorites
});

export default moviesApp;