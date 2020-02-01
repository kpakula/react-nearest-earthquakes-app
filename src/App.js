import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
// import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";
import { MapView } from "./components/Map/Map";

function App() {
  return (
    <Container fluid={true} className="App">
      {/* <CurrentGeoLocation> */}


        {/* </CurrentGeoLocation> */}
      <Row>
        <Col className="align-self-center">
          <MapView/>
        </Col>
{/* 
        <Col>
          sranie
        </Col> */}
      </Row>
    </Container>
  );
}

export default App;
