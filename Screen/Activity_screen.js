import React,{useEffect,useState} from 'react'
import { View,Text,FlatList,ScrollView } from 'react-native'
import { Card,CardItem,Right} from 'native-base';
import {BottomSheet,Avatar} from 'react-native-elements'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from 'firebase'
export default function Activity_screen() {
  const [notification,set_notification]=useState([])
  useEffect(()=>{
    firebase.firestore().collection('Notifications').doc(firebase.auth().currentUser.uid)
    .collection('userNotification').onSnapshot((doc)=>{
        let notification=doc.docs.map((doc)=>{
             return{id:doc.data().id,username:doc.data().username,image:doc.data().image,message:doc.data().message,type:doc.data().type}
        })
        set_notification(notification)
    })
  },[])
    return (
     <View style={{flex:1,backgroundColor:'#FFF'}}>
       <View style={{ flexDirection:'row',
       justifyContent:'space-between',
       padding:12,}}>
              <View style={{flexDirection:'row',}}>
                <MaterialCommunityIcons  name='account-circle-outline' size={30} />
                <Text style={{fontSize:18,
       fontWeight:'bold',
       marginTop:2,
       marginLeft:8,
       color:'black',
       width:200 }} numberOfLines={1} >Notification</Text>
              </View> 
              
           
                <MaterialCommunityIcons  name='cog' size={25} />
             
            </View> 
            
             
              <FlatList
               data={notification}
               renderItem={({item})=>{
                      
                
                    if(item.type==1)
                    {
                     return(
                    <Card transparent>
                    <CardItem >
                
                    <Avatar
                        source={{uri:item.image}}
                        rounded
                        style={{ width: 55, height: 55, marginLeft:-8 }}
                        size='xlarge'
                      />
                      <View style={{marginLeft:10}}>
                      <Text
                        style={{
                          fontSize: 15,
                          
                        }}
                      >
                         {item.message}
                         
                      </Text>
                      <Text style={{fontWeight:'bold',fontSize:15}}>{item.username}</Text> 
                      </View>
                      <Right>
                        <MaterialCommunityIcons  name='close' size={18} style={{marginTop:10}}/>
                      </Right>
                    </CardItem>
                 </Card>
                     )
                      }
                      if(item.type==2)
                      {
                       return(
                      <Card transparent>
                      <CardItem >
                  
                      <Avatar
                          source={{uri:item.image}}
                          rounded
                          style={{ width: 55, height: 55, marginLeft:-8 }}
                          size='xlarge'
                        />
                        <View style={{marginLeft:10}}>
                        <Text
                          style={{
                            fontSize: 15,
                            
                          }}
                        >
                           {item.message}
                           
                        </Text>
                        <Text style={{fontWeight:'bold',fontSize:15}}>{item.username}</Text> 
                        </View>
                        <Right>
                          <MaterialCommunityIcons  name='close' size={18} style={{marginTop:10}}/>
                        </Right>
                      </CardItem>
                   </Card>
                       )
                        }
                   
                      
                  

               }}
            />
            
            
                
            
          
          
       
        
         
       
           
        
        
      
    </View>
    )
}
