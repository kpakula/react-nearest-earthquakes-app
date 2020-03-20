import React from "react";
import "./Coordinates.css";
export default function Coordinates(props) {
  let showLatitude;
  let showLongitude;

  if (props.latitude && props.longitude) {
    showLatitude = <b>Latitude</b>;
    showLongitude = <b>Longitude</b>;
  }

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <div className="coordinates">
          {showLatitude}
          <p>{props.latitude}</p>
        </div>
      </div>
      <div className="col-6">
        <div className="coordinates">
          {showLongitude}
          <p>{props.longitude}</p>
        </div>
      </div>
    </div>
  );
}
