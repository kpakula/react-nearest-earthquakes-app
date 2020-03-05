import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";
import ReactLoading from "react-loading";
import Haversine from "./utils/Haversine";
import Earthquake from "./utils/Earthquake";

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

      let allEarthquakes = mapEarthquakes(response);

      console.log(allEarthquakes)



    } catch (error) {
      console.error(error);
    } finally {
      setResponse(false);
    }
  };

  const mapEarthquakes = (response) => {
    let earthquakes = [];
    const length = response.data.features.length;

    for (let i = 0; i < length; i++) {
      const earthquakeTitle = response.data.features[i].properties.title;
      const earthquakeLongitude = response.data.features[i].geometry.coordinates[0];
      const earthquakeLatitude = response.data.features[i].geometry.coordinates[1];
      const kilometers = Haversine.calculateDistance(currentLatitude, currentLongitude, earthquakeLatitude, earthquakeLongitude);
      let earthquake = new Earthquake(earthquakeTitle, earthquakeLongitude, earthquakeLatitude, kilometers)
      earthquakes.push(earthquake);
    }

    return earthquakes;
  }


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
