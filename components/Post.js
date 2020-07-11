import * as React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useContext, useState} from "react";
import {Context as AuthContext} from "../context/AuthContext";




export default function Post(props) {
    const [isLiked, setLiked] = useState(false)
    const [post, setPost] = useState();
    const { state } = useContext(AuthContext)

    const formatDate = (date) =>{
        const dateTimeArray = date.split('T');
        const dateOfficial = dateTimeArray[0].split('-')
        const timeOfficial = dateTimeArray[1].substring(0,dateTimeArray[1].length-2);
        return `${dateOfficial[2]}/${dateOfficial[1]}/${dateOfficial[0]} - ${timeOfficial}:`
    }

    const LikePost = async () =>{
        const token = await AsyncStorage.getItem('auth_token');
        fetch('http://68.183.113.49:8000/posts/like/' + props.post._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
        })
            .then(res => res.json())
            .then(res => {
                setLiked(true)
                setPost(res)
            })
    }

    const DislikePost = async () =>{
        const token = await AsyncStorage.getItem('auth_token');
        fetch('http://68.183.113.49:8000/posts/dislike/' + props.post._id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
        })
            .then(res => res.json())
            .then(res => {
                setLiked(false)
                setPost(res)
            })
    }

    const CheckIfExistsInLiked = () => {
        if(post){
            return post.likes.indexOf(state.user) > -1

        }else{
            return props.post.likes.indexOf(state.user) > -1

        }
    }

    return (
        <View style={styles.container}>
            <View style={{width: !props.self ? 150 : 220}}>
            <Text style={{color: 'black', fontSize: 12}}>{props.post.user.name}</Text>
            <Text style={{fontSize: 10, color: 'gray'}}>{formatDate(props.post.createdAt)}</Text>
            <Text style={{fontSize: 18, color: 'black', marginBottom: 2}}>{props.post.text}</Text>
            <Text style={{fontSize: 10, color: 'black'}}>{!post ? props.post.likes.length : post.likes.length} hearts</Text>
            </View>
            {!props.self &&
            <View style={{width: 20}}>
                {isLiked || CheckIfExistsInLiked() ? <Icon onPress={() => DislikePost()} name="heart" size={20} color="#900" />: <Icon onPress={() => LikePost()} name="heart-outline" size={20} color="#900" />}
            </View>
            }
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
