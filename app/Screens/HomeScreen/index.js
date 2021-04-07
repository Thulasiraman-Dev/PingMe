import React,{useEffect,useState} from "react";
import { View, Text ,StatusBar } from "react-native";
import {Fab} from "native-base";
import Header from "../../Component/HomescreenHeader/index.js"
import Story from "../../Component/HomescreenStory/index.js";
import Chatlist from "../../Component/HomescreenChatlist/index.js";
import Style from "./style.js"
export default function index({navigation}) {
  return (
    <View style={Style.homescreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />       
      <Header/>
      {/* <Story/> */}
      <Chatlist/>
    </View>
  );
}
