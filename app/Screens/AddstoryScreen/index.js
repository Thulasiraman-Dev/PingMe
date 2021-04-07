import React,{useEffect,useState} from "react";
import { View, Text, StatusBar,Image ,TextInput,KeyboardAvoidingView,Platform, ScrollView, TouchableOpacity } from "react-native";
import {Avatar,ListItem} from "react-native-elements";
import {Camera} from "expo-camera";
import {useNavigation} from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons.js";
import Style from "./style.js";
export default function index() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  let camera= Camera;
  const navigation=useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
 
  const __takePicture = async () => {
    if (!camera) return
    const photo = await cameraRef.takePictureAsync();
    console.log(photo);
   
  }
  return (
    <View style={Style.addstoryscreen}>
      <StatusBar backgroundColor={"black"}/>       
      <View style={Style.header}>
         <View style={Style.row1}>                
         </View>
         <View style={Style.row2}>
          <MaterialCommunityIcons onPress={()=>{navigation.goBack();}} style={Style.imageicon} size={35} name="close"/>
         </View>     
      </View>
     
      
      <Camera type={type} style={{width:"100%",height:"70%"}} ref={(ref)=>{setCameraRef(ref);}}/>
     
      <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginTop:20}}>
        <TouchableOpacity>
           <MaterialCommunityIcons style={Style.imageicon} size={27} name="folder-image"/> 
        </TouchableOpacity>
        <TouchableOpacity  onPress={__takePicture} style={{backgroundColor:"#FFF",borderRadius:50,marginLeft:6,padding:20}}>
          <MaterialCommunityIcons name="camera" size={30} style={{color:"black"}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
          <Text style={{color:"#FFF",fontSize:30,fontWeight:"bold"}}>↶</Text>
        </TouchableOpacity>
      </View>
    
     
    </View>
  );
}
