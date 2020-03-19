import React from "react";
import L from "leaflet";
import { MAP_LAYER, MAP_CREDENTIALS } from "../../utils/Api";

import "./MapView.css";
export class MapView extends React.Component {
  componentDidMount() {
    this.map = L.map("map", {
      zoom: 5,
      layers: [
        L.tileLayer(MAP_LAYER, {
          attribution: MAP_CREDENTIALS
        })
      ]
    });

    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.markers);
  }

  componentDidUpdate({ markers }) {
    if (this.props.markers !== markers) {
      this.updateMarkers(this.props.markers);
    }
  }

  updateMarkers(markers) {
    this.layer.clearLayers();

    if (markers.length !== 0) {
      markers.forEach(marker => {
        L.marker([marker.latitude, marker.longitude], {
          title: "Your location"
        }).addTo(this.layer);
      });

      this.map.panTo(
        new L.LatLng(markers[0].latitude, markers[0].longitude),
        5
      );

      if (markers.length === 2) {
        console.log(markers);
        const latlngs = [
          [markers[0].latitude, markers[0].longitude],
          [markers[1].latitude, markers[1].longitude]
        ];
        console.log(this.map)

        var polyline = L.polyline(latlngs, { color: "red" }).addTo(this.map);
        this.map.fitBounds(polyline.getBounds());
      }
    }
  }

  render() {
    return <div id="map"></div>;
  }
}
