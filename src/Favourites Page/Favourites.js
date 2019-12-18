import React from 'react';
import FavouriteCard from './FavouriteCard';

export default function Favourites(props) {
    const onClick = id => {
        props.data.addCurrentLocation(props.data.favourites.favourites[id].forecast, props.data.favourites.favourites[id].city, props.data.favourites.favourites[id].country)
    };

    return (
        <>
            {props.data.favourites.favourites.length === 0 ?
                <h3>No favourites added yet...</h3>
                    : 
                <button type="button" className= "btn btn-danger" onClick={props.data.onRemoveAllClick}>Remove All Favourites</button>
             }
            <div className="forecast-container">
                {props.data.favourites.favourites.map((fav, index) => <FavouriteCard key = {index} data={fav.forecast[0]} city={fav.city} onClick={() => onClick(index)} onRemoveClick={() => props.data.onRemoveClick(index)} bIsHome={false}/>)}
            </div>
        </>
    );
}