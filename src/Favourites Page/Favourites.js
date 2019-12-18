import React from 'react';
import FavouriteCard from './FavouriteCard';

export default function Favourites(props) {
    const onClick = id => {
        props.addCurrentLocation(props.favourites.favourites[id].forecast, props.favourites.favourites[id].city, props.favourites.favourites[id].country)
    };

    return (
        <>
            {props.favourites.favourites.length === 0 ?
                <h3>No favourites added yet...</h3>
                :
                <button type="button" className="btn btn-danger" onClick={props.onRemoveAllClick}>Remove All Favourites</button>
            }
            <div className="forecast-container">
                {props.favourites.favourites.map((fav, index) => <FavouriteCard key={index} data={fav.forecast[0]} city={fav.city} onClick={() => onClick(index)} onRemoveClick={() => props.onRemoveClick(index)} bIsHome={false} />)}
            </div>
        </>
    );
}