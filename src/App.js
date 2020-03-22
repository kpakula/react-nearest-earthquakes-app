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
import { EARTHQUAKE_API, LOCATION_API } from "./utils/Api";
import CustomModal from "./components/Modal/CustomModal";
import CheckButton from "./components/Buttons/CheckButton";
import getRandomInRange from "./utils/Random"

function App() {
  const [markers, setMarkers] = useState([]);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [isLoadingBar, setLoadingBar] = useState(undefined);
  const [topEarthquakes, setTopEarthquakes] = useState([]);
  const [isShowModal, setShowModal] = useState(false);

  const makeEarthquakesRequest = async () => {

    setLoadingBar(true);
    setTopEarthquakes([]);
    try {
      const response = await axios.get(EARTHQUAKE_API);

      let allEarthquakes = mapResponseWithEarthquakes(response);

      allEarthquakes.sort((a, b) => {
        return a.kilometers - b.kilometers;
      });

      const topFiveEarthquakes = allEarthquakes.slice(0, 5);

      setTopEarthquakes(topFiveEarthquakes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBar(false);
    }
  };

  const handleUpdateCurrentLocation = (lat, long) => {
    setMarkers([{ latitude: lat, longitude: long }]);

    axios
      .get(LOCATION_API(lat, long))
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



  const mapResponseWithEarthquakes = response => {
    let earthquakes = [];
    const length = response.data.features.length;

    for (let i = 0; i < length; i++) {
      const currentEarthquake = response.data.features[i];
      const { earthquakeTitle, earthquakeLongitude, earthquakeLatitude, date } = mapResponseToCurrentEarthquake(currentEarthquake);
      
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

  const mapResponseToCurrentEarthquake = (currentEarthquake) => {
    return {
      earthquakeTitle: currentEarthquake.properties.title,
      earthquakeLongitude: currentEarthquake.geometry.coordinates[0],
      earthquakeLatitude: currentEarthquake.geometry.coordinates[1],
      date: currentEarthquake.properties.time
    }
  }

  const getRandomCoordinates = () => {
    const randomLat = getRandomInRange(-90, 90).toFixed(6);
    const randomLong = getRandomInRange(-180, 180).toFixed(6);

    handleUpdateCurrentLocation(randomLat, randomLong);
    setCurrentLatitude(randomLat);
    setCurrentLongitude(randomLong);

    setTopEarthquakes([]);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

            <CheckButton request={makeEarthquakesRequest} />

            <div className="row justify-content-center align-items-center flex-grow-1">
              {topEarthquakes.length > 0 && (
                <Earthquakes
                  topEarthquakes={topEarthquakes}
                  markers={markers}
                  setMarkers={setMarkers}
                  setTopEarthquakes={setTopEarthquakes}
                />
              )}
              {isLoadingBar && <ReactLoading type="bars" />}
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isShowModal={isShowModal}
        handleClose={handleClose}
        handleRandom={getRandomCoordinates}
        currentLatitude={currentLatitude}
        currentLongitude={currentLongitude}
      />
    </Container>
  );
}

export default App;
