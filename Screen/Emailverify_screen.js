import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import { Toast, Root } from "native-base";
export default function Emailverify_screen({ navigation, route }) {
  const [email, setemail] = useState(route.params.email);
  const [password, setpassword] = useState(route.params.password);
  const [button_disable, set_button_disable] = useState(true);
  const [spinner_animation, set_spinner_animation] = useState(false);
  const [counter,set_counter]=useState(120);
  const [profile,set_profile]=useState('');
  const timer=()=>{
    setTimeout(()=>set_counter(counter-1),1000)
  }
  useEffect(()=>{
    (email.length>0 && password.length>0)?set_button_disable(false):set_button_disable(true)
  },[email,password])
  useEffect(()=>{
      counter>0 ? timer() : set_button_disable(true)
  },[counter])
  useEffect(()=>{
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then((doc)=>{
        set_profile(doc.data().profileimage)
    })
  },[])
  const verfiy_account = () => {
    Keyboard.dismiss();
    set_spinner_animation(true);

      firebase.auth().signInWithEmailAndPassword(email,password)
      .then((user)=>{
          if (user.user.emailVerified) {
            Toast.show({
              text: "Email not verified",
              textStyle: { color: "white",textAlign:'center',fontSize:14,fontWeight:'bold' },
              type:'danger',
              position:'top',
              duration:10000
            })
          }
          else
          {
              console.log(user);
          }
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
  return (
    <Root>
    <View style={styles.login_cont_style}>
       <Avatar
        rounded
        source={{uri:profile}}
        size="xlarge"
        style={{width:90,height:90}}
      />
       <Text style={{ fontSize: 21, fontWeight: "bold",color:'black',marginBottom:20,marginTop:20 }}>
          Verify your Account
       </Text>
      <Text style={{ fontSize: 15,textAlign:"center",color: "#6A6A6A",}}>
          We have sent a verification link to  {email}.
      </Text>
      <TextInput
        placeholder={"Email"}
        style={styles.text_input_style}
        value={email}
        onChangeText={(text)=>{setemail(text)}}
        placeholderTextColor="#8F8F8F"
      />
      <TextInput
        placeholder={"Password"}
        style={styles.text_input_style}
        value={password}
        onChangeText={(text)=>{setpassword(text)}}
        secureTextEntry
        placeholderTextColor="#8F8F8F"
      />
      <TouchableOpacity  style={
          button_disable ? styles.button_style_overlay : styles.button_style
        }
        disabled={button_disable}
        onPress={verfiy_account}>
         {spinner_animation ? (
            <ActivityIndicator
              animating={spinner_animation}
              size="small"
              color={"#FFF"}
              style={{ marginTop: 2 }}
            />
          ) : (
            <Text style={styles.button_text_style}>Verify Account</Text>
          )}
      </TouchableOpacity>
      <TouchableOpacity >
          <Text style={styles.forgot_pass_style}>{counter}</Text>
        </TouchableOpacity>
        <View style={{marginBottom:20}}/>
    </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  login_cont_style: {
    flex: 1,
    justifyContent: 'center',
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
    color: "black",
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
    fontSize: 18,
    
  },
});
