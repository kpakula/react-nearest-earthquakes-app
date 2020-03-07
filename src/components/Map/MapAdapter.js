import React from "react";
import { MapView } from "./MapView";


export default function MapAdapter(props) {
  return (
        <MapView markers={props.markers} />
  );
}
