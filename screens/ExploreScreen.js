import React, {useContext, useEffect, useState} from "react";
import {AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import Post from '../components/Post'
import {Context as AuthContext} from "../context/AuthContext";
import User from "../components/User";


export default function ExploreScreen({navigation}) {
    const {state, LogIn} = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const [navigationChange, onNavigationChange] = useState();

    if(navigationChange){
        navigation.navigate('Chat Screen', {user: navigationChange});
        onNavigationChange('');
    }

    useEffect( () =>{
        return navigation.addListener('focus', () => {
            fetchUsers();
        });

    }, [navigation])

    const fetchUsers = async () =>{
        const token = await AsyncStorage.getItem('auth_token');
        fetch('http://68.183.113.49:8000/users', {
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => setUsers(res))
    }

    const renderContent = () =>{
        if(users){
            console.log(users);
            return users.map((user, index) =>{
                return <User user={user} onNavigationChange={onNavigationChange}/>
            })
        }
    }

    return(
        <ScrollView style={styles.container}>
            {renderContent()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4a676c',
        padding: 30,
    }
})
