import React from "react";
import { Col, Row } from "react-bootstrap";
import { MapView } from "./MapView";


export default function MapAdapter(props) {
  return (
    <Row className="mt-4">
      <Col className="align-self-center">
        <MapView markers={props.markers} />
      </Col>
    </Row>
  );
}
