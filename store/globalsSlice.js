import {createSlice} from "@reduxjs/toolkit";
import {categoryData, restaurantsWithCategories} from "../mock-data";

const initialState = {
    categories: categoryData,
    selectedCategory: null,
    restaurants: restaurantsWithCategories,
    orders: [],
};

export const categorySlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;
        },
        toggleLikeRestaurant: (state, action) => {
            const restaurantId = action.payload;
            const restaurant = state.restaurants.find((restaurant) => restaurant.id === restaurantId);
            if (restaurant) {
                restaurant.liked = !restaurant.liked;
            }
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        createOrder: (state, action) => {
            console.log('order items are', action.payload.orderItems)
            const total = action.payload.orderItems.reduce((acc, item) => acc + item.total, 0);
            state.orders.push({...action.payload, id: state.orders.length, total});
            console.log('created order:', state.orders)
        },
        setOrder: (state, action) => {
            state.orders[state.orders.findIndex(order  => order.id === action.payload.id)] = action.payload;
        },
    },
});

export const {setRestaurants, toggleLikeRestaurant, setSelectedCategory, createOrder, setOrder} = categorySlice.actions;

export default categorySlice.reducer;
