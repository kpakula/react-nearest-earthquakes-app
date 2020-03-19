import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function CurrentGeoLocation({ handleUpdateCurrentLocation }) {
  
  useEffect(() => {
    if (navigator.geolocation && !localStorage.getItem("coordinates")) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      const coords = JSON.parse(localStorage.getItem("coordinates"));

      handleUpdateCurrentLocation(coords.latitude, coords.longitude);
    }
    // eslint-disable-next-line
  }, []);


  function success(position) {
    const crd = position.coords;

    let coordinate = {
      latitude: crd.latitude,
      longitude: crd.longitude,
      date: new Date()
    };

    handleUpdateCurrentLocation(coordinate.latitude, coordinate.longitude);

    localStorage.setItem("coordinates", JSON.stringify(coordinate));
  }

  function error(err) {
    console.warn(`Error(${err.code}): ${err.message}`);
  }

  return (
    <Row>
      <Col></Col>
    </Row>
  );
}
