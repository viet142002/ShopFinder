import { Icon } from "leaflet";

import restaurant from "../assets/icons/restaurant.png";
import bookStore from "../assets/icons/book.png";
import cafe from "../assets/icons/cafe.png";
import shoe from "../assets/icons/shoe.png";
import jewelry from "../assets/icons/jewelry.png";
import shopping from "../assets/icons/shopping.png";
import defaultIc from "../assets/icons/default.png";

const iconRestaurant = new Icon({
  iconUrl: restaurant,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconBookStore = new Icon({
  iconUrl: bookStore,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconCafe = new Icon({
  iconUrl: cafe,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconJewelry = new Icon({
  iconUrl: jewelry,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconShoppingMall = new Icon({
  iconUrl: shopping,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconShoe = new Icon({
  iconUrl: shoe,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});
const iconDefault = new Icon({
  iconUrl: defaultIc,
  iconSize: [32, 45],
  iconAnchor: [32 / 2, 45],
});

const iconByType = {
  restaurant: iconRestaurant,
  bookstore: iconBookStore,
  cafe: iconCafe,
  jewelry: iconJewelry,
  shopping_mall: iconShoppingMall,
  shoe: iconShoe,
  default: iconDefault,
};

export {
  iconByType,
  iconRestaurant,
  iconBookStore,
  iconCafe,
  iconJewelry,
  iconShoppingMall,
  iconShoe,
  iconDefault,
};
