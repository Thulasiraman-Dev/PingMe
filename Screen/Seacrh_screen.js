import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput,Keyboard ,FlatList,LogBox} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SearchBar,Avatar } from "react-native-elements";
import { Container, Header, Item, Input, Icon, Button,Card,CardItem } from 'native-base';
import firebase from 'firebase'

export default function Seacrh_screen({ navigation }) {
  const [username, setusername] = useState("");
  const [searchlist,set_searchlist]=useState([])
  const searchuser=(search)=>{
    firebase.firestore().collection('users').where('username','>=',search)
    .get().then((doc)=>{
       let user=doc.docs.map((docs)=>{
              return{username:docs.data().username,
                profileimage:docs.data().profileimage,
                uid:docs.id,bio:docs.data().bio,
                privateaccount:docs.data().privateaccount,
                name:docs.data().name}
       })
       set_searchlist(user)
    })
    
  }
  return (
    <View style={{ flex: 1,backgroundColor:'#FFF' }}>
       <SearchBar
        placeholder="Search Here..."
        onChangeText={(search)=>{searchuser(search),setusername(search)}}
        value={username}
         containerStyle={{backgroundColor:'#FFF',borderBottomColor:'#FFF'}}
         inputContainerStyle={{backgroundColor:'#E8E8E8',borderRadius:15,height:40}}
         inputStyle={{color:'black',fontSize:16}}
      />
    {username.length>0?<FlatList
       data={searchlist}
       renderItem={({item})=>(
         <TouchableOpacity onPress={()=>{navigation.navigate('searchprofilescreen',{uid:item.uid,username:item.username,profileimage:item.profileimage,bio:item.bio,privateaccount:item.privateaccount,name:item.name})}}>
         <Card transparent style={{marginTop:-3}}  >
            <CardItem >
            <View style={{ flexDirection: "row" }}>
            <Avatar
                source={{uri:item.profileimage}}
                rounded
                style={{ width: 55, height: 55, marginLeft:-8 }}
                size='xlarge'
              />
              <View style={{marginLeft:10,marginTop:6}}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {item.username}
              </Text>
              <Text style={{fontSize:13}}>{item.name}</Text>
              </View>
              </View> 
            </CardItem>
         </Card>
         </TouchableOpacity>
       )}
    />:null}
    
    </View>
    
  );
}
