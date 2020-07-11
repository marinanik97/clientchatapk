import * as React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext, useState} from "react";
import {Context as AuthContext} from "../context/AuthContext";




export default function User(props) {
    const { state } = useContext(AuthContext)
    console.log(props);
    return (
        <View style={styles.container}>
            <Text>{props.user.name}</Text>
            <Icon name='message' color='black' onPress={() => props.onNavigationChange(props.user)} size={20}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F1F2EB',
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})
