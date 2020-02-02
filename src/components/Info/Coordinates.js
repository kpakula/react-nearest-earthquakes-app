import React from "react";
import { Col, Row } from "react-bootstrap";


export default function Coordinates(props) {
  return (
    <Row className="mt-3">
      <Col>
        <h3>{props.latitude}</h3>
      </Col>
      <Col>
        <h3>{props.longitude}</h3>
      </Col>
    </Row>
  );
}
