import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LogInScreen from "../screens/LogInScreen";
import NewsFeedScreen from "../screens/NewsFeedScreen";
import {useContext, useState, useEffect} from "react";
import {AsyncStorage, Text, View} from "react-native";
import {Button} from 'react-native-elements';

import {Context as AuthContext} from "../context/AuthContext";
import LinksScreen from "../screens/LinksScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import {navigationRef} from "./RootNavigation";
import NewPostScreen from "../screens/NewPostScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ExploreScreen from "../screens/ExploreScreen";
import ChatScreen from "../screens/ChatScreen";
import {color} from "react-native-reanimated";


const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const NewsFeedStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const LogOut = async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('id');
}


const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{title: "Log in", headerTintColor:"#4a676c"}}
        />
        <AuthStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{title: "Sign up",headerTintColor:"#4a676c"}}
        />
    </AuthStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => LogOut()}
                            title="LogOut"
                            color="#000"
                            buttonStyle={{height: 30, marginRight: 10}}
                            titleStyle={{fontSize: 12,color:"#4a676c"}}
                        />
                    ),
                }}
            />
            <ProfileStack.Screen name="News feed" component={NewsFeedScreen}/>
            <ProfileStack.Screen name="Explore" component={ExploreScreen}/>
            <ProfileStack.Screen name="New Post" component={NewPostScreen}/>

        </ProfileStack.Navigator>
    );
}

const ExploreStackScreen = () => (
    <ExploreStack.Navigator>
        <ExploreStack.Screen name="Explore" options={{headerTintColor:"#4a676c"}} component={ExploreScreen}/>
        <ExploreStack.Screen name="News feed" component={NewsFeedScreen}/>
        <ExploreStack.Screen name="Profile" component={ProfileScreen}/>
    </ExploreStack.Navigator>
);

const NewsFeedStackScreen = ({navigation}) => (
    <NewsFeedStack.Navigator>
        <NewsFeedStack.Screen name="News feed"
                              options={{
                                  headerRight: () => (
                                      <View style={{width: 200, flexDirection: 'row'}}>
                                          <Button
                                              onPress={() => navigation.navigate('New Post')}
                                              type='outline'
                                              title="Add post"
                                              color="#000"
                                              buttonStyle={{height: 30, marginRight: 10, width: 75}}
                                              titleStyle={{fontSize: 12}}
                                          />
                                          <Button
                                              onPress={async () => {
                                                  await AsyncStorage.removeItem('auth_token');
                                                  await AsyncStorage.removeItem('id');
                                                  window.location.reload(false);
                                              }}
                                              type='outline'
                                              title="Log out"
                                              color="#000"
                                              buttonStyle={{height: 30, marginRight: 10, width: 75}}
                                              titleStyle={{fontSize: 12}}
                                          />
                                      </View>
                                  ),
                                  headerTintColor:"#4a676c",

                              }} component={NewsFeedScreen}/>
        <NewsFeedStack.Screen name="Profile" component={ProfileScreen}/>
        <NewsFeedStack.Screen name="New Post" options={{headerTintColor:"#4a676c"}} component={NewPostScreen}/>
        <NewsFeedStack.Screen name="Explore" component={ExploreScreen}/>
        <NewsFeedStack.Screen name="Chat Screen" options={{headerTintColor:"#4a676c"}} component={ChatScreen}/>

    </NewsFeedStack.Navigator>
);

const TabsScreen = () => (
    <Tabs.Navigator tabBarOptions={{

        activeBackgroundColor: '#bbced1',
    }}>
        <Tabs.Screen name="News feed"
                     options={{
                         tabBarIcon: () =>
                             <Icon name='newspaper' color="#4a676c" size={30}/>
                     }}
                     component={NewsFeedStackScreen}/>
        <Tabs.Screen
            name="Profile"
            options={{
                tabBarIcon: () =>
                    <Icon name='face-profile' color="#4a676c" size={30}/>
            }}
            component={ProfileScreen}/>
        <Tabs.Screen
            name="Explore"
            options={{
                tabBarIcon: () =>
                    <Icon name='magnify' color="#4a676c" size={30}/>
            }}
            component={ExploreStackScreen}/>
    </Tabs.Navigator>
);

export default function RootStackNavigator() {
    const {state} = useContext(AuthContext)
    const [isLoading, setLoading] = useState(true);

    const GetFromAsyncStorage = async () => {
        await AsyncStorage.getItem('auth_token').then((token) => {
            state.isAuth = !!token;
        });
        await AsyncStorage.getItem('id').then((id) => {
            state.user = id;
        });
    }

    useEffect(async () => {
        await GetFromAsyncStorage();
        setLoading(false);

    }, [])

    if (isLoading) {
        return <View>
            <Text>Loading...</Text>
        </View>
    }


    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator headerMode="none">
                {!state.isAuth &&
                <RootStack.Screen name='Auth' component={AuthStackScreen}/>
                }
                <RootStack.Screen name='News feed' component={TabsScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
