import { ADD_MOVIE, DEL_MOVIE, TOGGLE_FAV, TOGGLE_EDIT, EDIT_MOVIE, ADD_FAV, DEL_FAV } from "../constants/action-types";

export function addMovie(payload) {
  return { 
		type: ADD_MOVIE, 
		payload 
	};
}

export function delMovie(payload) {
	return {
		type: DEL_MOVIE,
		payload
	}
}

export function toggleEdit(payload) {
	return {
		type: TOGGLE_EDIT,
		payload
	}
}

export function editMovie(payload) {
	return {
		type: EDIT_MOVIE,
		payload
	}
}

export function toggleFav(payload) {
  return { 
		type: TOGGLE_FAV, 
		payload
	};
}

export function addFav(payload) {
	return {
		type: ADD_FAV,
		payload
	}
}

export function delFav(payload) {
	return {
		type: DEL_FAV,
		payload
	}
}