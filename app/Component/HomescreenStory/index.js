import React from "react";
import { View, Text , ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import Style from "./style.js";
export default function index() {
  return (
    <View>
      {/* <View style={Style.story}>
        <Text style={Style.storytext}>Story</Text>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <View style={Style.storycontainer}>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/tr.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/profilepic.png")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Raamsedhu</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/dhoni.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/image1.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/sk.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/image3.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/tr.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
          <View style={Style.storybox}>
            <Avatar rounded size="xlarge" source={require("../../assets/tr.jpg")} style={Style.storyprofilepic}/>
            <Text numberOfLines={1} style={Style.storyusername}>Thulasiraman</Text>
          </View>
         </View>
         </ScrollView>
      </View> */}
    </View>
  );
}
