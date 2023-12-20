import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens';
import {COLORS, icons} from '../constants';
import {ScreenTab} from '../types';
import {FavouritesScreen} from "../screens/Favourites";
import {SearchScreen} from "../screens/Search";
import {UserScreen} from "../screens/User";

const Tab = createBottomTabNavigator();

const screens: ScreenTab[] = [
  {
    screenName: 'Home',
    screenComponent: HomeScreen,
    screenIcon: 'cutlery',
  },
  {
    screenName: 'Search',
    screenComponent: SearchScreen,
    screenIcon: 'search',
  },
  {
    screenName: 'Like',
    screenComponent: FavouritesScreen,
    screenIcon: 'like',
  },
  {
    screenName: 'User',
    screenComponent: UserScreen,
    screenIcon: 'user',
  },
];

export const Tabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar
      }}
    >
      {screens.map(({screenName, screenComponent, screenIcon}) => (
        <Tab.Screen
          key={`tab-${screenName}`}
          name={screenName}
          component={screenComponent}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={icons[screenIcon]}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  }
});