let userLatitude;
let userLongitude;

navigator.geolocation.getCurrentPosition(
  (position) => {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
  },
  (error) => {
    console.error(`Error getting geolocation: ${error.message}`);
    alert(`Vui lòng bặt vị trí`);
  },
);

const userLocation = () => {
  return {
    latitude: userLatitude,
    longitude: userLongitude,
  };
};

export default userLocation;
