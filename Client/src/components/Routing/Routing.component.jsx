import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import L from 'leaflet';

import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import { setRoute } from '~/redux/routingSlice';
import { iconDefault } from '~/utils/icon';

const Routing = ({ start, destination }) => {
    const map = useMap();
    const dispatch = useDispatch();
    const routingControl = useRef(null);
    const { showRouting } = useSelector((state) => state.routing);
    useEffect(() => {
        // check if we have all the data we need to show routing
        if (!start || !destination || !showRouting) {
            if (!routingControl.current) return;
            map.removeControl(routingControl.current);
            return;
        }

        const cleanupPreviousControl = () => {
            if (routingControl.current) {
                map.removeControl(routingControl.current);
            }
        };

        L.Routing.Localization['vi'] = {
            directions: {
                N: 'bắc',
                NE: 'đông bắc',
                E: 'đông',
                SE: 'đông nam',
                S: 'nam',
                SW: 'tây nam',
                W: 'tây',
                NW: 'tây bắc',
                SlightRight: 'rẽ nhẹ sang phải',
                Right: 'rẽ phải',
                SharpRight: 'rẽ phải dốc',
                SlightLeft: 'rẽ nhẹ sang trái',
                Left: 'rẽ trái',
                SharpLeft: 'rẽ trái dốc',
                Uturn: 'quay đầu'
            },
            instructions: {
                Head: ['Đi thẳng {dir}', ' trên {road}'],
                Continue: ['Tiếp tục {dir}', ' trên {road}'],
                TurnAround: ['Quay đầu'],
                WaypointReached: ['Điểm đến'],
                Roundabout: ['Rẽ {exitStr} tại vòng xuyến', ' trên {road}'],
                DestinationReached: ['Đã đến nơi đến'],
                Fork: ['Tại ngã tư, rẽ {modifier}', ' trên {road}'],
                Merge: ['Hợp nhất {modifier}', ' trên {road}'],
                OnRamp: ['Rẽ {modifier} tại đường nối', ' trên {road}'],
                OffRamp: ['Rẽ {modifier} tại đường thoát', ' trên {road}'],
                EndOfRoad: ['Rẽ {modifier} tại cuối đường', ' trên {road}'],
                Onto: 'trên {road}'
            },
            formatOrder: function (n) {
                return n + '.';
            },
            ui: {
                startPlaceholder: 'Bắt đầu',
                viaPlaceholder: 'Qua {viaNumber}',
                endPlaceholder: 'Đích'
            },
            units: {
                meters: 'm',
                kilometers: 'km',
                yards: 'yd',
                miles: 'mi',
                hours: 'giờ',
                minutes: 'phút',
                seconds: 'giây'
            },
            error: {
                server: 'Lỗi máy chủ',
                notFound: 'Không tìm thấy đường đi',
                forbidden: 'Không được phép truy cập',
                unknown: 'Lỗi không xác định'
            }
        };
        const createNewRoutingControl = () => {
            return L.Routing.control({
                language: 'vi',
                waypoints: [
                    L.latLng(start.lat, start.lng),
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
                }),
                // custom mark
                createMarker: function (i, wp) {
                    // create a marker for the end point and start point default
                    if (i === 1) {
                        return L.marker(wp.latLng, {
                            draggable: false,
                            icon: iconDefault
                        });
                    }
                }
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
    }, [destination, start, map, dispatch, showRouting]);

    return null;
};

export default Routing;
