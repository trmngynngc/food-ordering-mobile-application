import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text,} from 'react-native';
import {HomeMainCategories} from '../components/home/HomeMainCategories';
import {HomeRestaurantsList} from '../components/home/HomeRestaurantsList';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {CategoryData, RootTabParamList} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {initialCurrentLocation,} from '../mock-data';
import {Header} from '../components/common/Header';
import {useDispatch, useSelector} from "react-redux";
import {setOrder, setSelectedCategory as setSelectedCategoryAction} from "../store/globalsSlice";
import {Order} from "../components/order/Order";

type OrderScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    'Order'
>;

type OrderScreenProps = {
    navigation: OrderScreenNavigationProp
};

export const OrderScreen = ({navigation}: OrderScreenProps) => {
    const dispatch = useDispatch();
    const {categories, selectedCategory, restaurants, orders} = useSelector((state: any) => state.global)
    const setSelectedCategory = (category: CategoryData) => dispatch(setSelectedCategoryAction(category));
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
    const cancelOrder = (order) => {
        dispatch(setOrder({...order, status: 'Cancelled'}))
    }

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
                leftIcon={icons.back}
                headerText={'Orders'}
                leftPress={() => navigation.goBack()}
                navigation={navigation}
            />
            <FlatList data={orders} renderItem={({item}) => <Order item={item} cancelOrder={cancelOrder}/>} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContainer}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: COLORS.lightGray4,
    },
    listContainer: {
        paddingTop: 15,
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30
    },
});
