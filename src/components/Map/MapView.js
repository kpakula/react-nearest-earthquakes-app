import React from "react";
import L from "leaflet";
import { MAP_LAYER, MAP_CREDENTIALS } from "../../utils/Api";
import moment from "moment";
import "./MapView.css";


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
      markers.forEach((marker, index) => {
        const currentMarker = L.marker([marker.latitude, marker.longitude], {
          // title: "Your location"
        }).addTo(this.layer);

        if (index === 0) {
          currentMarker.bindPopup('<p>Your location <img src="" height="18px"/></p>').openPopup();
        } else {
          currentMarker.bindPopup(
            `<p>${marker.title}</p>` + 
            `<p>${moment(marker.date).format("DD-MM-YYYY HH:mm")}</p>`
            ).openPopup();
        }
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

        var polyline = L.polyline(latlngs, { color: "red" }).addTo(this.map);
        polyline.bindPopup("Distance: " + markers[1].kilometers).openPopup()
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
