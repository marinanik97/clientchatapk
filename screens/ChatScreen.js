import React, {useContext, useEffect, useState} from "react";
import {AsyncStorage, ScrollView, StyleSheet, View, Image, Text} from 'react-native';
import Post from '../components/Post'
import {Context as AuthContext} from "../context/AuthContext";
import TextInput from "react-native-web/src/exports/TextInput";
import {Button} from "react-native-elements";
import Message from "../components/Message";


export default function ChatScreen({navigation, route}) {
    const {state, LogIn} = useContext(AuthContext)
    const [user, setUser] = useState({...route.params?.user})
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    let interval = {};

    useEffect( () =>{
         return navigation.addListener('focus', () => {
            getMessages();

         });

    }, [navigation])

    const sendMessage = async () => {
        const messageObj = {
            text: message,
            user: user._id
        }
        const token = await AsyncStorage.getItem('auth_token');
        fetch('http://68.183.113.49:8000/messages/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(messageObj)
        })
            .then((res) => {
                if(res.ok){
                    console.log('sent');
                    setMessage('');
                }else{
                    console.log(res);
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getMessages = async () =>{
        const token = await AsyncStorage.getItem('auth_token');
        global.interval = setInterval( () =>{
            fetch('http://68.183.113.49:8000/messages/' +user._id, {
                headers: {
                    'Authorization' : token
                }})
                .then(res => res.json())
                .then(res => setMessages(res))
        }, 2000)
    }

    const renderMessages = () =>{
        if(messages){
            return messages.map((message) =>{
                return <Message message={message}/>
            })
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <View style={styles.labelname}>
                <Text style={{ fontSize:15}}>{user.name}</Text>
            </View>
            <ScrollView style={styles.messagesContainer}>
                {renderMessages()}
            </ScrollView>

                <TextInput onChangeText={(text) => setMessage(text)}
                           value={message} style={{width: '100%' ,
                    borderWidth: 1,
                    textAlignVertical: 'top',
                    borderColor: '#F1F2EB',
                    padding: 20,
                    borderRadius: 5,
                    backgroundColor: "#bbced1",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                    marginTop:10,
                    marginBottom: 10}}/>

            <View style={styles.actionContainer}>
                <Button onPress={() => setMessage('')} type='outline' buttonStyle={{marginLeft: 10, color: 'red', backgroundColor:"white"}} title='Cancel'/>
                <Button onPress={() => sendMessage()} type='outline' containerStyle={[{ backgroundColor: 'white' }]} title='Apply'/>
            </View>
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

    },
    labelname: {
        width: 100,
        height: 100,
        borderRadius: 100/4,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor:"#bbced1",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,


    },
    messagesContainer: {
        maxHeight: 200,
        width: '100%',
        flex:1,
    },
    textInputContainer: {
        //styles.textInputContainer
        borderWidth: 1, textAlignVertical: 'top', borderColor: '#F1F2EB', padding: 20, borderRadius: 5, backgroundColor: "#bbced1",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    actionContainer:{
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    }
})
