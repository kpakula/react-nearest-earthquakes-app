import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: []
    };
  }

  handleUpdateCurrentLocation(lat, long) {
    this.setState({ marker: [{ latitude: lat, longitude: long }] });
  }

  request = () => {
    axios
      .get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then((response) => {
        console.log(response.data.features);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  // Handle press space bar key
  handlePress = event => {
    if (event.key === " ") {
      this.request();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handlePress, false);
  }

  render() {
    const isCorrect = this.state.marker[0];
    let latitude;
    let longitude;

    if (isCorrect !== undefined) {
      latitude = isCorrect["latitude"];
      longitude = isCorrect["longitude"];
    }

    return (
      <Container fluid={true} className="App">
        <CurrentGeoLocation
          handleUpdateCurrentLocation={this.handleUpdateCurrentLocation.bind(
            this
          )}
        ></CurrentGeoLocation>

        <MapAdapter markers={this.state.marker} />

        <Coordinates latitude={latitude} longitude={longitude} />
      </Container>
    );
  }
}

export default App;
