import { Icon } from 'leaflet';

import restaurant from '../assets/icons/restaurant.png';
import cafe from '../assets/icons/cafe.png';
import Clothing from '../assets/icons/clothing.png';
import defaultIc from '../assets/icons/default.png';
import electronics from '../assets/icons/electronics.png';
import furniture from '../assets/icons/furniture.png';

const iconRestaurant = new Icon({
    iconUrl: restaurant,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});
const iconCafe = new Icon({
    iconUrl: cafe,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});
const iconClothing = new Icon({
    iconUrl: Clothing,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});
const iconElectronics = new Icon({
    iconUrl: electronics,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});
const iconFurniture = new Icon({
    iconUrl: furniture,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});
const iconDefault = new Icon({
    iconUrl: defaultIc,
    iconSize: [32, 45],
    iconAnchor: [32 / 2, 45]
});

const iconByType = {
    food: iconRestaurant,
    beverage: iconCafe,
    clothing: iconClothing,
    electronics: iconElectronics,
    furniture: iconFurniture,
    default: iconDefault
};

export { iconByType, iconRestaurant, iconCafe, iconDefault };
