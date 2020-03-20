import React from "react";
import L from "leaflet";
import { MAP_LAYER, MAP_CREDENTIALS } from "../../utils/Api";

import "./MapView.css";
import Haversine from "../../utils/Haversine";
export class MapView extends React.Component {
  componentDidMount() {
    this.polyline = null;
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
        const currentMarker = L.marker([marker.latitude, marker.longitude], {
          title: "Your location"
        }).addTo(this.layer);

        // Popup
        currentMarker.bindPopup('benc').openPopup();
      });

      this.map.panTo(
        new L.LatLng(markers[0].latitude, markers[0].longitude),
        5
      );

      if (markers.length === 2) {
        const latlngs = this.getCurrentLatitudeAndLongitude(markers)

        if (this.polyline !== null) {
          this.polyline.remove();
        }

        const distance = Haversine.calculateDistance(
          markers[0].latitude, markers[0].longitude,
          markers[1].latitude, markers[1].longitude
        )

        var polyline = L.polyline(latlngs, { color: "red" }).addTo(this.map);
        polyline.bindPopup("Distance: " + distance.toString()).openPopup()
        this.polyline = polyline;

        this.map.fitBounds(polyline.getBounds());
      }
    }
  }
  
  getCurrentLatitudeAndLongitude = (markers) => {
    return [
      [markers[0].latitude, markers[0].longitude],
      [markers[1].latitude, markers[1].longitude]
    ]
  }

  render() {
    return <div id="map"></div>;
  }
}
