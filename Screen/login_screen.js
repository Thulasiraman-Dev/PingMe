import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Toast, Root, Icon } from "native-base";
import firebase from 'firebase';
export default function login_screen({ navigation }) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [spinner_animation, set_spinner_animation] = useState(false);
  const [button_disable, set_button_disable] = useState(true);
  useEffect(() => {
    email.length > 0 && password.length > 0
      ? set_button_disable(false)
      : set_button_disable(true);  
  }, [email, password]);
  const login = () => {
    Keyboard.dismiss();
    set_spinner_animation(true);
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user)=>{
      console.log(user);
    }).catch((error)=>{
      if(error='auth/wrong-password'){
        Toast.show({
          text: "Wrong password",
          textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
          type:'danger',
          position:'top',
          duration:10000
        })
    }

    if(error='auth/user-not-found'){
      Toast.show({
        text: "User not found",
        textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
        type:'danger',
        position:'top',
        duration:10000
      })
    }
    if (error='auth/invalid-email') {
      Toast.show({
        text: "Invalid Email",
        textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
        type:'danger',
        position:'top',
        duration:10000
      })
      set_spinner_animation(false);
    }  
    })
  
  };
  const move_to_Register_screen = () => {
    navigation.navigate("Register");
  };
  const move_to_Forgot_password_screen=()=>{
      navigation.navigate("Forgotpasswordscreen",{email:email});
  }
 
    return (
      <Root>
        <View style={styles.login_cont_style}>
          <StatusBar style="dark" />
          <Text style={{ fontSize: 21, fontWeight: "bold" }}>
            LogIn to Pingme
          </Text>
          <TextInput
            placeholder={"Email"}
            style={styles.text_input_style}
            placeholderTextColor="#8F8F8F"
            onChangeText={(text) => {
              set_email(text);
            }}
            value={email}
          />
            <TextInput
              placeholder={"Password"}
              style={styles.text_input_style}
              secureTextEntry
              placeholderTextColor="#8F8F8F"
              onChangeText={(text) => {
                set_password(text);
              }}
              value={password}
            />
          <TouchableOpacity
            style={
              button_disable ? styles.button_style_overlay : styles.button_style
            }
            disabled={button_disable}
            onPress={login}
          >
            {spinner_animation ? (
              <ActivityIndicator
                animating={spinner_animation}
                size='large'
                color={"#FFF"}
                style={{ marginTop: 2 }}
              />
            ) : (
              <Text style={styles.button_text_style}>Log In</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={move_to_Forgot_password_screen}>
            <Text style={styles.forgot_pass_style}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={{marginTop:20,color:'#6A6A6A',fontSize:16}}>or</Text>
          <TouchableOpacity
            style={styles.button_style}
            onPress={move_to_Register_screen}
          >
            <Text style={styles.button_text_style}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </Root>
    );
  
  
}
const styles = StyleSheet.create({
  login_cont_style: {
    flex: 1,
    justifyContent:'center',
    alignItems: "center",
  },
  text_input_style: {
    width: 270,
    height: 50,
    marginTop: 20,
    borderColor: "#CECACA",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "#E8E8E8",
    paddingLeft: 10,
    fontSize: 15,
  },
  button_style: {
    backgroundColor: "#6767FF",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  },
  button_style_overlay: {
    backgroundColor: "#6767FF99",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  
  },
  button_text_style: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 9,
  },
  forgot_pass_style: {
    marginTop: 20,
    color: "#6A6A6A",
    fontSize: 15,
  },
});
