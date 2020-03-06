import React from "react";
import { Col, Row } from "react-bootstrap";
import { MapView } from "./MapView";


export default function MapAdapter(props) {
  return (
        <MapView markers={props.markers} />
  );
}
