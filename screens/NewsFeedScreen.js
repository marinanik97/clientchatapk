import React, {useContext, useEffect, useState} from "react";
import {AsyncStorage, ScrollView, StyleSheet} from 'react-native';
import Post from '../components/Post'
import {Context as AuthContext} from "../context/AuthContext";
import Button from "react-native-web/dist/exports/Button";


export default function NewsFeedScreen({navigation}) {
    const {state, LogIn} = useContext(AuthContext)
    const [posts, setPosts] = useState([]);


    useEffect( () =>{
        return navigation.addListener('focus', () => {
            fetchPosts();
            clearInterval(global.interval)
        });

    }, [navigation])

    const fetchPosts = async () =>{
        const token = await AsyncStorage.getItem('auth_token');
        fetch('http://68.183.113.49:8000/posts', {
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => setPosts(res.reverse()))
    }

    const renderContent = () =>{
        if(posts){
            return posts.map((post, index) =>{
                return <Post key={"_" + Math.random()} post={post}/>
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
        padding: 50
    }
})
