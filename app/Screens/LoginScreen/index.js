import React, { useEffect, useState } from "react";
import {View,Text,StatusBar,TextInput,TouchableOpacity,Alert,ActivityIndicator,Keyboard} from "react-native";
import {Root,Toast} from "native-base";
import firebase from "firebase";
import Style from "./style.js";
export default function index({navigation}) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [buttondisable, set_buttondisable] = useState(true);
  const [load, set_load] = useState(false);
  
  useEffect(()=>{
    email.length>0 && password.length>0 ? set_buttondisable(false):set_buttondisable(true);
  },[email,password])

  const navigatetoregisterscreen=()=>{
    navigation.navigate("registerscreen");      
  }
  
  const navigatetoforgotpasswordscreen=()=>{
    navigation.navigate("forgotpasswordscreen"); 
  }
  const navigatetomainscreen=()=>{
    Keyboard.dismiss();
    set_load(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      if ((error = "auth/wrong-password")) {
        Toast.show({text:"Wrong Password",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
        set_load(false);
      }
      if ((error = "auth/user-not-found")) {
        Toast.show({text:"User Not Found",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
        set_load(false);
      }
      if ((error = "auth/invalid-email")) {
        Toast.show({text:"Invalid Email",type:"danger",position:"center",textStyle:{textAlign:"center"},style:{borderRadius:6,margin:40}});
        set_load(false);
      }
      });
    }  
  
  return (
    <Root>
    <View style={Style.loginscreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Text style={Style.logintopingmetext}>LogIn to PingMe</Text>
      <TextInput placeholder="Email" style={Style.textinput} placeholderTextColor="#8F8F8F" onChangeText={(text)=>{set_email(text);}} value={email} autoCapitalize="none"/>
      <TextInput placeholder="Password" style={Style.textinput} secureTextEntry placeholderTextColor="#8F8F8F" onChangeText={(text)=>{set_password(text);}} value={password} autoCapitalize="none"/>
      <TouchableOpacity onPress={navigatetomainscreen} style={buttondisable ? Style.buttondisable : Style.button} disabled={buttondisable}>
         {load? 
         (<ActivityIndicator animating={load} size="large" color={"#FFF"} style={{ marginTop: 2 }}/>) 
         : 
         (<Text style={Style.buttontext}>Log In</Text>)
         }
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={Style.forgotpasswordtext} onPress={navigatetoforgotpasswordscreen}>Forgot Password ?</Text>
      </TouchableOpacity>
      <Text style={Style.ortext}>or</Text>
      <TouchableOpacity style={Style.button} onPress={navigatetoregisterscreen}>
        <Text style={Style.buttontext}>Create an Account</Text>
      </TouchableOpacity>
    </View>
    </Root>
  );
}
