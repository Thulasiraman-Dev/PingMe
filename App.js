import { StatusBar } from "expo-status-bar";
import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import Login_screen from "./Screen/login_screen.js";
import Register_screen from "./Screen/register_screen.js";
import Profile_username_screen from "./Screen/profile_username_screen.js";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import Emailverify_screen from "./Screen/Emailverify_screen.js";
import Forgot_password_screen from './Screen/Forgot_password_screen.js';
import Main_screen from './Screen/Main_screen.js'

import firebase from "firebase";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
const Stack = createStackNavigator();
const Tab=createMaterialBottomTabNavigator();
var firebaseConfig = {
  apiKey: "AIzaSyBlOajhHTxdgG9CdUfY0TyqH9sFRfZ6tFU",
  authDomain: "pingme-reactnativeproject.firebaseapp.com",
  projectId: "pingme-reactnativeproject",
  storageBucket: "pingme-reactnativeproject.appspot.com",
  messagingSenderId: "917363407104",
  appId: "1:917363407104:web:a3a085f67546ef2c8fdbe5",
  measurementId: "G-QRW01XPM4D",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default function App() {
   const [loggedin,set_loggedin]=useState(false)
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
           if (user) {
             set_loggedin(true)
           } else {
             set_loggedin(false)
           }
        })
    },[])
    if (loggedin) {
      return(
      <NavigationContainer>
        <Stack.Navigator  >
           <Stack.Screen name='mainscreen' component={Main_screen} options={{headerShown:false}}/>
           
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
    else{
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="loginscreen"
              component={Login_screen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register_screen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Emailverify"
              component={Emailverify_screen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profilescreen"
              component={Profile_username_screen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Forgotpasswordscreen"
              component={Forgot_password_screen}
              options={{ headerShown: false }}
            />
    
    
          </Stack.Navigator>
        </NavigationContainer>
      );
    
    }
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
