import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Coordinates(props) {
  let showLatitude;
  let showLongitude;

  if (props.latitude && props.longitude) {
    showLatitude = <b>Latitude</b>;
    showLongitude = <b>Longitude</b>;
  }

  return (
    <Row className="mt-3">
      <Col>
        {showLatitude}
        <h3>{props.latitude}</h3>
      </Col>
      <Col>
        {showLongitude}
        <h3>{props.longitude}</h3>
      </Col>
    </Row>
  );
}
