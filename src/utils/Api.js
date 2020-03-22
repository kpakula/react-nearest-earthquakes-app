const EARTHQUAKE_API =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

const MAP_LAYER =
  "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=bm3pLwuFHdjGvaCardpP";

const MAP_CREDENTIALS =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const DEFAULT_COORDINATES_LATITUDE = 52.237049;
const DEFAULT_COORDINATES_LONGITUDE = 21.017632;

const LOCATION_API = (lat, long) => {
  return `https://geocode.xyz/${lat},${long}?geoit=json`;
};

module.exports = {
  EARTHQUAKE_API,
  MAP_LAYER,
  MAP_CREDENTIALS,
  DEFAULT_COORDINATES_LATITUDE,
  DEFAULT_COORDINATES_LONGITUDE,
  LOCATION_API
};
