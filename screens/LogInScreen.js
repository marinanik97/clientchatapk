import React, { useState, useContext } from "react";
import { Text, TextInput, View, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from "../context/AuthContext";



export default function LogInScreen({navigation}) {
    const {state, LogIn} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if(state.isAuth){
        navigation.navigate('News feed')
    }

  return(
      <View style={styles.container}>
          <Text style={styles.labels}>Email</Text>
        <TextInput
            onChangeText={setEmail}
            style={styles.textInput}/>
        <Text style={styles.labels}>Password</Text>
        <TextInput
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.textInput}/>
        <Button
            titleStyle={{
                fontSize: 12,
                fontWeight: "bold",

            }}
            buttonStyle={styles.button}
            type='outline'
            onPress={() => LogIn({email, password})}
            title='Log in'/>
            {state.errorMessage ? <Text style={styles.error}>{state.errorMessage}</Text> : null}
            <Text style={{color:"white"}} onPress={() => navigation.navigate('SignUp')}>If you dont't have account, please sign up</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4a676c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,

    },
    textInput: {
        marginBottom: 20,
        paddingLeft: 10,
        width: '40%',
        height: 30,
        borderWidth: 1,
        textAlignVertical: 'center',
        borderColor: '#F1F2EB',
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

    },
    labels: {
        marginBottom: 5,
        color:"white",
        fontWeight:"bold"
    },
    button: {
        margin: 10,
        width: 70,
        height: 50,
        backgroundColor: '#132c30',

    },
    error: {
        color: 'red',
        fontSize: 10
    }
})
