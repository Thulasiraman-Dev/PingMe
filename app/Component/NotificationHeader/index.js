import React from "react";
import { View, Text , TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Style from "./style.js";

export default function index() {
  const navigation=useNavigation();
  return (
    <View style={Style.header}>
        <MaterialCommunityIcons size={27} name="arrow-left" style={Style.gobackicon} onPress={()=>{navigation.goBack();}}/>
        <Text style={Style.notificationstext}>Notifications</Text>
    </View>
  );
}
