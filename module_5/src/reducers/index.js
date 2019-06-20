import { ADD_MOVIE, DEL_MOVIE, TOGGLE_FAV, ADD_FAV, DEL_FAV, EDIT_MOVIE, TOGGLE_EDIT } from "../constants/action-types";

const initialState = {
  movies: [],
  favmovies: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_MOVIE) {
    return Object.assign({}, state, {
      movies: state.movies.concat(action.payload)
    });
  }
  if(action.type === DEL_MOVIE) {
    let auxmovies = [...state.movies];
    auxmovies.splice(action.payload, 1);
    return {
      movies: auxmovies,
      favmovies: state.favmovies
    }
  }
  if(action.type === TOGGLE_EDIT) {
    let auxmovies = [...state.movies];
    auxmovies = auxmovies.map(auxmovie => (auxmovie.id === action.payload) ? {
      ...auxmovie,
      editable: !auxmovie.editable
    }
    : auxmovie)
    return  {
      movies: auxmovies,
      favmovies: state.favmovies
    }
  }
  if(action.type === EDIT_MOVIE) {
    let edmoviedata = action.payload;
    let auxmovies = [...state.movies];
    auxmovies = auxmovies.map(auxmovie => (auxmovie.id === edmoviedata.id) ? {
      ...auxmovie,
      name: edmoviedata.name,
      year: edmoviedata.year,
      duration: edmoviedata.duration,
      editable: false
    }
    : auxmovie)
    return {
      movies: auxmovies,
      favmovies: state.favmovies
    }
  }
  if(action.type === TOGGLE_FAV) {
    let auxmovies = [...state.movies];
    auxmovies = auxmovies.map(auxmovie => (auxmovie.id === action.payload) ? {
      ...auxmovie,
      isfavorite: !auxmovie.isfavorite
    }
    : auxmovie)
    return  {
      movies: auxmovies,
      favmovies: state.favmovies
    }
  }
  if(action.type === ADD_FAV) {
    return Object.assign({}, state, {
      favmovies: state.favmovies.concat(action.payload)
    });
  }
  if(action.type === DEL_FAV) {
    let auxfavmovies = [...state.favmovies];
    auxfavmovies.splice(action.payload, 1);
    return {
      movies: state.movies,
      favmovies: auxfavmovies
    }
  }
  return state;
}
export default rootReducer;