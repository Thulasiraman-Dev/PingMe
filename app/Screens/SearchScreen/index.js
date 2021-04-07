import React,{useEffect,useState} from "react";
import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,TouchableHighlight } from "react-native";
import { SearchBar,ListItem,Avatar,BottomSheet } from "react-native-elements";
import firebase from "firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Style from "./style.js";
export default function index({route}) {
  const [username, set_username] = useState("");
  const [searchlist, set_searchlist] = useState([]);
  const [bottomsheetvisible, set_bottomsheetvisible] = useState(false);
  const [searchuserun,set_searchuserun]=useState("");
  const [searchuserpp,set_searchuserpp]=useState("");
  const [searchuseruid,set_searchuseruid]=useState("");
  const [searchuserst,set_searchuserst]=useState("");
  const [load,set_load]=useState("");
  const [currentuserun,set_currentuserun]=useState("");
  const [currentuserpp,set_currentuserpp]=useState("");

  useEffect(()=>{
    firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
    .onSnapshot((doc)=>{
      set_currentuserun(doc.data().username);
      set_currentuserpp(doc.data().profilepic);
    })
    
  },[])
  
  const searchuser=(searchtext)=>{
    firebase .firestore().collection("Users").where("username", ">=", searchtext).get()
    .then((doc) => {
      let user = doc.docs.map((docs) => {
        return {
          username: docs.data().username,
          profilepic: docs.data().profilepic,
          uid: docs.data().uid,
        };
      });
      set_searchlist(user);
    });
  }

  const makebottomsheetvisible=(un,pp,uid)=>{
    if(uid!=firebase.auth().currentUser.uid){
    set_load(true);
    set_bottomsheetvisible(true);
    set_searchuserun(un);
    set_searchuserpp(pp);
    set_searchuseruid(uid);
    firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Requests").where("uid","==",uid)
    .onSnapshot((doc)=>{
      if(doc.empty){
        firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Friends").where("uid","==",uid)
        .onSnapshot((doc)=>{
          if(doc.empty){
            set_searchuserst("");
            set_load(false);
          }
          else{
            set_searchuserst("friends");
            set_load(false);
          }
        })
      }
      else{
        set_searchuserst("requested");
        set_load(false);
      }
    })
  } 
  }
 
  const hidebottomsheet=()=>{
    set_bottomsheetvisible(false);
  }

  const addasfriendbutton=()=>{
    firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Requests").doc(searchuseruid)
    .set({uid:searchuseruid});

    firebase.firestore().collection("Notifications").doc(searchuseruid).collection("Notifications").doc(firebase.auth().currentUser.uid)
    .set({
      profilepic:currentuserpp,
      username:currentuserun,
      uid:firebase.auth().currentUser.uid,
      type:1,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    })

    firebase.firestore().collection("Notifications").doc(searchuseruid).update(
      {notifications:firebase.firestore.FieldValue.increment(1)}
    );
  }

  const requestbutton=()=>{
    firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Requests").doc(searchuseruid)
    .update({uid:firebase.firestore.FieldValue.delete()});

    firebase.firestore().collection("Notifications").doc(searchuseruid).collection("Notifications").doc(firebase.auth().currentUser.uid)
    .update({
      profilepic:firebase.firestore.FieldValue.delete(),
      username:firebase.firestore.FieldValue.delete(),
      uid:firebase.firestore.FieldValue.delete(),
      type:firebase.firestore.FieldValue.delete(),
      time:firebase.firestore.FieldValue.delete(),
      date:firebase.firestore.FieldValue.delete(),
    })
  }

  const removeasfriend=()=>{
    
    firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Friends").doc(searchuseruid)
    .update({
      profilepic:firebase.firestore.FieldValue.delete(),
      username:firebase.firestore.FieldValue.delete(),
      uid:firebase.firestore.FieldValue.delete(),
      time:firebase.firestore.FieldValue.delete(),
      date:firebase.firestore.FieldValue.delete(),
    })

    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").doc(searchuseruid)
    .update({friends:"no"})

  }

  return (
    <View style={Style.searchscreen}>
      <SearchBar placeholder="Search Here..." containerStyle={Style.inputcontainer} inputContainerStyle={Style.inputtextcontainer} inputStyle={Style.inputfont} value={username} onChangeText={(searchtext)=>{searchuser(searchtext),set_username(searchtext)}}/>
      {username.length>0?<Text style={{marginLeft:15,fontSize:14,marginTop:10,marginBottom:5,fontWeight:"bold"}}>Searching {username} ....</Text>:null}
      {username.length>0?
      (
        <View>
        {searchlist.map((l,i)=>(
          <ListItem style={{height:70}} key={l.uid} onPress={()=>{makebottomsheetvisible(l.username,l.profilepic,l.uid)}}>
          <Avatar rounded size="large" style={{width:55,height:55,marginLeft:-5,marginTop:-7}} source={{uri:l.profilepic}}/>
          <ListItem.Content >
            <ListItem.Title style={{fontSize:16,fontWeight:"900",marginTop:-9}}>{l.username}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        ))}
        </View>
        
      )
      :null}
      <BottomSheet  isVisible={bottomsheetvisible}>
        <View style={Style.bottomsheettopcontainer}>
          </View>
          {load?
          <View style={Style.bottomsheetnormalcontainer}>
            <ActivityIndicator size="large" animating={load} color="#6767FF" style={{marginBottom:3}}/>
          </View>
          :
          <View style={Style.bottomsheetprofilecontainer}>
            <Avatar rounded size="xlarge" source={{uri:searchuserpp}} style={Style.bottomsheetprofilepic}/>
            <Text style={Style.bottomsheetusername}>{searchuserun}</Text>
            {searchuserst=="requested"?
            <TouchableOpacity style={Style.requestbutton} onPress={requestbutton}>
             <Text style={Style.requestedtext}>Requested</Text>
             </TouchableOpacity>
            :
            searchuserst=="friends"?
            <TouchableOpacity style={Style.unfollowbutton} onPress={removeasfriend}>
             <Text style={Style.removeasfriendtext}>Remove as Friend</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={Style.followbutton} onPress={addasfriendbutton}>
             <Text style={Style.addasfriendtext}>Add as Friend</Text>
            </TouchableOpacity>
            }
          </View>
          }
          <TouchableHighlight onPress={hidebottomsheet}>
           <View style={Style.bottomsheetcanceliconcontainer}>
             <MaterialCommunityIcons name="close" size={30} color="red" style={Style.cancelicon}/>
           </View>
          </TouchableHighlight>
      </BottomSheet>
    </View>
  );
}
