import React from "react";
import L from "leaflet";

import "./Map.css";
export class MapView extends React.Component {
  componentDidMount() {
    this.map = L.map("map", {
      zoom: 5,
      layers: [
        L.tileLayer(
          "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=bm3pLwuFHdjGvaCardpP",
          {
            attribution:
              '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          }
        )
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
          title: marker.title
        }).addTo(this.layer);
      });

      this.map.panTo(new L.LatLng(markers[0].latitude, markers[0].longitude), 5)
    }
  }

  render() {
    return <div id="map"></div>;
  }
}
