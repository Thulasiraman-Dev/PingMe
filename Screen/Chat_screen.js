import React from 'react'
import { View, Text ,ScrollView} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Card,CardItem} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Overlay,Avatar} from 'react-native-elements'
export default function Chat_screen() {
    return (
    <View style={{flex:1,backgroundColor:'#FFF'}} >
        <View
        style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          alignItems: "center",
          padding:12,
          backgroundColor:'#FFF'
        }}
      >
        <View style={{flexDirection:'row'}}>
        <MaterialCommunityIcons
          name='send-circle-outline'
          size={30}
          color={'black'}
        />
        <Text style={{ fontSize:18, fontWeight: "bold" ,marginLeft:5,marginTop:2, color:'black'}}>
          Chat
        </Text>
        </View>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          style={{marginRight:10}}
          color={'black'}
        />
      </View>
     
        <Card transparent>
          <CardItem>
              <Text style={{fontSize:15,fontWeight:'bold'}}>Stories</Text>
              </CardItem>  
         <CardItem>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}  >
         <View style={{flexDirection:'row'}}>
          <Avatar source={require('../assets/tr.jpg')} rounded style={{width:55,height:55}} size='xlarge'/>
          <Avatar source={require('../assets/image1.jpg')} rounded style={{width:55,height:55,marginLeft:10}} size='xlarge'/>
          <Avatar source={require('../assets/sk.jpg')} rounded style={{width:60,height:60,marginLeft:10}} size='xlarge'
          avatarStyle={{ borderWidth: 3, borderColor: '#6767FF', borderStyle:'solid'}}/>
          <Avatar source={require('../assets/image2.jpg')} rounded style={{width:60,height:60,marginLeft:10}} size='xlarge'
           avatarStyle={{ borderWidth: 3, borderColor: '#6767FF', borderStyle:'solid'}}/>
          <Avatar source={require('../assets/image3.jpg')} rounded style={{width:55,height:55,marginLeft:10}} size='xlarge'/>
          <Avatar source={require('../assets/dhoni.jpg')} rounded style={{width:55,height:55,marginLeft:10}} size='xlarge'/>
          </View>
          </ScrollView>
          </CardItem>
          </Card>
     
    </View>
    )
}
