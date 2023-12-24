import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useSelector } from "react-redux";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";

const Routing = () => {
  const map = useMap();
  const routingControl = useRef(null);

  const destination = useSelector((state) => state.routing.destination);
  const currentLocation = useSelector((state) => state.routing.current);
  console.log({ destination, currentLocation });

  useEffect(() => {
    if (routingControl.current != null) {
      map.removeControl(routingControl.current);
    }

    const newRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(currentLocation.lat, currentLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      show: false,
      collapsible: false,
      routeWhileDragging: false,
      // geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
    });

    routingControl.current = newRoutingControl;

    console.log({ newRoutingControl });

    newRoutingControl.addTo(map);
  }, [destination, currentLocation, map]);

  return null;
};

export default Routing;
