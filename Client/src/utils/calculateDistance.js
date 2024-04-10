import L from 'leaflet';

/* Calculate the distance between two locations in kilometers
 * @param {Object} firstLocation - The first location
 * @param {Object} secondLocation - The second location
 * @returns {Number} The distance between the two locations in kilometers
 */
export function calculateDistance(firstLocation, secondLocation) {
    const first = L.latLng(firstLocation.lat, firstLocation.lng);
    const second = L.latLng(secondLocation.lat, secondLocation.lng);

    return first.distanceTo(second) / 1000;
}
