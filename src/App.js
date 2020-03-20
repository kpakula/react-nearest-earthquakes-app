import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import CurrentGeoLocation  from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";
import ReactLoading from "react-loading";
import Haversine from "./utils/Haversine";
import Earthquake from "./utils/Earthquake";
import Earthquakes from "./components/Earthquakes";
import { EARTHQUAKE_API } from "./utils/Api";

function App() {
  const [markers, setMarkers] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [isResponse, setResponse] = useState(undefined);
  const [topEarthquakes, setTopEarthquakes] = useState([]);

  const request = async () => {
    setResponse(true);
    setTopEarthquakes([]);
    try {
      const response = await axios.get(EARTHQUAKE_API);

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
    setMarkers([{ latitude: lat, longitude: long }]);
    setCurrentLatitude(lat);
    setCurrentLongitude(long);

    const isCorrect = markers[0];
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
      const date = response.data.features[i].properties.time;

      const kilometers = Math.round(
        Haversine.calculateDistance(
          currentLatitude,
          currentLongitude,
          earthquakeLatitude,
          earthquakeLongitude
        )
      );
      const earthquake = new Earthquake(
        earthquakeTitle,
        earthquakeLongitude,
        earthquakeLatitude,
        kilometers,
        date
      );

      earthquakes.push(earthquake);
    }

    return earthquakes;
  };

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
          date: updatedEarthquakes[id].date,
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

  return (
    <Container fluid={true} className="App">
      <CurrentGeoLocation
        handleUpdateCurrentLocation={handleUpdateCurrentLocation}
      ></CurrentGeoLocation>

      <div className="row current">
        <div className="col-12 col-lg-8 p-0 current-column">
          <MapAdapter markers={markers} />
        </div>

        <div className="col">
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
            <div className="row m-auto">
              <div className="col">
                {topEarthquakes.length > 0 && (
                  <Earthquakes
                    topEarthquakes={topEarthquakes}
                    handleCurrentPickedEarthquake={
                      handleCurrentPickedEarthquake
                    }
                  />
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
