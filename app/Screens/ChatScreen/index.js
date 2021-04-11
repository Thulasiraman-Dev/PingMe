import React,{useEffect,useState} from "react";
import {View,Text,SafeAreaView,StatusBar,TouchableHighlight,TouchableOpacity,ScrollView,TextInput,Image,KeyboardAvoidingView,Platform} from "react-native";
import { Avatar ,ListItem,Overlay} from "react-native-elements";
import {Right,Left} from "native-base";
import {Video} from "expo-av";
import * as ImagePicker from "expo-image-picker";
import {useNavigation,useRoute} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons.js";
import firebase from "firebase";
import Style from "./style.js";
import { Keyboard } from "react-native";
export default function index({route}) {
  
  const navigation=useNavigation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const scrollViewRef = React.useRef();
  const [msg,set_msg]=React.useState(null);
  const [messagelist,set_messagelist]=useState([]);
  const [visible, setVisible] = useState(false);
  const [val,set_val]=useState("");
  const [image, set_image] = useState("");
  const chatusername=route.params.un;
  const chatprofilepic=route.params.pp;
  const chatuid=route.params.uid;
 
  useEffect(()=>{
    set_msg(msg);
  },[msg])

  useEffect(()=>{
    (async () => {
      if (Platform.OS !== "web") {
        const {status,} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").doc(chatuid).collection("messages").orderBy("time","asc")
    .onSnapshot((doc)=>{
      let messagelist=doc.docs.map((docs)=>{
         return{
          message:docs.data().message,
          uid:docs.data().uid,
          time:docs.data().time,
          date:docs.data().date,
          messagetype:docs.data().messagetype
         }
      })
      set_messagelist(messagelist)
    })
    
  },[])

  //  function toggleOverlay (tex)  {
  //   set_val(tex);
  //   setVisible(!visible);
   
  // };
  const sendmessage=()=>{
     firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").doc(chatuid).collection("messages")
     .add({
       messagetype:2,
       uid:firebase.auth().currentUser.uid,
       time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
       date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear(),
       message:msg,
       
     })
     firebase.firestore().collection("Chats").doc(chatuid).collection("Chats").doc(firebase.auth().currentUser.uid).collection("messages")
     .add({
       messagetype:2,
       uid:firebase.auth().currentUser.uid,
       time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
       date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear(),
       message:msg,
     })
     set_msg(null);
  }
  const sendphoto=()=>{
    
  }
  const selectimagefromgallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
    firebase.firestore().collection("Chats").doc(firebase.auth().currentUser.uid).collection("Chats").doc(chatuid).collection("messages")
    .add({
      messagetype:3,
      uid:firebase.auth().currentUser.uid,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear(),
      message:result.uri,
      
    })
    firebase.firestore().collection("Chats").doc(chatuid).collection("Chats").doc(firebase.auth().currentUser.uid).collection("messages")
    .add({
      messagetype:3,
      uid:firebase.auth().currentUser.uid,
      time:new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(),
      date:new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear(),
      message:result.uri,
    })
      
    }
  }
  const movetoend=()=>{
    scrollViewRef.current.scrollToEnd({animated:false})
  }
  return (
    <SafeAreaView style={Style.chatscreen}>
      <StatusBar backgroundColor="#6767FF" barStyle="light-content" />
      <View style={Style.header}>
        <View style={Style.row1}>
          <MaterialCommunityIcons size={27} name="arrow-left" style={Style.arrowlefticon}/>
          <TouchableOpacity>
            <Avatar rounded size="xlarge" source={{uri:chatprofilepic}} style={Style.profilepic}/>
          </TouchableOpacity>
          <Text style={Style.usernametext}>{chatusername}</Text>
        </View>
        <View style={Style.row2}></View>
      </View>
      <View />
      <KeyboardAvoidingView enabled behavior={Platform.OS=="ios"?"padding":"height"} keyboardVerticalOffset={80}   style={Style.messagebox} >
         <>
         <ScrollView  ref={scrollViewRef} style={{backgroundColor:"#FFF"}} onContentSizeChange={movetoend}>
           {messagelist.map((l,i)=>{
               if(l.messagetype==1)
               {
                return( 
                <ListItem key={l.uid} containerStyle={{backgroundColor:"transparent"}}>
                  
                  <ListItem.Content style={{alignItems:"center"}} >
                    <ListItem.Title>
                      <Text style={{fontSize:14,color:"grey"}}>{l.message}</Text> 
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>)
               }
               else if(l.messagetype==2)
               {
                if (l.uid==firebase.auth().currentUser.uid) {
                  return(
                   <ListItem containerStyle={{backgroundColor:"transparent",height:55}}>
                     <Right>
                     <ListItem.Content style={{marginLeft:50}}>
                        <ListItem.Title style={{backgroundColor:"#6767FF",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                         <Text  style={{fontSize:15,color:"#FFF"}}>{l.message}</Text>
                        </ListItem.Title>  
                     </ListItem.Content>
                     </Right>  
                   </ListItem> 
                   )
                }
                else{
                 return(
                 <ListItem containerStyle={{backgroundColor:"transparent",height:60}}>
                 <Avatar rounded size="small" source={{uri:chatprofilepic}} /> 
                 <Left>
                 <ListItem.Content style={{marginRight:50}}> 
                   <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                    <Text style={{fontSize:15}}>{l.message}</Text> 
                   </ListItem.Title>
                 </ListItem.Content>
                 </Left>
                 </ListItem>)
                }
              }
              else if(l.messagetype==3)
              {
               if (l.uid==firebase.auth().currentUser.uid) {
                 return(
                  <ListItem containerStyle={{backgroundColor:"transparent"}}>
                    <Right>
                      <ListItem.Content >
                         <Image source={{uri:l.message}} resizeMode="cover"   style={{height:240,width:190,borderRadius:20}}/>       
                      </ListItem.Content>
                    </Right>
                  </ListItem>
                  )
               }
               else{
                return(
                  <ListItem containerStyle={{backgroundColor:"transparent"}}>
                    <Avatar rounded size="small" source={{uri:chatprofilepic}} />   
                    <Left>
                    <ListItem.Content >
                      <Image   source={{uri:l.message}}  resizeMode="cover"  style={{height:240,width:190,borderRadius:20}}/>       
                    </ListItem.Content>
                    </Left>
                  </ListItem>
           
                )
               }
             }
              
           })}
  
           
          
           {/* <ListItem containerStyle={{backgroundColor:"transparent",marginTop:-20}}>
           <Right>
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#6767FF",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15,color:"#FFF"}}>Send me a photo</Text> 
                 
               </ListItem.Title>
               
             </ListItem.Content>
           </Right>  
           </ListItem> */}
           
           {/* <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Right>
             <ListItem.Content >
             <Video
        ref={video}
        style={{width:270,height:200,borderRadius:10,borderColor: "#CECACA90",borderWidth:1}}
        source={require("../../assets/videoplayback.mp4")}
        
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> 
              
             </ListItem.Content>
             
             </Right>
            
           </ListItem> */}
           {/* <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15}}>Dei exam ku paduchutiya</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </ListItem> */}
           {/* <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content>
               <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15}}>Dei call me</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </ListItem> */}
         </ScrollView> 
         
         
         </>
        
         </KeyboardAvoidingView> 
         
         <View  style={{width:"100%",flexDirection:"row",alignItems:"center",padding:4}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("addstoryscreen")}} style={{backgroundColor:"#6767FF",padding:8,marginRight:3,borderRadius:50,borderColor:"#6767FF",borderWidth:1}}>
        <MaterialCommunityIcons name="camera" size={23} style={{color:"#FFF"}}/>
      </TouchableOpacity>
      <TextInput  editable={route.params.fr=="yes"?true:false} multiline={true} value={msg} onChangeText={(text)=>{set_msg(text)}} placeholder="Type a message ...." style={Style.textinput}/>
      <TouchableOpacity style={{backgroundColor:"#E8E8E890",padding:11,borderBottomRightRadius:25,borderTopRightRadius:25}}>
      {msg==null?
        <MaterialCommunityIcons name="folder-image" size={23} style={{color:"#6767FF",marginRight:4}} onPress={selectimagefromgallery}/>
        :
        <MaterialCommunityIcons name="send" size={23} style={{color:"#6767FF",marginRight:4}} onPress={sendmessage}/>
      } 
      </TouchableOpacity>
     
      </View>
      
      {/* <Overlay isVisible={visible} overlayStyle={{backgroundColor:"black"}} onBackdropPress={toggleOverlay}>
        
        <Image source={require("../../assets/dhoni.jpg")} style={{flex:1}} resizeMode="center"  />
        <Video
        ref={video}
        style={{flex:1,width:350}}
        source={require("../../assets/videoplayback.mp4")}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> 
       </Overlay> */}
      
    </SafeAreaView>
  );
}
