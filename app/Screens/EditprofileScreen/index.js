import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity,TouchableHighlight,ActivityIndicator,Platform,Keyboard } from "react-native";
import {Avatar,BottomSheet,Divider} from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import {Item, Input, Label,Root,Toast} from "native-base";
import firebase from "firebase";
import Style from "./style.js";
export default function index() {
  const [profilepic, set_profilepic] = useState("");
  const [username,set_username]=useState("");
  const [checkusername,set_checkusername]=useState('');
  const [bottomsheetvisible, set_bottomsheetvisible] = useState(false);
  const [updateicondisable,set_updateicondisable]=useState(false);
  const [load, set_load] = useState(false);
  useEffect(()=>{
    (async () => {
      if (Platform.OS !== "web") {
        const {status,} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
    .onSnapshot((doc)=>{
        set_username(doc.data().username);
        set_profilepic(doc.data().profilepic);
        set_checkusername(doc.data().username);
    })
    
  },[])
  useEffect(()=>{
    username.length>0?set_updateicondisable(false):set_updateicondisable(true)
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
      set_bottomsheetvisible(false);
    }
  }
  
  const removeprofileiamge=()=>{
    firebase.firestore().collection("default_pic").doc("image").get()
    .then((doc)=>{
      set_profilepic(doc.data().image);
      set_bottomsheetvisible(false);
    })
  } 

  const makebottomsheetvisible=()=>{
    set_bottomsheetvisible(true);
  }

  const hidebottomsheet=()=>{
    set_bottomsheetvisible(false);
  }
  
  const updateprofile=()=>{
    Keyboard.dismiss();
    set_load(true);
    if (checkusername==username) {
      firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
      .update({
        "username":username,
        "profilepic":profilepic,
      })
      .then(()=>{
        Toast.show({text:"Successfully Updated",type:"success",position:"bottom",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
        set_load(false);    
      })
    }
    else{
      firebase.firestore().collection('Users').where('username','==',username).get()
      .then((doc)=>{
        if (doc.empty) {
          firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
          .update({
            "username":username,
            "profilepic":profilepic,
          })
          .then(()=>{
            Toast.show({text:"Successfully Updated",type:"success",position:"bottom",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
            set_load(false); 
          })
        }
        else{
          Toast.show({text:"Username Already Exists",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
          set_load(false);  
        }
      })
    }
  }

  return (
    <Root>
    <View style={Style.editprofilescreen}>        
      <View style={Style.header}>
        <View style={Style.row1}>
          <TouchableOpacity>
          <MaterialCommunityIcons size={27} name="arrow-left" style={Style.gobackicon} onPress={()=>{navigation.goBack();}}/>
          </TouchableOpacity>
          <Text style={Style.editprofiletext}>Editprofile</Text>
        </View>
        <View style={Style.row2}>
          <TouchableOpacity disabled={updateicondisable}>
            {load? 
            (<ActivityIndicator animating={load} size="large" color={"#FFF"} style={{marginRight:40}}/>) 
            : 
            (<MaterialCommunityIcons onPress={updateprofile} size={27} name="check" style={Style.updateicon}/>)
            }
          </TouchableOpacity>
        </View>
      </View>
      <View style={Style.editprofilecontainer}>
        <Avatar source={{uri:profilepic}} rounded size="xlarge"/>      
        <TouchableOpacity onPress={makebottomsheetvisible}>
          <Text style={Style.changeprofileimagetext} >Change profile image</Text>
        </TouchableOpacity>
        <Item floatingLabel style={{width:300,marginTop:20}} >
          <Label style={{marginLeft:5}}>Username</Label>
          <Input value={username} onChangeText={(text)=>{set_username(text)}}/>
        </Item>
      </View>
      <BottomSheet  isVisible={bottomsheetvisible}>
          <View style={Style.bottomsheettopcontainer}>
          </View>
          <View style={Style.bottomsheetnormalcontainer}>
             <TouchableOpacity style={{marginTop:14}} onPress={removeprofileiamge}>
                <Text style={Style.removeprofileimagetext}>Remove Profileimage</Text>
             </TouchableOpacity>
          </View>
          <Divider style={{backgroundColor:"#CECACA90"}}/>
          <View style={Style.bottomsheetnormalcontainer}>
             <TouchableOpacity style={{marginTop:14}} onPress={selectprofilepicfromgallery}>
                <Text style={Style.selectfromgallerytext}>Select Image From Gallery</Text>
             </TouchableOpacity>
          </View>
          <Divider style={{backgroundColor:"#CECACA90"}}/>
          <TouchableHighlight onPress={hidebottomsheet}>
           <View style={Style.bottomsheetcanceliconcontainer}>
             <MaterialCommunityIcons name="close" size={30} color="red" style={Style.cancelicon}/>
           </View>
          </TouchableHighlight>
      </BottomSheet>
    </View>
    </Root>
  );
}
