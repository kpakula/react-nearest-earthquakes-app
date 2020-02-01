import React from "react";
import L from "leaflet";

import "./Map.css";
export class MapView extends React.Component {

  componentDidMount() {
    this.map = L.map("map", {
      center: [49.8419, 24.0315],
      zoom: 2,
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

    // this.marker = L.marker([50.5, 30.5]).addTo(this.map)
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.markers)
  }


  componentDidUpdate( {markers} )  {
      if (this.props.markers !== markers) {
          this.updateMarkers(this.props.markers)
      }
  }

  updateMarkers(markers) {
    console.log(markers)
    
    this.layer.clearLayers();
    markers.forEach(marker => {
        L.marker(
            [marker.lat, marker.long], { title: marker.title }
        ).addTo(this.layer);
    });
  }

  render() {
    return <div id="map"></div>;
  }
}
