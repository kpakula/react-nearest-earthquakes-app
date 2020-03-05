import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";
import ReactLoading from "react-loading";

function App() {
  const [marker, setMarker] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [isResponse, setResponse] = useState(undefined);



  const handleUpdateCurrentLocation = (lat, long) => {
    setMarker([{ latitude: lat, longitude: long }]);
    setCurrentLatitude(lat);
    setCurrentLongitude(long);

    const isCorrect = marker[0];
    if (isCorrect !== undefined) {
      setCurrentLatitude(isCorrect["latitude"]);
      setCurrentLongitude(isCorrect["longitude"]);
    }
  };


  const request = async () => {
    setResponse(true);
    try {
      const response = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
      );
      console.log(response.data.features)
    } catch (error) {
      console.error(error);
    } finally {
      setResponse(false);
    }
  };

  
  return (
    <Container fluid={true} className="App">
      <CurrentGeoLocation
        handleUpdateCurrentLocation={handleUpdateCurrentLocation}
      ></CurrentGeoLocation>

      <MapAdapter markers={marker} />
      <button onClick={request}>Get</button>
      {isResponse && <ReactLoading type="bars"/>}

      <Coordinates latitude={currentLatitude} longitude={currentLongitude} />
    </Container>
  );
}

export default App;
