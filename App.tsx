import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './navigation/tabs';
import {RestaurantScreen} from './screens';
import {Provider} from "react-redux";
import {store} from "./store";
import {OrderScreen} from "./screens/Order";

const Stack = createStackNavigator();

export const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName={"Home"}
                >
                    <Stack.Screen name="Home" component={Tabs}/>
                    <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
                    <Stack.Screen name="Order" component={OrderScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};
