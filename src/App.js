import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import { MapView } from "./components/Map/Map";

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

  render() {
    const isCorrect = this.state.marker[0];
    let latitude;
    let longitude;

    if (isCorrect !== undefined) {
      console.log(isCorrect["latitude"]);
      console.log(isCorrect["longitude"]);
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

        <Row>
          <Col className="align-self-center">
            <MapView markers={this.state.marker} />
          </Col>
        </Row>
        <Row>
          <Col>{latitude}</Col>
          <Col>{longitude}</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
