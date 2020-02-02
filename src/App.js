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
      clicked: 0
    };
  }

  handleUpdateCurrentLocation(lat, long) {
    this.setState({ marker: [{ latitude: lat, longitude: long }] });
  }

  // Handle press space bar key 
  handlePress = event => {
    if (event.key === " ") {
      const newValue = this.state.clicked + 1;
      this.setState({ clicked: newValue });
      console.log("Space  press here");
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

    const spacePress = this.state.clicked;
    let handlerInformation;
    if (spacePress > 0) {
      handlerInformation = <p className="big">Pressed {spacePress} times.</p>;
    } else {
      handlerInformation = <p className="big">Press space...</p>;
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

        <HandleKeyPressed handlerInformation={handlerInformation}/>


      </Container>
    );
  }
}

export default App;
