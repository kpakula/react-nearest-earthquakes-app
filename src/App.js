import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import { MapView } from "./components/Map/Map";
import Coordinates from "./components/Info/Coordinates";

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
    let constInformation;
    if (spacePress > 0) {
      constInformation = <p className="big">Pressed {spacePress} times.</p>;
    } else {
      constInformation = <p className="big">Press space...</p>;
    }

    return (
      <Container fluid={true} className="App">
        <CurrentGeoLocation
          handleUpdateCurrentLocation={this.handleUpdateCurrentLocation.bind(
            this
          )}
        ></CurrentGeoLocation>

        <Row className="mt-4">
          <Col className="align-self-center">
            <MapView markers={this.state.marker} />
          </Col>
        </Row>


        <Coordinates latitude={latitude} longitude={longitude}/>

        <Row>
          <Col>{constInformation}</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
