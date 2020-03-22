import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import CurrentGeoLocation from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";
import ReactLoading from "react-loading";
import Haversine from "./utils/Haversine";
import Earthquake from "./utils/Earthquake";
import Earthquakes from "./components/Earthquakes";
import { EARTHQUAKE_API } from "./utils/Api";
import CustomModal from "./components/Modal/CustomModal";
import CheckButton from "./components/Buttons/CheckButton";

function App() {
  const [markers, setMarkers] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [isResponse, setResponse] = useState(undefined);
  const [topEarthquakes, setTopEarthquakes] = useState([]);
  const [isShowModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleRandom = () => {
    const randomLat = getRandomInRange(-90, 90).toFixed(6);
    const randomLong = getRandomInRange(-180, 180).toFixed(6);

    handleUpdateCurrentLocation(randomLat, randomLong);
    setCurrentLatitude(randomLat);
    setCurrentLongitude(randomLong);

    setTopEarthquakes([]);
  };
  const handleShow = () => setShowModal(true);

  const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

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

    axios
      .get(`https://geocode.xyz/${lat},${long}?geoit=json`)
      .then(res => {
        const city = res.data.city;
        const country = res.data.country;

        setMarkers([
          { latitude: lat, longitude: long, city: city, country: country }
        ]);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {});

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

  return (
    <Container fluid={true} className="App">
      <CurrentGeoLocation
        handleUpdateCurrentLocation={handleUpdateCurrentLocation}
      ></CurrentGeoLocation>

      <div className="row current h-100">
        <MapAdapter markers={markers} />

        <div className="col-12 col-lg-4 second-column">
          <div className="h-100 d-flex flex-column">
            <Coordinates
              latitude={currentLatitude}
              longitude={currentLongitude}
              handleShow={handleShow}
            />

            <CheckButton request={request} />

            <div className="row justify-content-center align-items-center flex-grow-1">
              {topEarthquakes.length > 0 && (
                <Earthquakes
                  topEarthquakes={topEarthquakes}
                  handleCurrentPickedEarthquake={handleCurrentPickedEarthquake}
                />
              )}
              {isResponse && <ReactLoading type="bars" />}
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isShowModal={isShowModal}
        handleClose={handleClose}
        handleRandom={handleRandom}
        currentLatitude={currentLatitude}
        currentLongitude={currentLongitude}
      />
    </Container>
  );
}

export default App;
