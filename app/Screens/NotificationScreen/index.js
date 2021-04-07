import React,{useEffect,useState} from "react";
import { View, Text ,TouchableOpacity,ScrollView} from "react-native";
import { Avatar,ListItem} from "react-native-elements";
import { Right } from "native-base";
import firebase from "firebase";
import Header from "../../Component/NotificationHeader/index.js";
import Style from "./style.js";

export default function index() {
  const [notifications,set_notifications]=useState([]);
  const [currentuserun,set_currentuserun]=useState("");
  const [currentuserpp,set_currentuserpp]=useState("");

  useEffect(()=>{
    firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid).collection("Notifications").orderBy("time","desc")
    .onSnapshot((doc)=>{
      let notification=doc.docs.map((docs)=>{
        return {
         type:docs.data().type,
         username:docs.data().username,
         profilepic:docs.data().profilepic,
         uid:docs.data().uid
        };
      });
      set_notifications(notification); 
    })

    firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid)
    .onSnapshot((doc)=>{
      set_currentuserun(doc.data().username);
      set_currentuserpp(doc.data().profilepic);
    })
  },[]);

  const acceptrequest=(un,pp,uid)=>{
    firebase.firestore().collection("Friends").doc(firebase.auth().currentUser.uid).collection("Friends").doc(uid)
    .set({
      username:un,
      profilepic:pp,
      uid:uid,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    });

    firebase.firestore().collection("Friends").doc(uid).collection("Friends").doc(firebase.auth().currentUser.uid)
    .set({
      username:currentuserun,
      profilepic:currentuserpp,
      uid:firebase.auth().currentUser.uid,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    });

    firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid).collection("Notifications").doc(uid)
    .update({
      profilepic:firebase.firestore.FieldValue.delete(),
      username:firebase.firestore.FieldValue.delete(),
      uid:firebase.firestore.FieldValue.delete(),
      type:firebase.firestore.FieldValue.delete(),
      time:firebase.firestore.FieldValue.delete(),
      date:firebase.firestore.FieldValue.delete(),
    })

    firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid).collection("Notifications").doc(uid)
    .set({
      profilepic:pp,
      username:un,
      uid:uid,
      type:3,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    });

    firebase.firestore().collection("Friends").doc(uid).collection("Requests").doc(firebase.auth().currentUser.uid)
    .update({uid:firebase.firestore.FieldValue.delete()});
    
    firebase.firestore().collection("Notifications").doc(uid).collection("Notifications").doc(firebase.auth().currentUser.uid)
    .set({
      profilepic:currentuserpp,
      username:currentuserun,
      uid:firebase.auth().currentUser.uid,
      type:2,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    })

    firebase.firestore().collection("Notifications").doc(uid).update(
      {notifications:firebase.firestore.FieldValue.increment(1)}
    );

    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").doc(uid)
    .set({
      username:un,
      profilepic:pp,
      uid:uid,
      friends:"yes",
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    })

    firebase.firestore().collection("Chats").doc(uid).collection("Chats").doc(firebase.auth().currentUser.uid)
    .set({
      username:currentuserun,
      profilepic:currentuserpp,
      uid:firebase.auth().currentUser.uid,
      friends:"yes",
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()
    })
  }
  
  const denyrequest=(un,pp,uid)=>{
    firebase.firestore().collection("Friends").doc(uid).collection("Requests").doc(firebase.auth().currentUser.uid)
    .update({uid:firebase.firestore.FieldValue.delete()});

    firebase.firestore().collection("Notifications").doc(firebase.auth().currentUser.uid).collection("Notifications").doc(uid)
    .update({
      profilepic:firebase.firestore.FieldValue.delete(),
      username:firebase.firestore.FieldValue.delete(),
      uid:firebase.firestore.FieldValue.delete(),
      type:firebase.firestore.FieldValue.delete(),
      time:firebase.firestore.FieldValue.delete(),
      date:firebase.firestore.FieldValue.delete(),
    })
  }
  return (
    <View style={Style.notificationscreen}>
      <Header />
      <View style={{marginBottom:3}}></View>
      <ScrollView>
      {notifications.map((l,i)=>{
            if (l.type==1) {
              return(
                <ListItem key={l.uid} style={{marginTop:-3}}>
                <Avatar rounded size="large" source={{uri:l.profilepic}} style={{width:55,height:55}}/>
                <ListItem.Content>
                  <ListItem.Title style={{fontWeight:"bold",fontSize:15}}>
                    {l.username} 
                  </ListItem.Title>
                  <ListItem.Title style={{fontSize:15}}>
                    Has sent Friend request 
                  </ListItem.Title>
                </ListItem.Content>
                <Right>
                <View style={{flexDirection:"row"}}>
                      <TouchableOpacity onPress={()=>{acceptrequest(l.username,l.profilepic,l.uid)}} style={{backgroundColor:"#6767FF",width:50,borderRadius:50,height:40}}>
                        <Text style={{color:"white",textAlign:"center",marginTop:6,fontWeight:'bold',fontSize:17}}>👍</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{denyrequest(l.username,l.profilepic,l.uid)}} style={{backgroundColor:"#6767FF",width:50,borderRadius:50,height:40,marginLeft:10}}>
                        <Text style={{color:"white",textAlign:"center",marginTop:8,fontWeight:'bold',fontSize:17}}>👎</Text>
                      </TouchableOpacity>
                </View>
            </Right>
          </ListItem>)
          }
          if (l.type==2) {
            return(
            <ListItem key={l.uid} style={{marginTop:-3}}>
            <Avatar rounded size="large" source={{uri:l.profilepic}} style={{width:55,height:55}}/>
            <ListItem.Content>
               <ListItem.Title style={{fontSize:15}}>
                  {<Text style={{fontWeight:"bold",fontSize:15}}>{l.username}</Text>} has accepted your Friend request.
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>)  
          }
          if (l.type==3) {
            return(
            <ListItem key={l.uid} style={{marginTop:-3}}>
            <Avatar rounded size="large" source={{uri:l.profilepic}} style={{width:55,height:55}}/>
            <ListItem.Content>
              <ListItem.Title style={{fontSize:15}}>
                 You added {<Text style={{fontWeight:"bold",fontSize:15}}>{l.username}</Text>} as your Friend.
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>)
          }
      })}
      </ScrollView>
    </View>
  );
}
