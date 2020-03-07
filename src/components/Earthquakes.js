import React from "react";

import "./Earthquakes.css";
import moment from "moment";
function Earthquakes({ topEarthquakes }) {
  const day = moment(topEarthquakes.date).format("YYYY-MM-DD HH:mm:ss")

  const earthquakes = topEarthquakes.map((earthquake, index) => (
    <div className="earthquake" key={index}>
        <p>{index + 1}.</p>
        <p>{earthquake.title} </p>
        <p>Lat: {earthquake.latitude}</p>
        <p>Long: {earthquake.longitude}</p>
        <p>Kilometers: {earthquake.kilometers}</p>
        <p>Date: {day}</p>

    </div>
  ));

  return (
    <div className="earthquakes">
      {earthquakes}
    </div>
  );
}

export default Earthquakes;
