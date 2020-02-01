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
            <MapView markers={this.state.marker} />
          </Col>
        </Row>

        <Row>
          <Col>
            {/* <h3>{this.state.latitude}</h3>
            <h3>{this.state.longitude}</h3> */}
            <h3>{this.state.marker["latitude"]}</h3>
            <h3>{this.state.marker["longitude"]}</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;