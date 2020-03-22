import React from "react";

import "./Earthquakes.css";
function Earthquakes({ topEarthquakes, setTopEarthquakes, markers, setMarkers }) {

  const handleCurrentPickedEarthquake = event => {
    const id = event.currentTarget.dataset.id;
    const updatedEarthquakes = [...topEarthquakes];
    
    updatedEarthquakes.forEach((earthquake, index) => {
      if (index !== id) {
        earthquake.clicked = false;
      }
    });

    updatedEarthquakes[id].clicked = true;

    if (markers.length === 1) {
      setMarkers([
        ...markers,
        {
          latitude: updatedEarthquakes[id].latitude,
          longitude: updatedEarthquakes[id].longitude,
          kilometers: updatedEarthquakes[id].kilometers,
          title: updatedEarthquakes[id].title,
          date: updatedEarthquakes[id].date
        }
      ]);
    } else {
      const updateMarkers = [...markers];
      updateMarkers[1].latitude = updatedEarthquakes[id].latitude;
      updateMarkers[1].longitude = updatedEarthquakes[id].longitude;
      updateMarkers[1].kilometers = updatedEarthquakes[id].kilometers;
      updateMarkers[1].title = updatedEarthquakes[id].title;
      updateMarkers[1].date = updatedEarthquakes[id].date;
      setMarkers(updateMarkers);
    }

    setTopEarthquakes(updatedEarthquakes);
  };








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
