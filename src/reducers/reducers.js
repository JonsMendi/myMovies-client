import { combineReducers } from "redux";
import { SET_MOVIES, SET_FILTER, SET_USER } from "../actions/actions";

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function user(state = [], action) {
    console.log('My user action value', action.value);
    switch (action.type) {
        case SET_USER:
            return action.value
        default:
            return state
    }
    
}
//Under in comment is the vanilla JavaScript of how is settled visibilityFilter and movies functions into moviesApp
/*function moviesApp (state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}
*/
const moviesApp = combineReducers({visibilityFilter, movies, user});

export default moviesApp;