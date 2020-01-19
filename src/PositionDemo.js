import React, { useState, useEffect } from "react";

export const PositionDemo = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } 
  }, []);

  

  function success(position) {
    const crd = position.coords;
    // console.log("Your current position is: ");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters`);
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }

  function error(err) {
    console.warn(`Error(${err.code}): ${err.message}`);
  }

  return (<div>{latitude} {longitude}</div>);
};
