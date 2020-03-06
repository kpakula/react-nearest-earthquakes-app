import React from "react";

import "./Earthquakes.css";

function Earthquakes({ topEarthquakes }) {
  const earthquakes = topEarthquakes.map((earthquake, index) => (
    <div class="earthquake" key={index}>
        <p>{index + 1}/</p>
        <p>{earthquake.title} </p>
        <p>Lat: {earthquake.latitude}</p>
        <p>Long: {earthquake.longitude}</p>
        <p>Kilometers: {earthquake.kilometers}</p>

    </div>
  ));

  return (
    <div className="earthquakes">
      {earthquakes}
    </div>
  );
}

export default Earthquakes;
