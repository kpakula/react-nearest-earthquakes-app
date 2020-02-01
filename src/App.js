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
    this.marker = [
      { lat: "42.51", long: "32.2" },
      { lat: "23.51", long: "52.2" },
      { lat: "15.51", long: "23.25" }
    ];
  }

  state = {
    latitude: '',
    longitude: '',
    marker: [
      { lat: "42.51", long: "32.2" },
      { lat: "23.51", long: "52.2" },
      { lat: "15.51", long: "23.25" }
    ]
  };

  handleUpdateCurrentLocation(lat, long) {
    this.setState({ latitude: lat, longitude: long});
  }

  render() {
    return (
      <Container fluid={true} className="App">
        <Row>
          <Col>
            <CurrentGeoLocation
              handleUpdateCurrentLocation={this.handleUpdateCurrentLocation.bind(
                this
              )}
            />
          </Col>
        </Row>

        <Row>
          <Col className="align-self-center">
            <MapView markers={this.marker} />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>{this.state.latitude}</h3>
            <h3>{this.state.longitude}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
