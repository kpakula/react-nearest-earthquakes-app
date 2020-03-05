import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";


function App() {
  const [marker, setMarker] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);

  const handleUpdateCurrentLocation = (lat, long) => {
    setMarker([{latitude: lat, longitude: long}])
    setCurrentLatitude(lat);
    setCurrentLongitude(long)


    const isCorrect = marker[0];
    if (isCorrect !== undefined) {
      setCurrentLatitude(isCorrect["latitude"])
      setCurrentLongitude(isCorrect["longitude"])
    }
  }

  const request = () => {
    axios
      .get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then((response) => {
        console.log(response.data.features);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <Container fluid={true} className="App">
    <CurrentGeoLocation
      handleUpdateCurrentLocation={handleUpdateCurrentLocation}
    ></CurrentGeoLocation>

    <MapAdapter markers={marker} />

    <Coordinates latitude={currentLatitude} longitude={currentLongitude} />
  </Container>
  )
}

export default App;
