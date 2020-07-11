import * as React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext, useState} from "react";
import {Context as AuthContext} from "../context/AuthContext";




export default function Message(props) {
    const { state } = useContext(AuthContext)

    const formatDate = (date) =>{
        const dateTimeArray = date.split('T');
        const dateOfficial = dateTimeArray[0].split('-')
        const timeOfficial = dateTimeArray[1].substring(0,dateTimeArray[1].length-2);
        return `${dateOfficial[2]}/${dateOfficial[1]}/${dateOfficial[0]} - ${timeOfficial}:`
    }

    return (
        <View style={styles.container}>
            <View style={{width: '100%'}}>
                <Text style={{color: 'black', fontSize: 12}}>{props.message.userSender.name}</Text>
                <Text style={{fontSize: 10, color: 'gray'}}>{formatDate(props.message.createdAt)}</Text>
                <Text style={{fontSize: 18, color: 'black', marginBottom: 2}}>{props.message.text}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F2EB',
        borderRadius: 5,
        marginBottom: 10,
        padding: 5,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
        
    }
})
