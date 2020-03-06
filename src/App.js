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
  const [topEarthquakes, setTopEarthquakes] = useState([]);

  const request = async () => {
    setResponse(true);
    setTopEarthquakes([]);
    try {
      const response = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
      );

      let allEarthquakes = mapEarthquakes(response);

      allEarthquakes.sort((a, b) => {
        return a.kilometers - b.kilometers;
      });

      const topFiveEarthquakes = allEarthquakes.slice(0, 5);

      setTopEarthquakes(topFiveEarthquakes);
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

  const mapEarthquakes = response => {
    let earthquakes = [];
    const length = response.data.features.length;

    for (let i = 0; i < length; i++) {
      const earthquakeTitle = response.data.features[i].properties.title;
      const earthquakeLongitude =
        response.data.features[i].geometry.coordinates[0];
      const earthquakeLatitude =
        response.data.features[i].geometry.coordinates[1];
      const kilometers = Math.round(
        Haversine.calculateDistance(
          currentLatitude,
          currentLongitude,
          earthquakeLatitude,
          earthquakeLongitude
        )
      );
      let earthquake = new Earthquake(
        earthquakeTitle,
        earthquakeLongitude,
        earthquakeLatitude,
        kilometers
      );
      earthquakes.push(earthquake);
    }

    return earthquakes;
  };

  return (
    <Container fluid={true} className="App">
      <CurrentGeoLocation
        handleUpdateCurrentLocation={handleUpdateCurrentLocation}
      ></CurrentGeoLocation>

      <div className="row mt-5 current">
        <div className="col">
          <MapAdapter markers={marker} />
        </div>

        <div className="col-6">
          <div className="container inner">
            <Coordinates
              latitude={currentLatitude}
              longitude={currentLongitude}
            />

            <div className="row h-25">
              <div className="col">
                <div className="getBtn">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={request}
                  >
                    Check earthquakes
                  </button>
                </div>
                <div className="loading">
                  {isResponse && <ReactLoading type="bars" />}
                </div>
              </div>
            </div>
            <div className="row h-50">
              <div className="col">
                {topEarthquakes.length > 0 && (
                  <Earthquakes topEarthquakes={topEarthquakes} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default App;
