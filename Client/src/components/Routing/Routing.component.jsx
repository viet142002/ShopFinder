import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import L from 'leaflet';

import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';

import { setRoute } from '../../redux/routingSlice';

const Routing = () => {
    const map = useMap();
    const dispatch = useDispatch();
    const routingControl = useRef(null);

    const destination = useSelector((state) => state.routing.markSelected);
    const currentLocation = useSelector((state) => state.routing.current);
    const showRouting = useSelector((state) => state.routing.showRouting);

    useEffect(() => {
        // check if we have all the data we need to show routing
        if (!currentLocation || !destination || !showRouting) {
            if (!routingControl.current) return;
            map.removeControl(routingControl.current);
            return;
        }

        const cleanupPreviousControl = () => {
            if (routingControl.current) {
                map.removeControl(routingControl.current);
            }
        };

        const createNewRoutingControl = () => {
            return L.Routing.control({
                waypoints: [
                    L.latLng(currentLocation.lat, currentLocation.lng),
                    L.latLng(destination.lat, destination.lng)
                ],
                lineOptions: {
                    styles: [
                        {
                            color: 'blue',
                            weight: 4,
                            opacity: 0.7
                        }
                    ]
                },
                show: true,
                collapsible: true,
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: true,
                geocoder: L.Control.Geocoder.nominatim({
                    geocodingQueryParams: {
                        acceptLanguage: 'vi-VN'
                    }
                })
            });
        };

        const handleRoutesFound = (e) => {
            const waypoints = e.waypoints.map((item) => {
                return {
                    lat: item.latLng.lat,
                    lng: item.latLng.lng,
                    name: item.name
                };
            });
            const arr = e.routes.map((item) => ({
                instructions: item.instructions,
                summary: item.summary,
                name: item.name
            }));
            dispatch(setRoute({ waypoints, routes: arr }));
        };

        cleanupPreviousControl();

        const newRoutingControl = createNewRoutingControl();

        newRoutingControl.on('routesfound', handleRoutesFound);

        routingControl.current = newRoutingControl;

        newRoutingControl.addTo(map);
    }, [destination, currentLocation, map, dispatch, showRouting]);

    return null;
};

export default Routing;
