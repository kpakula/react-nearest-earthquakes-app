import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import Coordinates from "./components/Info/Coordinates";
import MapAdapter from "./components/Map/MapAdapter";
import HandleKeyPressed from "./components/Handlers/handleKeyPressed";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: [],
    };
  }

  handleUpdateCurrentLocation(lat, long) {
    this.setState({ marker: [{ latitude: lat, longitude: long }] });
  }

  // Handle press space bar key
  handlePress = event => {
    if (event.key === " ") {
      // console.log("Space  press here");
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

        <MapAdapter markers={this.state.marker}/>

        <Coordinates latitude={latitude} longitude={longitude}/>

      </Container>
    );
  }
}

export default App;
