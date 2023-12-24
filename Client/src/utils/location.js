const userLocation = () => {
  let lat = 0;
  let lng = 0;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    },
    (error) => {
      console.error(`Error getting geolocation: ${error.message}`);
      alert(`Vui lòng bặt vị trí`);
    },
  );
  return {
    latitude: lat,
    longitude: lng,
  };
};

export default userLocation;
