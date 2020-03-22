import React from "react";
import { MapView } from "./MapView";

export default function MapAdapter(props) {
  return (
    <div className="col-12 col-lg-8 p-0 current-column">
      <MapView markers={props.markers} />
    </div>
  );
}
