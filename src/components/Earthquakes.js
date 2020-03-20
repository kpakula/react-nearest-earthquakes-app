import React from "react";

import "./Earthquakes.css";
import moment from "moment";
function Earthquakes({ topEarthquakes, handleCurrentPickedEarthquake }) {
  const earthquakes = topEarthquakes.map((earthquake, index) => (
    <div
      className={
        earthquake.clicked ? "earthquake earthquake-clicked" : "earthquake"
      }
      key={index}
      data-id={index}
      onClick={handleCurrentPickedEarthquake}
    >
      <p>{index + 1}.</p>
      <p>{earthquake.title} </p>
    </div>
  ));

  return <div className="earthquakes">{earthquakes}</div>;
}

export default Earthquakes;
