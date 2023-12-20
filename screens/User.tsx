import React, {useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {RootTabParamList} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {initialCurrentLocation,} from '../mock-data';
import {useDispatch} from "react-redux";
import {launchImageLibrary} from "react-native-image-picker";
import {AppStyles} from "../AppStyles";

type HomeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    'Home'
>;

type UserScreenProps = {
    navigation: HomeScreenNavigationProp;
};

export const UserScreen = ({navigation}: UserScreenProps) => {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);
    const [inputs, setInputs] = useState({
        nme: {
            value: 'Your name',
            label: 'Name',
            focus: false,
        },
        email: {
            value: '',
            label: 'Email',
            focus: false,
        },
        address: {
            value: '',
            label: 'Address',
            focus: false,
        },
        phoneNumber: {
            value: '',
            label: 'Phone Number',
            focus: false,
        }
    });

    const renderItem = ({item: key}) => {
        const input = inputs[key];
        return (
            <TouchableOpacity onPress={() => {
                setInputs({...inputs, [key]: {...input, focus: true}})
            }} key={key} style={{flex: 1, marginHorizontal: 10}}>
                <Text style={{...FONTS.body4, color: COLORS.darkgray}}>{input.label}</Text>
                <View style={AppStyles.inputContainer}>
                    <TextInput
                        onFocus={() => setInputs({...inputs, [key]: {...input, focus: true}})}
                        onBlur={() => setInputs({...inputs, [key]: {...input, focus: false}})}
                        style={input.focus ? styles.input: styles.text}
                        placeholder={input.label}
                        placeholderTextColor={COLORS.darkgray}
                        value={input.value}
                        onChangeText={(text) => setInputs({...inputs, [key]: {...input, value: text}})}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <TouchableOpacity
                    onPress={() => launchImageLibrary({
                        includeBase64: false,
                        mediaType: 'photo',
                        selectionLimit: 1
                    }, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled camera');
                        } else if (response.errorCode) {
                            console.log('Camera Error: ', response.errorMessage);
                        } else {
                            let imageUri = response.assets?.[0]?.uri;
                            setAvatar(imageUri);
                            console.log(imageUri);
                        }
                    })}
                    style={styles.avatar}
                >
                    {avatar ? <Image source={{uri: avatar}} style={styles.img}/>
                        : <Text style={{...FONTS.body4, color: COLORS.darkgray}}>Upload avatar</Text>
                    }
                </TouchableOpacity>
            </View>
            <FlatList
                data={Object.keys(inputs)}
                keyExtractor={(item) => item}
                removeClippedSubviews={false}
                renderItem={renderItem}
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
    avatarContainer: {
        width: SIZES.width,
        height: 150,
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 50,
    },
    inputsContainer: {
        width: SIZES.width,
        height: 400,
        flexDirection: 'column',
        borderRadius: 50,
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: COLORS.black,
        borderColor: COLORS.primary,
    },
    text: {
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 10,
        color: COLORS.black,
    },
});
