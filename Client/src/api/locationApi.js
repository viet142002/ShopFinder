import api from './instantApi';

export const getLocations = async ({ lat, lng, radius, type, name = '' }) => {
    try {
        const response = await api.get('/locations', {
            params: {
                radius: radius,
                lat: lat,
                lng: lng,
                type: type,
                name: name
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
