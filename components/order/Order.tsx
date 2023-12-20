import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import {COLORS, FONTS, SIZES} from "../../constants";
import {OrderItem} from "./OrderItem";

export const Order = ({item, cancelOrder}) => {
    return <View style={styles.orderContainer}>
        <View style={styles.headerContainer}>
            <Text style={FONTS.h3}>{item.restaurant?.name}</Text>
            <Text style={{...FONTS.body4, color: COLORS.primary}}>{item.status}</Text>
        </View>
        <View>
            <FlatList data={item.orderItems} renderItem={OrderItem}/>
        </View>
        <View style={styles.footerContainer}>
            <View style={styles.totalPriceContainer}>
                <Text style={{...FONTS.body3, paddingRight: SIZES.padding}}>{`Total (${item.orderItems?.length} dish/es):`}</Text>
                <Text style={{...FONTS.body3, fontWeight: 'bold'}}>{`$${item.total}`}</Text>
            </View>
            {item.status === 'Pending' && <TouchableOpacity style={styles.cancelButton} onPress={() => cancelOrder(item)}>
                <Text style={{color: COLORS.primary}}>Cancel</Text>
            </TouchableOpacity>}
        </View>
    </View>
}

const styles = StyleSheet.create({
    orderContainer: {
        marginBottom: SIZES.padding * 2,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    footerContainer: {
    },
    totalPriceContainer: {
        alignSelf: 'flex-end',
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.padding
    },
    cancelButton: {
        alignSelf: 'flex-end',
        width: SIZES.width * 0.2,
        height: 40,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius / 1.5,
        borderWidth: 1,
        borderColor: COLORS.primary,
    }
});