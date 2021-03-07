import React,{useState,useEffect} from 'react'
import { View, Text,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native'

export default function Forgot_password_screen({route}) {
    const [email, set_email] = useState(route.params.email);
    const [spinner_animation, set_spinner_animation] = useState(false);
    const [button_disable, set_button_disable] = useState(true);
    useEffect(()=>{
      (email.length>0)?set_button_disable(false):set_button_disable(true)
    },[email])
    return (
        <View style={styles.login_cont_style}>
          <Text style={{ fontSize: 21, fontWeight: "bold",marginBottom:20 }}>
            Forgot Password ?
          </Text>
          <Text style={{ fontSize: 15,textAlign:"center",color: "#6A6A6A",marginHorizontal:40}}>
              Enter your email adderess linked your account
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
         <TouchableOpacity
          style={
            button_disable ? styles.button_style_overlay : styles.button_style
          }
          disabled={button_disable}
    
        >
          {spinner_animation ? (
            <ActivityIndicator
              animating={spinner_animation}
              size="small"
              color={"#FFF"}
              style={{ marginTop: 2 }}
            />
          ) : (
            <Text style={styles.button_text_style}>Send password reset email</Text>
          )}
        </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    login_cont_style: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems: "center",
        marginTop:100
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
})