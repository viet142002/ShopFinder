// create a new reducer for routingSlide
import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const routingSlice = createSlice({
    name: 'routing',
    initialState: {
        // address: {},
        current: { lat: 0, lng: 0 },
        fixedLocation: { lat: 0, lng: 0 },
        markSelected: { lat: null, lng: null },
        zoom: 15,
        showRouting: false,
        routes: [],
        info: {}
    },
    reducers: {
        setFixedLocation: (state, action) => {
            state.fixedLocation = action.payload.location;
            // state.address = action.payload.address;
        },
        setCurrentLocation: (state, action) => {
            state.current = action.payload;
        },
        setRoute: (state, action) => {
            state.routes = action.payload;
        },
        setMarkSelect: (state, action) => {
            state.markSelected = action.payload.markSelected;
            state.info = action.payload.info;
        },
        unsetMarkSelect: (state) => {
            state.markSelected = { lat: 0, lng: 0 };
            state.info = {};
            state.routes = [];
            state.showRouting = false;
        },
        setShowRouting: (state) => {
            state.showRouting = !state.showRouting;
        },
        setZoom: (state, action) => {
            state.zoom = action.payload;
        }
    }
});

// const setCurrentPosition = () => {
//     navigator.geolocation.getCurrentPosition((coords) => {
//         return coords;
//     });
// };

// Thunk để lấy vị trí từ Geolocation API
export const setFirstLocation = () => async (dispatch) => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        dispatch(
            setFixedLocation({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                // address: addressData
            })
        );
    } catch (error) {
        console.error('Error getting current location:', error);
    }
};

export default routingSlice.reducer;
export const {
    setMarkSelect,
    setShowRouting,
    setFixedLocation,
    setZoom,
    setCurrentLocation,
    unsetMarkSelect,
    setRoute,
    fixedLocation
} = routingSlice.actions;
