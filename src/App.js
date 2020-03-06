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
import Earthquakes from "./components/Earthquakes";

function App() {
  const [marker, setMarker] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [isResponse, setResponse] = useState(undefined);
  const [topEarthquakes, setTopEarthquakes] = useState([])





  const request = async () => {
    setResponse(true);
    setTopEarthquakes([]);
    try {
      const response = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
      );

      let allEarthquakes = mapEarthquakes(response);

      allEarthquakes.sort((a, b) => {
        return a.kilometers - b.kilometers
      })

      const topTenEarthquakes = allEarthquakes.slice(0, 10)

      setTopEarthquakes(topTenEarthquakes);

    } catch (error) {
      console.error(error);
    } finally {
      setResponse(false);
    }
  };




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
      {/* <img src="https://img.icons8.com/ios/50/000000/earthquakes.png"></img> */}
      <Coordinates latitude={currentLatitude} longitude={currentLongitude} />


      <div className="row">
        <div className="col">
          <div className="getBtn">
          <button type="button" className="btn btn-secondary btn-lg" onClick={request}>Check earthquakes</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="loading">
            {isResponse && <ReactLoading type="bars"/>}
          </div>
        </div>
      </div>




      {topEarthquakes.length > 0 && <Earthquakes topEarthquakes={topEarthquakes}/>}
    </Container>
  );
}

export default App;
