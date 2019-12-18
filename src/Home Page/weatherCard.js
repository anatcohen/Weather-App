import React from "react";

export default function WeatherCard(props) {
  // Converts days from a number to a string
  const parseDay = index => {
      switch (index % 7) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        default:
          return "";
      }
    },
    parseIconURL = iconNum => {
      let updatedIconNum = iconNum < 10 ? "0" : "";
      return "https://developer.accuweather.com/sites/default/files/" + updatedIconNum + iconNum + "-s.png";
    };

  return (
    <div className="weather-card">
      <div className="card mb-3">
        <div className="row no-gutters">
            <img src={parseIconURL(props.data.Day.Icon)} className="card-img" alt="Icon not found" style={{width: "60px", height:"50px"}}/>
            <div className="card-body">
              <h5 className="card-title">{parseDay(props.date)}</h5>
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
