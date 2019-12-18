import { ADD_CURRENT_LIST, DELETE_CURRENT_LIST, REMOVE_FAVOURITE, ADD_FAVOURITE, REMOVE_ALL_FAVOURITES, CHANGE_CURRENT_LOCATION, ADD_ERROR_MESSAGE, INITILISE_STATE } from '../actions/actions';
import { combineReducers } from 'redux';

const INITIAL_CURRENT_STATE = { forecast: [], city: "", country: "", loading: true, error: "" };
const INITIAL_FAVOURITES_STATE = { favourites: [] }
const INITIAL_AUTOCOMPLETE_STATE = { list: [] };

// Reducer for current city displayed
function currentCityReducer(state = INITIAL_CURRENT_STATE, action) {
    switch (action.type) {
        case CHANGE_CURRENT_LOCATION:
            return { forecast: action.forecast, city: action.city, country: action.country, loading: false, error: "" };
        case ADD_ERROR_MESSAGE:
            return { ...INITIAL_CURRENT_STATE, loading: false, error: action.message }
        case INITILISE_STATE:
            return INITIAL_CURRENT_STATE;
        default:
            return state;
    }
}

// Reducer for favourite cities list
function favouritesReducer(state = INITIAL_FAVOURITES_STATE, action) {
    switch (action.type) {
        case ADD_FAVOURITE:
            return { favourites: [...state.favourites, action.item] };
        case REMOVE_FAVOURITE:
            return { favourites: (state.favourites.filter((fav, index) => index !== parseInt(action.id))) }
        case REMOVE_ALL_FAVOURITES:
            return INITIAL_FAVOURITES_STATE;
        default:
            return state;
    };
}

// Reducer for autocomplete list
function autocompleteReducer(state = INITIAL_AUTOCOMPLETE_STATE, action) {
    switch (action.type) {
        case ADD_CURRENT_LIST:
            return { list: action.list };
        case DELETE_CURRENT_LIST:
            return INITIAL_AUTOCOMPLETE_STATE;
        default:
            return state;
    }
}

export default combineReducers({
    currentCity: currentCityReducer,
    favourites: favouritesReducer,
    autocomplete: autocompleteReducer
});