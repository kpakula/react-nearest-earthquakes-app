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
      <p>Lat: {earthquake.latitude}</p>
      <p>Long: {earthquake.longitude}</p>
      <p>Kilometers: {earthquake.kilometers}</p>
      <p>Date: {moment(earthquake.date).format("YYYY-MM-DD HH:mm")}</p>
      {/* {earthquake.clicked && <p>Show</p>} */}
    </div>
  ));

  return <div className="earthquakes">{earthquakes}</div>;
}

export default Earthquakes;
