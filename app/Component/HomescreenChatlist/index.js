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
    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").orderBy("time","desc")
    .onSnapshot((doc)=>{
      let chatlist=doc.docs.map((docs)=>{
        return {
         username:docs.data().username,
         profilepic:docs.data().profilepic,
         uid:docs.data().uid,
         friends:docs.data().friends,
         chat:docs.data().chats
        };
      });
      set_chatlist(chatlist)
    })

    
  },[])
  return (
    <View>
      <View>
         {chatlist.map((l,i)=>(
           <ListItem  key={l.uid} style={{height:80}} onPress={()=>{navigation.navigate("chatscreen")}}>
           <Avatar rounded size="large" source={{uri:l.profilepic}} style={{width:57,height:57,marginTop:-7,marginLeft:-7}}/>
           <ListItem.Content>
           <ListItem.Title>
               <Text style={{fontWeight:"bold",color:"black"}}>{l.username}</Text>
           </ListItem.Title>
           <ListItem.Subtitle>
              <Text style={{fontSize:13,color:"black"}}>Send HI 👋</Text>
           </ListItem.Subtitle>
           
           </ListItem.Content>
           <Right>
              <Text style={{fontSize:11,color:"grey"}}>3:04 PM</Text>
              {l.chat>0?<Badge value={l.chat} badgeStyle={{backgroundColor:"#6767FF",borderColor:"#6767FF"}}/>:null}
           </Right>
            
         </ListItem>  
           
         ))}
        
         {/* <ListItem style={{height:75}}>
           <Avatar rounded size="large" source={require("../../assets/image3.jpg")} style={{width:57,height:57,marginTop:-7,marginLeft:-8}}/>
           <ListItem.Content>
             <ListItem.Title>
                <Text>Raamsedhu</Text>
             </ListItem.Title>
             <ListItem.Subtitle>
                <Text>Dei call me da</Text>
              </ListItem.Subtitle>
           </ListItem.Content>
           <Right>
              <Text>3:04 PM</Text>
              <Badge value="100" />
           </Right>
         </ListItem>  
          */}
      </View>
    </View>
  );
}
