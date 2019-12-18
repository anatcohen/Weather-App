import axios from 'axios';

export const ADD_CURRENT_CONDITIONS = 'ADD_CURRENT_CONDITIONS'
export const DELETE_CURRENT_CONDITIONS = 'DELETE_CURRENT_CONDITIONS'
export const ADD_CURRENT_LIST = 'ADD_CURRENT_LIST';
export const DELETE_CURRENT_LIST = 'DELETE_CURRENT_LIST';
export const ADD_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE';
export const CHANGE_CURRENT_LOCATION = 'CHANGE_CURRENT_LOCATION';
export const INITILISE_STATE = 'INITILISE_STATE';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const REMOVE_ALL_FAVOURITES = 'REMOVE_ALL_FAVOURITES';

const API_KEY = "?apikey=ilSsRGY17TfhiOEKkGf0bGkicRawIzpu";

export function addCurrentList(list) {
    return { type: ADD_CURRENT_LIST, list: list }
}

export function deleteCurrentList() {
    return { type: DELETE_CURRENT_LIST }
}

export function addErrorMessage(message) {
    return { type: ADD_ERROR_MESSAGE, message: message };
}

export function changeCurrentLocation(forecast, city, country) {
    return { type: CHANGE_CURRENT_LOCATION, forecast: forecast, city: city, country: country };
}

export function initiliseCurrentState() {
    return { type: INITILISE_STATE }
}
export function addFavourite(item) {
    return { type: ADD_FAVOURITE, item: item }
}

export function removeFavourite(id) {
    return { type: REMOVE_FAVOURITE, id: id }
}

export function removeAllFavourite() {
    return { type: REMOVE_ALL_FAVOURITES }
}

export function fetchForecast(locationKey, city, country, isMetric) {
    return dispatch => {
        const API_URL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationKey + API_KEY + "&metric=" + isMetric
        axios.get(API_URL)
            .then(response => {
                dispatch(deleteCurrentList());
                dispatch(changeCurrentLocation(response.data.DailyForecasts, city, country));
            })
            .catch(error => dispatch(addErrorMessage("Uh oh something went wrong")));
    }
}

export function fecthAutoComplete(strSearch) {
    return dispatch => {
        if (strSearch.length !== 0) {
            const API_URL = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete" + API_KEY + " &q=" + strSearch;
            axios.get(API_URL)
                .then(response => dispatch(addCurrentList(response)))
                .catch(error => dispatch(addErrorMessage("Uh oh something went wrong")));
        }
        else dispatch(deleteCurrentList());
    }
}