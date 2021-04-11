import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import "react-native-gesture-handler";

import Homescreen from "../Screens/HomeScreen/index.js";
import Editprofilescreen from "../Screens/EditprofileScreen/index.js";
import Searchscreen from "../Screens/SearchScreen/index.js";
import Notificationscreen from "../Screens/NotificationScreen/index.js";
import Addstoryscreen from "../Screens/AddstoryScreen/index.js";
import Chatscreen from "../Screens/ChatScreen/index.js";

const Stack = createStackNavigator();

export default function UserloggedIn() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homescreen" screenOptions={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forNoAnimation}}>
        <Stack.Screen name="homescreen" component={Homescreen} />
        <Stack.Screen name="chatscreen" component={Chatscreen}/>
        <Stack.Screen name="editprofilescreen" component={Editprofilescreen} />
        <Stack.Screen name="searchscreen" component={Searchscreen} />
        <Stack.Screen name="notificationscreen" component={Notificationscreen}/>
        <Stack.Screen name="addstoryscreen" component={Addstoryscreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
