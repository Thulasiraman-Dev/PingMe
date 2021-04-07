import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";

import Splashscreen from "../Screens/Splashscreen/index.js";
import Loginscreen from "../Screens/LoginScreen/index.js";
import Forgotpasswordscreen from "../Screens/ForgotpasswordScreen/index.js";
import Registerscreen from "../Screens/RegisterScreen/index.js";
import Profilesetupscreen from "../Screens/ProfilesetupScreen/index.js";

const Stack = createStackNavigator();

export default function UserNotloggedIn() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginscreen" screenOptions={{headerShown:false,cardStyleInterpolator:CardStyleInterpolators.forNoAnimation}}  >
        {/* <Stack.Screen name="splashscreen" component={Splashscreen} /> */}
        <Stack.Screen name="loginscreen" component={Loginscreen} />
        <Stack.Screen name="forgotpasswordscreen" component={Forgotpasswordscreen} /> 
        <Stack.Screen name="registerscreen" component={Registerscreen} />
        <Stack.Screen name="profilesetupscreen" component={Profilesetupscreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
