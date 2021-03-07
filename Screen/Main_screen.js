import React from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import Home_screen from "../Screen/Home_screen.js";
import Chat_screen from "../Screen/Chat_screen.js";
import Activity_screen from "../Screen/Activity_screen.js";
import Profile_screen from "../Screen/Profile_screen.js";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderTitle } from "@react-navigation/stack";
const Tab = createMaterialBottomTabNavigator();
export default function Main_screen() {
  return (
    <Tab.Navigator initialRouteName={'Home'}
     activeColor={'#FFF'}
     inactiveColor={'#FFF'}
     barStyle={{backgroundColor:'#FFF'}}
     labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={Home_screen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
              name="home-outline" 
              color={'black'} 
              size={25} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat_screen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="send-outline"
              color={'black'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity_screen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
             name="bell-outline" 
             color={'black'} 
             size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile_screen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={'black'}
              size={25}
            />
          ),
        }}
        
      />
    </Tab.Navigator>
  );
}
