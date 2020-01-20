import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import { CurrentGeoLocation } from "./components/Position/CurrentGeoLocation";

function App() {
  return (

    <Container fluid={true} className="App">
      <Row>
        <Col>
          <CurrentGeoLocation/>
        </Col>
      </Row>
      <Row>
        <Col>
        
        </Col>
      </Row>
    </Container>

  );
}

export default App;
