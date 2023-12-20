import {Image, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {FONTS, SIZES} from "../../constants";

export const OrderItem = ({item}) => {
    return <View style={styles.orderItemContainer}>
        <View style={styles.itemWrapper}>
            <Image
                source={item.photo}
                resizeMode="cover"
                style={styles.itemImage}
            />
        </View>
        <View style={{flex: 1}}>
            <Text style={{...FONTS.h4, marginBottom: SIZES.padding * 5}}>{item.name}</Text>
            <View style={styles.orderItemPriceQuantityContainer}>
                <Text style={{...FONTS.body3, fontWeight: 'bold'}}>{`$${item.price}`}</Text>
                <Text style={{...FONTS.body3, fontWeight: 'bold'}}>{`Quantity: ${item.qty}`}</Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    orderItemContainer: {
        flexDirection: 'row',
    },
    orderItemPriceQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemWrapper: {
        marginBottom: SIZES.padding,
        marginRight: SIZES.padding,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: SIZES.radius,
    },
});