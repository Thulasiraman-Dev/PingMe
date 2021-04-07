import React,{useState,useEffect} from 'react'
import { View, Text,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native'
import Style from "./style.js";
export default function Forgot_password_screen() {
    const [email, set_email] = useState("");
    const [load, set_load] = useState(false);
    const [buttondisable, set_buttondisable] = useState(true);

    useEffect(()=>{
      (email.length>0)?set_buttondisable(false):set_buttondisable(true)
    },[email])

    return (
      <View style={Style.forgotpasswordscreen}>
          <Text style={Style.forgotpasswordtext}>Forgot Password ?</Text>
          <Text style={Style.descriptiontext}>
              Enter your email adderess linked your account.
          </Text>
          <TextInput placeholder={"Email"} style={Style.textinput} placeholderTextColor="#8F8F8F" onChangeText={(text) => {set_email(text);}} value={email}/>
         <TouchableOpacity style={buttondisable ? Style.buttondisable : Style.button} disabled={buttondisable}>
          {load ? 
          (<ActivityIndicator animating={load} size="small" color={"#FFF"} style={{ marginTop: 2 }}/>)
          : 
          (<Text style={Style.buttontext}>Send password reset email</Text>)
          }
         </TouchableOpacity>
      </View>
    )
}