import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Search_screen from '../Screen/Seacrh_screen.js'
import Feed_screen from '../Screen/Feed_screen.js'
import Search_profile_screen from '../Screen/Search_profile.js'
import Add_post_screen from '../Screen/Add_post_screen.js'
import { TextInput } from 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function Home_screen() {
  return (
   
      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
      }} initialRouteName='feedscreen'>
       
       <Stack.Screen name='feedscreen' component={Feed_screen} options={{headerShown:false}}/>  
       <Stack.Screen name='searchscreen' component={Search_screen} options={{headerShown:false}} />
       <Stack.Screen name='Addpostscreen' component={Add_post_screen} options={{headerShown:false}} />
       <Stack.Screen name='searchprofilescreen' component={Search_profile_screen} options={{headerShown:false}} />
       
      </Stack.Navigator>
 
  )
}

