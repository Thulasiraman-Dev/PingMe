import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay, Avatar } from "react-native-elements";
export default function Home_screen({ navigation }) {
  const [username, setusername] = useState(0);
  const [showmore,set_showmore]=useState(false)
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 12,
          backgroundColor: "#FFF",
        }}
      >
         <TouchableOpacity onPress={()=>{navigation.navigate('Addpostscreen')}}>
        <View style={{ flexDirection: "row" }}>
         
          <MaterialCommunityIcons name="plus-circle-outline" size={30} color={"black"} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 5,
              marginTop: 2,
              color: "black",
            }}
          >
            Home
          </Text>
        </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
        
            onPress={() => {
              navigation.navigate("searchscreen");
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              style={{ marginRight: 10 }}
              color={"black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Card transparent style={{ marginTop: -2 }}>
          <CardItem
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Avatar
                source={require("../assets/tr.jpg")}
                rounded
                style={{ width: 35, height: 35, marginLeft: -7 }}
                size="medium"
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 7,
                }}
              >
                Thulasiraman
              </Text>
            </View>
            <MaterialCommunityIcons name="dots-vertical" size={22} />
          </CardItem>
          <CardItem cardBody>
            <Avatar
              source={require("../assets/tr.jpg")}
              style={{ flex: 1, height: 300 }}
              imageProps={{resizeMode:'center'}}
                
            />
          </CardItem>
          <CardItem
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              {showmore?
                 <TouchableOpacity onPress={()=>{set_showmore(false)}}>
                    <MaterialCommunityIcons name="heart" size={32} color="red" />
                 </TouchableOpacity>:<TouchableOpacity onPress={()=>{set_showmore(true)}}>
                    <MaterialCommunityIcons name="heart-outline" size={32} color="black" />
                 </TouchableOpacity>
              }
             
              <TouchableOpacity>
                <Text
                  style={{
                    marginTop: 4,
                    marginLeft: 3,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  110 Likes
                </Text>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons name="share-outline" size={30} />
          </CardItem>
          <CardItem>
            <Text style={{fontSize:15,marginTop:-8,marginLeft:4,color:'black'}}>The greatest glory in living lies not</Text>
          </CardItem>
          <CardItem>
            <Text style={{fontSize:15,marginTop:-8,marginLeft:4,color:'#6767FF',fontWeight:'bold'}}>View Comments</Text>
          </CardItem>
        </Card>
        <Card transparent style={{ marginTop: -2 }}>
          <CardItem
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Avatar
                source={require("../assets/tr.jpg")}
                rounded
                style={{ width: 35, height: 35, marginLeft: -7 }}
                size="medium"
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 7,
                }}
              >
                Thulasiraman
              </Text>
            </View>
            <MaterialCommunityIcons name="dots-vertical" size={22} />
          </CardItem>
          <CardItem cardBody>
            <Avatar
              source={require("../assets/image3.jpg")}
              style={{ flex: 1, height: 250 }}
              imageProps={{resizeMode:'cover'}}
            />
          </CardItem>
          <CardItem
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              {showmore?
                 <TouchableOpacity onPress={()=>{set_showmore(false)}}>
                    <MaterialCommunityIcons name="heart" size={30} color="red" />
                 </TouchableOpacity>:<TouchableOpacity onPress={()=>{set_showmore(true)}}>
                    <MaterialCommunityIcons name="heart-outline" size={30} color="black" />
                 </TouchableOpacity>
              }
             
              <TouchableOpacity>
                <Text
                  style={{
                    marginTop: 6,
                    marginLeft: 3,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  110 Likes
                </Text>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons name="share-outline" size={30} />
          </CardItem>
          <CardItem>
            <Text style={{fontSize:15,marginTop:-8,marginLeft:4,color:'black'}}>The greatest glory in living lies not</Text>
          </CardItem>
          <CardItem>
            <Text style={{fontSize:15,marginTop:-8,marginLeft:4,color:'#6767FF',fontWeight:'bold'}}>View Comments</Text>
          </CardItem>
        </Card>
        
      </ScrollView>
    </View>
  );
}
