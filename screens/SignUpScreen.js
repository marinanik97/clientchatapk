import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const { state, SignUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState();



  const sendUser = async () => {
    const userObj = {
      name: name,
      age: age,
      gender: gender,
      password: password,
      email: email,
    };
    fetch("http://68.183.113.49:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then(async (res) => {
        if (res.status == 400) {
          return res.json();

        }
        if (res.ok) {
          console.log(res);
          navigation.navigate("LogIn");
          console.log("SUCCESS");
        } else {
          console.log(res);
        }
      })
      .then((res) =>{
        if(res && res.errors && res.errors.email){
          setError("Wrong email format")
        }
        if(res && res.errors && res.errors.age){
          setError("Age wrong format")
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{color:"white", fontWeight:"bold"}}>Name:</Text>
      <TextInput style={styles.inputField} onChangeText={setName} />
      <Text style={{color:"white", fontWeight:"bold"}}>Age:</Text>
      <TextInput style={styles.inputField} onChangeText={setAge} />
      <Text style={{color:"white", fontWeight:"bold"}}>Gender:</Text>
      <TextInput style={styles.inputField} onChangeText={setGender} />
      <Text style={{color:"white", fontWeight:"bold"}}>Username:</Text>
      <TextInput style={styles.inputField} onChangeText={setUsername} />
      <Text style={{color:"white", fontWeight:"bold"}}>Email:</Text>
      <TextInput style={styles.inputField} onChangeText={setEmail} />
      <Text style={{color:"white", fontWeight:"bold"}}>Password:</Text>
      <TextInput style={styles.inputField} onChangeText={setPassword} secureTextEntry={true}      />
      <Button type="outline" title="Sign up"  buttonStyle={styles.buttonSignUp} titleStyle={{
          fontSize: 12,
          fontWeight: "bold",

      }}onPress={() => sendUser({name, age, gender, username, email, password})}/>

      {/* zasto ovde ne radi style za Text */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4a676c",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  inputField: {
    width: "30%",
    margin: 10,
      marginBottom: 20,
      lineHeight: 30,
      paddingLeft: 10,
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
  buttonSignUp: {
      backgroundColor: '#132c30',


}
});
