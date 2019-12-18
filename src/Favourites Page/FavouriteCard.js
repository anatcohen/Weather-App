import React from "react";
import {Link} from 'react-router-dom';

export default function FavouriteCard(props) {
    // Converts days from a number to a string
    const parseIconURL = iconNum => {
      let updatedIconNum = iconNum < 10 ? "0" : "";
      return "https://developer.accuweather.com/sites/default/files/" + updatedIconNum + iconNum + "-s.png";
    };

  return (
    <div className="weather-card">
      <div className="card mb-3">
        <div className="row no-gutters">
            <img src={parseIconURL(props.data.Day.Icon)} className="card-img" alt="Icon not found" style={{width: "60px", height:"50px"}}/>
            <div className="card-body">
              <h5 className="card-title">
                <div className="removeFavourite"> <button type="button" className="btn btn-danger btn-sm" onClick={props.onRemoveClick}> X </button> </div>
                <Link to="/anat-cohen-29-11-2019/" onClick = {props.onClick}>{props.city}</Link>
              </h5>
              <p className="card-text"> {props.data.Temperature.Maximum.Value + " °" + props.data.Temperature.Maximum.Unit} </p>
              <p className="card-text">
                <small className="text-muted">{props.data.Day.IconPhrase}</small>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
