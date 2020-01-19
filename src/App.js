import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
      <Container fluid={true} className="App">
        <Row>
          <Col className="border">1 of 2</Col>
          <Col className="border">2 of 2</Col>
        </Row>
        <Row>
          <Col className="border">1 of 3</Col>
          <Col className="border">2 of 3</Col>
          <Col className="border">3 of 3</Col>
        </Row>
      </Container>
  );
}

export default App;
