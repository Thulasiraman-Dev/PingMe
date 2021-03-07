import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  useWindowDimensions
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
  Tab,
  Tabs,
  TabHeading,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Overlay, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
export default function Add_post_screen({ navigation }) {
    const [image, setImage] = useState("");
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
              const {
                status,
              } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
              }
            }
          })();
    }, [])
    const select_image = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [8,3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      }; 
  return (
    <View style={{ flex: 1 ,backgroundColor:'#FFF'}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 12,
          backgroundColor: "#FFF",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color={"black"}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: 2,
                color: "black",
              }}
            >
              Add post
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     
    
      <Avatar
        source={image==''?require('../assets/profile_image.png'):{uri:image}}
       style={{height:250}}
       onPress={select_image}
       imageProps={{resizeMode:'center'}}
         
      />

    
      <Container >
          <Tabs
            tabBarUnderlineStyle={{
              borderBottomWidth: 2,
              borderBottomColor: "#E8E8E890",
            }}
            tabContainerStyle={{ elevation: 0 }}
            style={{}}
          >
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#FFF" }}>
                  <MaterialCommunityIcons
                    name="grid"
                    size={25}
                    color={"#6A6A6A"}
                  />
                </TabHeading>
              }
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#FFF" }}>
                  <MaterialCommunityIcons
                    name="image"
                    size={25}
                    color={"#6A6A6A"}
                  />
                </TabHeading>
              }
            >
              <Text>home3</Text>
            </Tab>
          </Tabs>
        </Container>
    
    </View>
  );
}
