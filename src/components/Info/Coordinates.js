import React from "react";

export default function Coordinates(props) {
  let showLatitude;
  let showLongitude;

  if (props.latitude && props.longitude) {
    showLatitude = <b>Latitude</b>;
    showLongitude = <b>Longitude</b>;
  }

  return (
    <div className="row h-25 align-items-center justify-content-center">
      <div className="col-6">
        <p>{showLatitude}</p>
        <h3>{props.latitude}</h3>
      </div>
      <div className="col-6">
        <p> {showLongitude}</p>

        <h3>{props.longitude}</h3>
      </div>
    </div>
  );
}
