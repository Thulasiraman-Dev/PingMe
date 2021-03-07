import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import { Toast, Root } from "native-base";
import * as Font from "expo-font";
import { Button, CheckBox } from "react-native-elements";
import firebase from "firebase";
export default function register_screen({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [spinner_animation, set_spinner_animation] = useState(false);
  const [button_disable, set_button_disable] = useState(true);
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
      (email.length>0 && password.length>0 && confirmpassword.length>0)?set_button_disable(false)
      : set_button_disable(true);
  }, [email,password,confirmpassword]);

  const move_to_profile_setup = () => {
    set_spinner_animation(true);
    Keyboard.dismiss();
    if (password!=confirmpassword) {
      Toast.show({
        text: "Password and Confirm password does\'nt match ",
        textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
        type:'danger',
        position:'top',
        duration:10000
      })
      set_spinner_animation(false);
    }
    else if(password.length<6)
    {
      Toast.show({
        text: "Weak password",
        textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
        type:'danger',
        position:'top',
        duration:10000
      })
      set_spinner_animation(false);
    }
    else
    {
      firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
          navigation.replace('Profilescreen',{email:email,password:password});
          set_spinner_animation(false);
      }).catch((error)=>{
         if (error='auth/email-already-exists') {
          Toast.show({
            text: "Email is already registered",
            textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
            type:'danger',
            position:'top',
            duration:10000
          })
          set_spinner_animation(false);
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
    }
    
  };
  return (
    <Root>
      <View style={styles.login_cont_style}>
        <StatusBar style="dark" />
        <Text style={{ fontSize: 21, fontWeight: "bold" }}>
          Create your Account
        </Text>
        <TextInput
          placeholder={"Email"}
          style={styles.text_input_style}
          placeholderTextColor="#8F8F8F"
          onChangeText={(text) => {
            setemail(text);
          }}
          autoCapitalize="none"
        />
        <TextInput
          placeholder={"Password"}
          style={styles.text_input_style}
          secureTextEntry
          placeholderTextColor="#8F8F8F"
          onChangeText={(text) => {
            setpassword(text);
          }}
        />
        <TextInput
          placeholder={"Confirm Password"}
          style={styles.text_input_style}
          secureTextEntry
          placeholderTextColor="#8F8F8F"
          onChangeText={(text) => {
            setconfirmpassword(text);
          }}
        />
        <TouchableOpacity
          style={
            button_disable ? styles.button_style_overlay : styles.button_style
          }
          disabled={button_disable}
          onPress={move_to_profile_setup}
        >
          {spinner_animation ? (
            <ActivityIndicator
              spinner_animation={spinner_animation}
              color={"#FFF"}
              size="large"
              style={{ marginTop: 2 }}
            />
          ) : (
            <Text style={styles.button_text_style}>
              Next
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Text style={styles.forgot_pass_style}>Already Have an Account? Log in</Text>
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
