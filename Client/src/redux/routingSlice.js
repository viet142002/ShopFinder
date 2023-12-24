// create a new reducer for routingSlide
import { createSlice } from "@reduxjs/toolkit";

const routingSlice = createSlice({
  name: "routing",
  initialState: {
    current: { lat: 0, lng: 0 },
    destination: { lat: 0, lng: 0 },
    zoom: 15,
    show: false,
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.current = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setShow: (state, action) => {
      console.log(action.payload);
      state.show = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
  },
});

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });

// Thunk để lấy vị trí từ Geolocation API
export const getCurrentLocation = () => async (dispatch) => {
  try {
    const position = await getCurrentPosition();
    dispatch(
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
    );
  } catch (error) {
    console.error("Error getting current location:", error);
  }
};

export default routingSlice.reducer;
export const { setDestination, setShow, setZoom, setCurrentLocation } =
  routingSlice.actions;
