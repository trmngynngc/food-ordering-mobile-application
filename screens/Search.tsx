import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput,} from 'react-native';
import {HomeRestaurantsList} from '../components/home/HomeRestaurantsList';
import {COLORS, icons} from '../constants';
import {RootTabParamList} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {initialCurrentLocation,} from '../mock-data';
import {Header} from '../components/common/Header';
import {useSelector} from "react-redux";

type SearchNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    'Search'
>;

type SearchScreenProps = {
    navigation: SearchNavigationProp;
};

export const SearchScreen = ({navigation}: SearchScreenProps) => {
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
    const [text, onChangeText] = React.useState('');
    const {restaurants} = useSelector((state: any) => state.global)

    return (
        <SafeAreaView style={styles.container}>
            <Header
                rightIcon={icons.basket}
                headerText={'Search'}
                navigation={navigation}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
            />
            <HomeRestaurantsList
                restaurants={!text ? [] : restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(text.toLowerCase()))}
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
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: COLORS.black,
        borderColor: COLORS.primary,
    },
});
