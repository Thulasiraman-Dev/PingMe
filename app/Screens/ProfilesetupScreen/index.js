import React,{useEffect,useState} from "react";
import { View, Text ,TextInput,TouchableOpacity,Platform,Keyboard,ActivityIndicator} from "react-native";
import {Avatar} from "react-native-elements";
import {Root,Toast} from "native-base";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Style from "./style.js";

export default function index({route}) {
  const [username,set_username]=useState("");
  const [buttondisable, set_buttondisable] = useState(true);
  const [load, set_load] = useState(false);
  const [profilepic,set_profilepic]=useState("");

  useEffect(()=>{
    const ref = firebase.storage().ref("pingme_default_profilepic/profile_image.png");
    ref.getDownloadURL().then((url) => {
      set_profilepic(url);
    }).catch((error) => {
      alert(error);
    });
      username.length>0?set_buttondisable(false):set_buttondisable(true);
      (async () => {
        if (Platform.OS !== "web") {
          const {status,} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
  },[username])

  const selectprofilepicfromgallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      set_profilepic(result.uri);
    }
  }

  const navigatetomainscreen=()=>{
    Keyboard.dismiss();
    set_load(true);
    firebase.firestore().collection("Users").where("username","==",username).get()
    .then((doc)=>{
      if(doc.empty){
        firebase.auth().createUserWithEmailAndPassword(route.params.email,route.params.password)
        .then((user)=>{
          firebase.firestore().collection("Users").doc(user.user.uid).set({
            email:route.params.email,
            uid:user.user.uid,
            profilepic:profilepic,
            username:username
          });
          firebase.firestore().collection("Notifications").doc(user.user.uid).set({
            notifications:0
          });
          firebase.firestore().collection("Friends").doc(user.user.uid).set({
            friends:0
          });
          firebase.firestore().collection("Chats").doc(user.user.uid).set({
            chats:0
          });
          set_load(false);
        })
      }
      else{
        Toast.show({text:"Username Already Exists",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
        set_load(false); 
      }
    })
  }

  return (
    <Root>
    <View style={Style.profilesetupscreen}>
      <Text style={Style.profilesetuptext}>Profile Setup</Text>
      <Text style={Style.descriptiontext}>Choose a username and profile profilepic for your account.You can change it later.</Text>
      <Avatar onPress={selectprofilepicfromgallery} rounded size="xlarge" style={Style.profilepic} source={profilepic==""?require("../../assets/profilepic.png"):{ uri: profilepic }}/>   
      <TextInput placeholder="Username" style={Style.textinput} placeholderTextColor="#8F8F8F" value={username} onChangeText={(text)=>{set_username(text);}} autoCapitalize="none"/>
      <TouchableOpacity onPress={navigatetomainscreen} style={buttondisable ? Style.buttondisable : Style.button}disabled={buttondisable}>
         {load? 
         (<ActivityIndicator animating={load} size="large" color={"#FFF"} style={{ marginTop: 2 }}/>) 
         : 
         (<Text style={Style.buttontext}>Next</Text>)
         }
      </TouchableOpacity>
    </View>
    </Root>
  );
}
