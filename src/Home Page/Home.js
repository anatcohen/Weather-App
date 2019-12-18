import React from 'react';
import WeatherCard from './weatherCard';
import { useEffect } from 'react'
import AutoCompleteList from './AutoCompleteList';

export default function Home(props) {
    const d = new Date();

    const onSubmit = async e => {
        e.preventDefault();
        // When fave button is clicked
        if (e.currentTarget.id === 'favBtn') {
            document.getElementById('favBtn').style.visibility = "hidden";
            props.addErrorMessage("Please choose a city");
        }
    },
        onTextFieldChange = e => props.fecthAutoComplete(e.currentTarget.value),
        // When a city is clicked from he autocomplete list
        submitCity = (id) => {
            document.getElementById('city').value = "";
            props.fetchForecast(props.autocomplete.list.data[id].Key, props.data.autocomplete.list.data[id].LocalizedName, props.data.autocomplete.list.data[id].Country.LocalizedName, !document.getElementById("metric").checked);
        },
        // Checks if city is in favourite's list
        isInFavourites = city => { return props.favourites.favourites.filter(fav => fav.city === city).length !== 0 },
        // Checks if specific elemets or components should be renderd
        shouldRenderLoading = () => { if (props.currentCity.loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status" /></div> },
        shouldRenderError = () => { if (props.currentCity.error !== "") return <div className="alert alert-danger" role="alert">{props.currentCity.error}</div> },
        shouldRenderAutoCompleteList = () => { if (props.autocomplete.list.length !== 0) return <AutoCompleteList list={props.autocomplete.list} submitCity={submitCity} id="autocompleteList" /> };

    // Displays current location's weather by default 
    useEffect(() => {
        if (navigator.geolocation && props.currentCity.forecast.length === 0) {
            navigator.geolocation.getCurrentPosition(position => props.fetchGeoLocation(position.coords.latitude, position.coords.longitude));
        }
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
                    <button onClick={props.onAddFavClick} id="favBtn" className={isInFavourites(props.currentCity.city) ? "favAfterClick" : "favBeforeClick"}></button>
                    <label className="switch">
                        <input type="checkbox" name="metricToggle" id="metric" />
                        <span className="slider round">°F <span>°C</span></span>
                    </label>
                </div>
            </form>
            <h3>{props.currentCity.city + props.currentCity.country}</h3>
            <div className="forecast-container">
                {shouldRenderError()}
                {shouldRenderLoading()}
                {props.currentCity.forecast.map((day, index) => <WeatherCard key={index} data={day} date={d.getDay() + index} />)}
            </div>
        </>
    );
}
