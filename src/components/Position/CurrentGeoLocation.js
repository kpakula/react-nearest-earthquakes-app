import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// import "./Position.css";

export const CurrentGeoLocation = (props) => {

  useEffect(() => {
    if (navigator.geolocation && !localStorage.getItem("coordinates")) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      const coords = JSON.parse(localStorage.getItem("coordinates"));

      handleUpdateCurrentLocation(coords.latitude, coords.longitude);
    }
  }, []);

  const handleUpdateCurrentLocation = props.handleUpdateCurrentLocation;

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
      <Col>

        {/* <div><h2>Latitude: {latitude}</h2></div>
        <div><h2>Longitude: {longitude}</h2></div> */}
      </Col>
    </Row>
  );
};
