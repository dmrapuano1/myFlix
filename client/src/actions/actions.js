//Exports all actions
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_FAVORITES = 'SET_FAVORITES';


export function setMovies(value) {
  //returns type for reducer to user and value for app to use
  return {type: SET_MOVIES, value};
}

export function setDirectors(value) {
  return {type: SET_DIRECTORS, value};
}

export function setUserData(value) {
  return {type: SET_USER_DATA, value};
}

export function setFavorites(value) {
  return {type: SET_FAVORITES, value};
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}