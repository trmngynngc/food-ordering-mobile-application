import React, {useState} from 'react';
import {SafeAreaView, StyleSheet,} from 'react-native';
import {HomeRestaurantsList} from '../components/home/HomeRestaurantsList';
import {COLORS, icons} from '../constants';
import {RootTabParamList} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {initialCurrentLocation,} from '../mock-data';
import {Header} from '../components/common/Header';
import {useDispatch, useSelector} from "react-redux";

type FavouritesNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    'Favourites'
>;

type FavouritesScreen = {
    navigation: FavouritesNavigationProp;
};

export const FavouritesScreen = ({navigation}: FavouritesScreen) => {
    const {restaurants} = useSelector((state: any) => state.global)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);

    return (
        <SafeAreaView style={styles.container}>
            <Header
                rightIcon={icons.basket}
                headerText={'Favourites'}
                navigation={navigation}
            />
            <HomeRestaurantsList
                restaurants={restaurants.filter(restaurant => restaurant.liked)}
                onPress={(item) =>
                    navigation.navigate('Restaurant', {
                        item,
                        currentLocation,
                    })
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: COLORS.lightGray4,
    },
});
