import React,{useEffect,useState} from "react";
import { View, Text ,StatusBar, TouchableOpacity ,TouchableHighlight ,SafeAreaView} from "react-native";
import { Avatar,BottomSheet,Divider,Badge } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import Style from "./style.js";
export default function index(props) {
  const navigation=useNavigation();
  const [bottomsheetvisible, set_bottomsheetvisible] = useState(false);
  const [username,set_username]=useState("");
  const [profilepic,set_profilepic]=useState("");
  const [notificationnum,set_notificationnum]=useState();
  useEffect(()=>{
     firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
     .onSnapshot((doc)=>{
        set_username(doc.data().username);
        set_profilepic(doc.data().profilepic);
     })

     firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid)
     .onSnapshot((doc)=>{
       set_notificationnum(doc.data().notifications);
     })
  },[])
 
  const makebottomsheetvisible=()=>{
   set_bottomsheetvisible(true);
  }

  const hidebottomsheet=()=>{
    set_bottomsheetvisible(false);
  }

  const navigatetonotificationscreen=()=>{
    navigation.navigate("notificationscreen");
    firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid)
    .update({notifications:0});
  }
  
  return (
    <SafeAreaView style={Style.header}>
      <StatusBar backgroundColor="#6767FF" barStyle="light-content"/>
      <View style={Style.row1}>
        <TouchableOpacity>       
         <Avatar rounded size="xlarge" source={{uri:profilepic}} style={Style.profilepic} onPress={makebottomsheetvisible} />
        </TouchableOpacity>
        <Text style={Style.pingmetext}>PingMe</Text>
      </View>
      <View style={Style.row2}>
        <TouchableOpacity onPress={navigatetonotificationscreen}>       
         <MaterialCommunityIcons size={27} name="bell-outline" style={Style.bellicon}/>
        </TouchableOpacity>
        {notificationnum==0?null:
        <Badge value={notificationnum} textStyle={{color:"#FFF",fontWeight:"bold"}} badgeStyle={{position:"absolute",top:-15,left:-13,borderColor:"red",backgroundColor:"red"}} />}
        <TouchableOpacity onPress={()=>{navigation.navigate("addstoryscreen")}}>
         <MaterialCommunityIcons size={27} name="plus" style={Style.plusicon}/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("searchscreen"),{username:username,profilepic:profilepic}}}>
         <MaterialCommunityIcons size={27} name="magnify" style={Style.searchicon}/>
        </TouchableOpacity>
      </View>
      <BottomSheet  isVisible={bottomsheetvisible}>
          <View style={Style.bottomsheettopcontainer}>
          </View>
          <View style={Style.bottomsheetprofilecontainer}>
            <Avatar rounded size="xlarge" source={{uri:profilepic}} style={Style.bottomsheetprofilepic}/>
            <Text style={Style.bottomsheetusername}>{username}</Text>
          </View>
          <Divider style={{backgroundColor:"#CECACA90"}}/>
          <View style={Style.bottomsheetnormalcontainer}>
             <TouchableOpacity style={{marginTop:14}} onPress={()=>{alert("friend")}}>
                <Text style={Style.friendstext}>Friends</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{marginTop:14}} onPress={()=>{navigation.navigate("editprofilescreen"),set_bottomsheetvisible(false)}}>
                <Text style={Style.edittext}>Edit profile</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{marginTop:14}} onPress={()=>{firebase.auth().signOut(),set_bottomsheetvisible(false)}}>
                <Text style={Style.logouttext}>Logout</Text>
             </TouchableOpacity>
             
          </View>
          <Divider style={{backgroundColor:"#CECACA90"}}/>
          <TouchableHighlight onPress={hidebottomsheet}>
           <View style={Style.bottomsheetcanceliconcontainer}>
             <MaterialCommunityIcons name="close" size={30} color="red" style={Style.cancelicon}/>
           </View>
          </TouchableHighlight>
      </BottomSheet>
    </SafeAreaView>
  );
}
