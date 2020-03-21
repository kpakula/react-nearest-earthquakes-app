import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import coordinates from "../../utils/Coords"
import { DEFAULT_COORDINATES_LATITUDE, DEFAULT_COORDINATES_LONGITUDE} from "../../utils/Api";
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

    const coordinate = coordinates(crd.latitude, crd.longitude);

    handleUpdateCurrentLocation(coordinate.latitude, coordinate.longitude);

    localStorage.setItem("coordinates", JSON.stringify(coordinate));
  }

  function error(err) {
    handleUpdateCurrentLocation(DEFAULT_COORDINATES_LATITUDE, DEFAULT_COORDINATES_LONGITUDE);
    console.warn(`Error(${err.code}): ${err.message}`);
  }

  return (
    <Row>
      <Col></Col>
    </Row>
  );
}
