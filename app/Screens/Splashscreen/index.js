import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Style from "./style.js";

export default function index({ navigation }) {
  const [time, set_time] = useState(5);

  const timer = () => {
    setInterval(() => set_time(time - 1), 1000);
  };

  const timeout = () => {
    navigation.navigate("loginscreen");
  };

  useEffect(() => {
    time > 0 ? timer() : timeout();
  }, [time]);

  return (
    <View style={Style.splashscreen}>
      <StatusBar barStyle="light-content" backgroundColor="#6767FF" />
      <MaterialCommunityIcons
        name="bell-ring-outline"
        size={60}
        style={Style.icon}
      />
      <Text style={Style.pingmetext}>PingMe</Text>
    </View>
  );
}
