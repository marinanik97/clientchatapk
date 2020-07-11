import React, {useContext, useEffect, useState} from "react";
import {AsyncStorage, ScrollView, StyleSheet, View, Image, Text} from 'react-native';
import Post from '../components/Post'
import {Context as AuthContext} from "../context/AuthContext";
import { LinearGradient } from 'expo';


export default function NewsFeedScreen({navigation}) {
  const {state, LogIn} = useContext(AuthContext)
  const [user, setUser] = useState([]);


  useEffect( () =>{
    return navigation.addListener('focus', () => {
      fetchUserData();
      clearInterval(global.interval)
    });

  }, [navigation])

  const fetchUserData = async () =>{
    const token = await AsyncStorage.getItem('auth_token');
    fetch('http://68.183.113.49:8000/users/me', {
      headers: {
        "Authorization": token
      }
    })
        .then(res => res.json())
        .then(res => setUser(res))
  }

  const renderPosts = () =>{
    if(user && user.posts)
      if(user.posts.length !== 0)
      return user.posts.reverse().map((post, index) =>{
        return <Post post={post} self={true} key={"_"+index}/>
      })
    else
      return <Text style={{color: 'rgba(0,0,0,0.2)', fontSize: 35, marginTop: 30}}>Empty. Make your first post</Text>
  }

  return(
      <ScrollView style={styles.container}>
          <View >
            <Image style={{width: 200, height: 200, marginBottom: 30}} source={user.img}/>
          </View>
          <View style={{
            backgroundColor:"#bbced1",
            shadowColor: "#fff",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            padding:30,

            elevation: 5}}>
            <Text style={{fontSize: 20, fontWeight:"bold",color:"#4a676c",marginBottom:10}}>User Info: </Text>
          <View style={{ backgroundColor:"#a1b8bb",padding:10, borderStyle:"solid"}}>
            <Text style={{height:30}}><text style={{fontWeight:"bold" }}>Name:     </text>{user.name}</Text>
            <Text style={{height:30}}><text style={{fontWeight:"bold"}}>Email:     </text>{user.email}</Text>
            <Text style={{height:30}}><text style={{fontWeight:"bold"}}>Age:        </text>{user.age}</Text>
            <Text style={{height:30}}><text style={{fontWeight:"bold"}}>Gender:  </text>{user.gender}</Text>
          </View>
            <Text style={{marginTop: 30, fontSize: 20, fontWeight:"bold",color:"#4a676c",marginBottom:10}}>Posts: </Text>
            {renderPosts()}


          </View>
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
