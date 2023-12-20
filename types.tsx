import { LatLng } from 'react-native-maps';
import { icons } from './constants';

export type RootTabParamList = {
  Home: undefined;
  Restaurant: { item: Restaurant, currentLocation: CurrentLocation };
  OrderDelivery: { restaurant: Restaurant | null, currentLocation: CurrentLocation | null };
  Order: any;
  Search: any;
  Favourites: any;
};

export interface ScreenTab {
  screenName: string;
  screenComponent: any;
  screenIcon: keyof typeof icons;
};

export type CurrentLocation = {streetName: string; gps: LatLng};

export type CategoryData = {id: number; name: string; icon: any};

export type Courier = {avatar: any; name: string};

export type Menu = {
  menuId: number;
  name: string;
  photo: any;
  description: string;
  price: number;
};

export type Restaurant = {
  id: number;
  name: string;
  categories: number[];
  categoryNames?: string[];
  liked: boolean;
  photo: any;
  courier: Courier;
  menu: Menu[];
};

export type OrderItem = {
  menuId: number;
  qty: number;
  price: number;
  total: number;
};