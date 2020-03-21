import React, { useState } from "react";
import "./Coordinates.css";
import Coordinate from "./Coordinate";
export default function Coordinates({ latitude, longitude, handleShow }) {


  let showLatitude;
  let showLongitude;

  if (latitude && longitude) {
    showLatitude = <b>Latitude</b>;
    showLongitude = <b>Longitude</b>;
  }

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <Coordinate
          handleShow={handleShow}
          showLabel={showLatitude}
          coordinate={latitude}
        />
      </div>
      <div className="col-6">
        <Coordinate
          handleShow={handleShow}
          showLabel={showLongitude}
          coordinate={longitude}
        />
      </div>


    </div>
  );
}
