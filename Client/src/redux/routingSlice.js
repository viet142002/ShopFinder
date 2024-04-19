// create a new reducer for routingSlide
import { createSlice } from '@reduxjs/toolkit';

const routingSlice = createSlice({
    name: 'routing',
    initialState: {
        current: { lat: 0, lng: 0 },
        fixedLocation: { lat: 0, lng: 0 },
        markSelected: { lat: null, lng: null },
        zoom: 10,
        showRouting: false,
        routes: [],
        info: {}
    },
    reducers: {
        setFixedLocation: (state, action) => {
            state.fixedLocation = action.payload.location;
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
            state.markSelected = { lat: null, lng: null };
            state.info = {};
            state.routes = [];
            state.showRouting = false;
        },
        setShowRouting: (state) => {
            state.fixedLocation = state.current;
            state.showRouting = !state.showRouting;
        },
        setZoom: (state, action) => {
            state.zoom = action.payload;
        }
    }
});

// Thunk để lấy vị trí từ Geolocation API
export const setFirstLocation = () => (dispatch) => {
    try {
        // check if geolocation is supported
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        if (navigator.permissions) {
            navigator.permissions
                .query({ name: 'geolocation' })
                .then((permissionStatus) => {
                    if (permissionStatus.state === 'granted') {
                        getFirstCurrent();
                    } else if (permissionStatus.state === 'prompt') {
                        getFirstCurrent();
                    } else if (permissionStatus.state === 'denied') {
                        alert('Please allow location access');
                    }
                    permissionStatus.onchange = () => {
                        if (permissionStatus.state === 'granted') {
                            getFirstCurrent();
                        } else if (permissionStatus.state === 'prompt') {
                            getFirstCurrent();
                        } else if (permissionStatus.state === 'denied') {
                            alert('Please allow location access');
                        }
                    };
                });
        }
        // get current position if accuracy > 100 then get again use getCurrentPosition
        const getFirstCurrent = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (p) => {
                        if (p.coords.accuracy < 200) {
                            dispatch(
                                setFixedLocation({
                                    location: {
                                        lat: p.coords.latitude,
                                        lng: p.coords.longitude
                                    }
                                })
                            );
                            dispatch(
                                setCurrentLocation({
                                    lat: p.coords.latitude,
                                    lng: p.coords.longitude
                                })
                            );
                        } else {
                            getFirstCurrent();
                        }
                    },
                    (error) => console.error(error)
                );
            }
        };
        getFirstCurrent();
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
