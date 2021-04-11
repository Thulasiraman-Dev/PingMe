import React, { useEffect,useState } from "react";
import { View, Text } from "react-native";
import {Avatar,Badge,ListItem,Divider} from "react-native-elements";
import {Left,Right,List,Thumbnail,Body} from "native-base";
import {useNavigation} from "@react-navigation/native";
import firebase from "firebase";
import Style from "./style.js";
export default function index() {
  const [chatlist,set_chatlist]=useState([]);
  
  const navigation=useNavigation();
  useEffect(()=>{
    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").orderBy("lastmsgtime","desc")
    .onSnapshot((doc)=>{
      let chatlist=doc.docs.map((docs)=>{
        return {
         username:docs.data().username,
         profilepic:docs.data().profilepic,
         uid:docs.data().uid,
         friends:docs.data().friends,
         newchat:docs.data().newchat,
         lastmsgtime:docs.data().lastmsgtime,
         lastmsgdate:docs.data().lastmsgdate,
         lastmsg:docs.data().lastmsg,
        };
      });
      set_chatlist(chatlist);
    })
    
  },[])

  return (
    <View>
      <View>
         {chatlist.map((l,i)=>(
           <ListItem  key={l.uid} style={{height:80}} onPress={()=>{navigation.navigate("chatscreen",{uid:l.uid,pp:l.profilepic,un:l.username,fr:l.friends}) }}>
           <Avatar rounded size="large" source={{uri:l.profilepic}} style={{width:57,height:57,marginTop:-5,marginLeft:-7}}/>
           <ListItem.Content>
           <ListItem.Title>
               {l.newchat>0?
               <Text style={{fontWeight:"bold",color:"black"}}>{l.username}</Text>
               :
               <Text style={{color:"black"}}>{l.username}</Text>
               }
           </ListItem.Title>
           <ListItem.Subtitle numberOfLines={1} style={l.newchat>0?{width:200,fontWeight:"bold",color:"black"}:{width:200}}>
              {l.lastmsg}
             
           </ListItem.Subtitle>
           
           </ListItem.Content>
           <Right >
              <Text style={{fontSize:11,color:"grey"}}>{l.lastmsgdate}</Text>
              {l.newchat>0?
              <Badge containerStyle={{marginTop:4}} value={l.newchat} badgeStyle={{backgroundColor:"#6767FF",borderColor:"#6767FF"}}/>
              :
              null}
           </Right>
         </ListItem>
         ))}
      </View>
    </View>
  );
}
