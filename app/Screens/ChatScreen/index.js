import React,{useEffect,useState} from "react";
import {View,Text,SafeAreaView,StatusBar,TouchableOpacity,ScrollView,TextInput,Image,KeyboardAvoidingView} from "react-native";
import { Avatar ,ListItem,Overlay} from "react-native-elements";
import {Right} from "native-base";
import {Video} from "expo-av";
import {useNavigation} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons.js";
import Style from "./style.js";
export default function index() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const scrollViewRef = React.useRef();
  const [msg,set_msg]=React.useState("");
  const [visible, setVisible] = useState(false);
  const [val,set_val]=useState("");
 
  const navigation=useNavigation();
  useEffect(()=>{
     set_msg(msg);
  },[msg])
   function toggleOverlay (tex)  {
    set_val(tex);
    setVisible(!visible);
   
  };

  return (
    <SafeAreaView style={Style.chatscreen}>
      <StatusBar backgroundColor="#6767FF" barStyle="light-content" />
      <View style={Style.header}>
        <View style={Style.row1}>
          <MaterialCommunityIcons size={27} name="arrow-left" style={Style.arrowlefticon}/>
          <TouchableOpacity>
            <Avatar rounded size="xlarge" source={require("../../assets/tr.jpg")} style={Style.profilepic}/>
          </TouchableOpacity>
          <Text style={Style.usernametext}>Raamsedhu</Text>
        </View>
        <View style={Style.row2}></View>
      </View>
      
      <KeyboardAvoidingView  style={Style.messagebox} >
      
         <ScrollView  ref={scrollViewRef} style={{backgroundColor:"#FFF"}}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15}}>Dei exam ku paduchutiya</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent",marginTop:-20}}>
           <Right>
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#6767FF",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15,color:"#FFF"}}>illa</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </Right>  
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent",marginTop:-20}}>
           <Right>
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#6767FF",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15,color:"#FFF"}}>Send me a photo</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </Right>  
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content >
                 <Avatar onPress={()=>{toggleOverlay("../../assets/tr.jpg")}} rounded source={require("../../assets/tr.jpg")}  resizeMode="cover" style={{height:240,width:190,borderRadius:20}}/>       
             </ListItem.Content>
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Right>
             <ListItem.Content >
                 <Image  source={require("../../assets/image3.jpg")}  resizeMode="cover" style={{height:200,width:150,borderRadius:20,borderColor: "#CECACA90",borderWidth:1}}/>       
             </ListItem.Content>
             </Right>
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
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
              {/* <MaterialCommunityIcons onPress={()=>{alert("video")}} name="play-circle" size={70} style={{color:"#FFF",position:"absolute",marginTop:100,marginLeft:40}}/> */}
             </ListItem.Content>
             
             </Right>
            
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content >
               <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15}}>Dei exam ku paduchutiya</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </ListItem>
           <ListItem containerStyle={{backgroundColor:"transparent"}}>
             <Avatar rounded size="small" source={require("../../assets/tr.jpg")} />   
             <ListItem.Content>
               <ListItem.Title style={{backgroundColor:"#E8E8E890",padding:10,borderRadius:20,borderColor: "#CECACA90",marginLeft:-10}}>
                <Text style={{fontSize:15}}>Dei call me</Text> 
               </ListItem.Title>
             </ListItem.Content>
           </ListItem>
         </ScrollView>  
         </KeyboardAvoidingView>
      <View style={{width:"100%",flexDirection:"row",alignItems:"center",shadowColor:"#FFF",shadowOffset:{width:0,height:5},shadowOpacity:1,shadowRadius:2,elevation:10}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("addstoryscreen")}} style={{backgroundColor:"#E8E8E890",padding:14,marginLeft:1}}>
        <MaterialCommunityIcons name="camera" size={23} style={{color:"#6767FF"}}/>
      </TouchableOpacity>
      <TextInput multiline={true} onChangeText={(text)=>{set_msg(text)}} placeholder="Type a message ...." style={Style.textinput}/>
      <TouchableOpacity style={{backgroundColor:"#E8E8E890",padding:14}}>
      {msg==""?
        <MaterialCommunityIcons name="folder-image" size={23} style={{color:"#6767FF"}}/>
        :
        <MaterialCommunityIcons name="send" size={23} style={{color:"#6767FF"}}/>
      } 
      </TouchableOpacity>
      {/* <TouchableOpacity style={{position:"absolute",marginLeft:280}}>
        <MaterialCommunityIcons name="folder-image" size={23} style={{color:"grey"}}/>
      </TouchableOpacity> */}
     
      </View>
      <Overlay isVisible={visible} overlayStyle={{backgroundColor:"black"}} onBackdropPress={toggleOverlay}>
        
        {/* <Image source={require("../../assets/dhoni.jpg")} style={{flex:1}} resizeMode="center"  /> */}
        <Video
        ref={video}
        style={{flex:1,width:350}}
        source={require("../../assets/videoplayback.mp4")}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> 
       </Overlay>
      
    </SafeAreaView>
  );
}
