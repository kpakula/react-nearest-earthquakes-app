const coordinates = (latitude, longitude) => {
  return {
    latitude: latitude,
    longitude: longitude,
    date: new Date()
  };
};

export default coordinates;