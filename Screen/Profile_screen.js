import React, { useEffect, useState, useLayoutEffect } from "react";
import {Text} from 'react-native'
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack'
import Currentuser_profile_screen from './Currentuser_profile_screen.js'
import Edit_profile_screen from './Edit_profile.js'
const stack=createStackNavigator();
export default function Profile_screen({ navigation }) {
  return (
    <stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forNoAnimation}}>
      <stack.Screen name='currentuserprofilescreen' component={Currentuser_profile_screen} options={{headerShown:false}}/>
      <stack.Screen name='editprofilescreen' component={Edit_profile_screen} options={{headerShown:false}}/>
    </stack.Navigator>
  );
}
