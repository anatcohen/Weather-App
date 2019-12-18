import React from 'react';
import WeatherCard from './weatherCard';
import { useEffect } from 'react'
import AutoCompleteList from './AutoCompleteList';

export default function Home(props) {
    const d = new Date(), API_KEY = "?apikey=ilSsRGY17TfhiOEKkGf0bGkicRawIzpu";

    const onSubmit = async e => {
        e.preventDefault();
        // When fave button is clicked
        if (e.currentTarget.id === 'favBtn') {
            document.getElementById('favBtn').style.visibility = "hidden";
            props.data.addErrorMessage("Please choose a city");
        }
    },
        onTextFieldChange = e => {
            // Fetches list of autocomplete cities from API as long as the textfield is not empty
            if (e.currentTarget.value.length !== 0) {
                autoCompleteAPICall(e.currentTarget.value, API_KEY).then(
                    response => {
                        if (response.ok) return response.json();
                        else props.data.addErrorMessage("Uh oh something happened..");
                    }
                ).then(list => props.data.onTextFieldChange(list));
            }
            // Empty textfield
            else props.data.deleteCurrentList();
        },
        // When a city is clicked from he autocomplete list
        submitCity = (id) => {
            document.getElementById('city').value = "";
            props.data.fetchForecast(props.data.autocomplete.list[id].Key, props.data.autocomplete.list[id].LocalizedName, props.data.autocomplete.list[id].Country.LocalizedName, !document.getElementById("metric").checked);
            //getForecast(forecastAPICall(props.data.autocomplete.list[id].Key, !document.getElementById("metric").checked), props.data.autocomplete.list[id].LocalizedName, ", " + props.data.autocomplete.list[id].Country.LocalizedName);
        },
        // Fetches city's forecast and dispatches it to the reducer
        getForecast = (fetchFunc, city, country) => {
            fetchFunc.then(
                response => {
                    if (response.ok) return response.json();
                    else props.data.addErrorMessage("Uh oh something went wrong..");
                }
            ).then(
                forecast => {
                    props.data.addCurrentLocation(forecast.DailyForecasts !== undefined ? forecast.DailyForecasts : forecast, city, country);
                    document.getElementById('favBtn').style.visibility = "visible";
                    props.data.deleteCurrentList();
                });
        },
        // API calls for location and forecast
        autoCompleteAPICall = strSearch => {
            const API_URL = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete" + API_KEY + " &q=" + strSearch;
            return fetch(API_URL);
        },
        forecastAPICall = (locationKey, isMetric) => {
            const API_URL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationKey + API_KEY + "&metric=" + isMetric;
            return fetch(API_URL);
        },
        geoAPICall = (lat, lon) => {
            const API_URL = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search" + API_KEY + "&q=" + lat + "%2C%20" + lon;
            return fetch(API_URL);
        },
        // Checks if city is in favourite's list
        isInFavourites = city => { return props.data.favourites.favourites.filter(fav => fav.city === city).length !== 0 },
        // Checks if specific elemets or components should be renderd
        shouldRenderLoading = () => { if (props.data.currentCity.loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status" /></div> },
        shouldRenderError = () => { if (props.data.currentCity.error !== "") return <div className="alert alert-danger" role="alert">{props.data.currentCity.error}</div> },
        shouldRenderAutoCompleteList = () => { if (props.data.autocomplete.list.length !== 0) return <AutoCompleteList list={props.data.autocomplete.list} submitCity={submitCity} id="autocompleteList" /> };

    // Displays current location's weather by default 
    useEffect(() => {
        /*
        if (navigator.geolocation && props.data.currentCity.forecast.length === 0) {
            navigator.geolocation.getCurrentPosition(position => {
                // Gets current location's key
                geoAPICall(position.coords.latitude, position.coords.longitude).then(
                    response => {
                        if (response.ok) return response.json();
                        else props.data.addErrorMessage("Uh oh something happened..");
                    }
                ).then(location => getForecast(forecastAPICall(location.Key, !document.getElementById("metric").checked), location.EnglishName, ", " + location.Country.EnglishName));
            })
        }
        */
    }, []);

    return (
        <>
            <form autoComplete="off" onSubmit={onSubmit}>
                <div className="text-field">
                    <input type="text" placeholder="Enter a City" id="city" pattern="[A-Za-z].{0,}" title="English letters only" onChange={onTextFieldChange} />
                    {shouldRenderAutoCompleteList()}
                </div>
                <button style={{ visibility: "hidden" }}>Search</button>
                <div className="form-btns">
                    <button onClick={props.data.onAddFavClick} id="favBtn" className={isInFavourites(props.data.currentCity.city) ? "favAfterClick" : "favBeforeClick"}></button>
                    <label className="switch">
                        <input type="checkbox" name="metricToggle" id="metric" />
                        <span className="slider round">°F <span>°C</span></span>
                    </label>
                </div>
            </form>
            <h3>{props.data.currentCity.city + props.data.currentCity.country}</h3>
            <div className="forecast-container">
                {shouldRenderError()}
                {shouldRenderLoading()}
                {props.data.currentCity.forecast.map((day, index) => <WeatherCard key={index} data={day} date={d.getDay() + index} />)}
            </div>
        </>
    );
}
