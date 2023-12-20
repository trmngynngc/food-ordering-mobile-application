import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import {HomeMainCategories} from '../components/home/HomeMainCategories';
import {HomeRestaurantsList} from '../components/home/HomeRestaurantsList';
import {COLORS, FONTS, icons} from '../constants';
import {CategoryData, RootTabParamList} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {initialCurrentLocation,} from '../mock-data';
import {Header} from '../components/common/Header';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedCategory as setSelectedCategoryAction} from "../store/globalsSlice";

type HomeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    'Home'
>;

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({navigation}: HomeScreenProps) => {
    const dispatch = useDispatch();
    const {categories, selectedCategory, restaurants} = useSelector((state: any) => state.global)
    const setSelectedCategory = (category: CategoryData) => dispatch(setSelectedCategoryAction(category));
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);

    function onSelectCategory(category: CategoryData) {
        if (selectedCategory?.id === category.id) {
            setSelectedCategory(null);
            return;
        }
        setSelectedCategory(category);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                rightIcon={icons.basket}
                headerText={'Home'}
                navigation={navigation}
            />
            <HomeMainCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(category: CategoryData) =>
                    onSelectCategory(category)
                }
            />
            <HomeRestaurantsList
                restaurants={selectedCategory === null ? restaurants : restaurants.filter(restaurant => restaurant.categories.includes(selectedCategory?.id))}
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
