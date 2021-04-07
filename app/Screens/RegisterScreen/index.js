import React, { useEffect, useState } from "react";
import {View,Text,StatusBar,TextInput,TouchableOpacity,Alert,ActivityIndicator,Keyboard} from "react-native";
import {Root,Toast} from "native-base";
import firebase from "firebase";
import Style from "./style.js";

export default function index({navigation}) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirmpassword,set_confirmpassword]=useState("");
  const [buttondisable, set_buttondisable] = useState(true);
  const [load, set_load] = useState(false);

  useEffect(()=>{
    email.length>0 && password.length>0 && confirmpassword.length>0?set_buttondisable(false):set_buttondisable(true);     
  },[email,password,confirmpassword])

  const navigatetoprofilesetupscreen=()=>{
    Keyboard.dismiss();
    set_load(true);
    if(email.search("@gmail.com")==-1){
      Toast.show({text:"Invalid Email",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
      set_load(false);
    }   
    else if(password!=confirmpassword){
      Toast.show({text:"Passwords doesn't match",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
      set_load(false);
    }
    else if(password.length<6){
      Toast.show({text:"Weak password",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{marginTop:100},style:{borderRadius:6,margin:40}});
      set_load(false);
    }
    else{
      firebase.firestore().collection("Users").where("email","==",email).get()
      .then((doc)=>{
         if(doc.empty){
          navigation.replace("profilesetupscreen",{email:email,password:password}); 
         }
         else{
          Toast.show({text:"Email Already Registered",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
          set_load(false);   
         }
      })
    }
  }
  
  return (
    <Root>
    <View style={Style.registerscreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF"/>       
      <Text style={Style.createyouraccounttext}>Create Your Account</Text>
      <TextInput placeholder="Email" style={Style.textinput} placeholderTextColor="#8F8F8F" onChangeText={(text)=>{set_email(text);}} value={email} autoCapitalize="none"/>
      <TextInput placeholder="Password" style={Style.textinput} secureTextEntry placeholderTextColor="#8F8F8F" onChangeText={(text)=>{set_password(text);}} value={password} autoCapitalize="none"/>
      <TextInput placeholder="Confirm Password" style={Style.textinput} secureTextEntry placeholderTextColor="#8F8F8F" onChangeText={(text)=>{set_confirmpassword(text);}} value={confirmpassword} autoCapitalize="none"/>
      <TouchableOpacity  style={buttondisable ? Style.buttondisable : Style.button} disabled={buttondisable} onPress={navigatetoprofilesetupscreen}>
         {load? 
         (<ActivityIndicator animating={load} size="large" color={"#FFF"} style={{ marginTop: 2 }}/>) 
         : 
         (<Text style={Style.buttontext}>Next</Text>)
         }
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.goBack();}}>
        <Text style={Style.alreadyhaveanaccounttext}>Already Have an Account? LogIn</Text>
      </TouchableOpacity>
    </View>
    </Root>
  );
}
