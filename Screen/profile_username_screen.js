import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput,Image,TouchableOpacity,Platform,Keyboard,ActivityIndicator} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { Toast, Root } from "native-base";
export default function profile_username_screen({ navigation, route }) {
  const [image, setImage] = useState("");
  const [username, set_username] = useState("");
  const [button_disable, set_button_disable] = useState(true);
  const [spinner_animation, set_spinner_animation] = useState(false);
  useEffect(() => {
    const ref = firebase
      .storage()
      .ref("pingme_default_profilepic/profile_image.png");
    ref
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        alert(error);
      });
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
  }, []);
  useEffect(() => {
    username.length > 0 ? set_button_disable(false) : set_button_disable(true);
  }, [username]);

  const select_image = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const move_to_email_verify=()=>{
    Keyboard.dismiss();
    set_spinner_animation(true);
    firebase.firestore().collection('users').where('username','==',username).get()
    .then((doc)=>{
        if (doc.empty) {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              username:username,
              uid:firebase.auth().currentUser.uid,
              privateaccount:false,
              profileimage:image
          })
        navigation.replace("Emailverify", { email:route.params.email,password:route.params.password});
        }
        else{
          Toast.show({
            text: "Username already exists",
            textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
            type:'danger',
            position:'top',
            duration:10000
          })
          set_spinner_animation(false)
        }
    })
    
  }
  return (
    <Root>
    <View style={styles.login_cont_style}>
      <Text style={{ fontSize: 21, fontWeight: "bold" ,marginBottom:20}}>
          Profile Setup
      </Text>
      <Text style={{ fontSize: 15,textAlign:"center",color: "#6A6A6A",marginBottom:20,paddingHorizontal:30}}>
          Choose a username and profile image for your account.You can change it later.
      </Text>
      <Avatar
        rounded
        source={image==''?require('../assets/profile_image.png'):{uri:image}}
        size="xlarge"
        onPress={select_image}
        style={{width:120,height:120}}
      />
      <TextInput
        placeholder={"Username"}
        style={styles.text_input_style}
        placeholderTextColor="#8F8F8F"
        value={username}
        onChangeText={(text) => {
          set_username(text);
        }}
      />
      <TouchableOpacity
        style={
          button_disable ? styles.button_style_overlay : styles.button_style
        }
        disabled={button_disable}
        onPress={move_to_email_verify}
      >
      {spinner_animation ? (
            <ActivityIndicator
              spinner_animation={spinner_animation}
              color={"#FFF"}
              size="large"
              style={{ marginTop: 2 }}
            />
          ) : (
            <Text style={styles.button_text_style}>
              Next
            </Text>
          )}
      </TouchableOpacity>   
    </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  login_cont_style: {
    flex: 1,
    justifyContent:'center',
    alignItems: "center",
  },
  text_input_style: {
    width: 270,
    height: 50,
    marginTop: 20,
    borderColor: "#CECACA",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "#E8E8E8",
    paddingLeft: 10,
    fontSize:15
  },
  button_style: {
    backgroundColor: "#6767FF",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  },
  button_style_overlay: {
    backgroundColor: "#6767FF99",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  },
  button_text_style: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 9,
  },
});
