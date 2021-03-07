import React, { useEffect, useState,useLayoutEffect } from "react";
import {View,Text,Switch,TouchableOpacity,StatusBar,FlatList,ScrollView,StyleSheet}from "react-native";
import firebase from "firebase";
import { Avatar } from "react-native-elements";
import {Container,Tab,Tabs,TabHeading,} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function Profile_screen({ navigation, route }) {
  const [image, set_image] = useState(route.params.profileimage);
  const [username, set_username] = useState(route.params.username);
  const [name,set_name] = useState(route.params.name);
  const [bio, set_bio] = useState(route.params.bio);
  const [uid, set_uid] = useState(route.params.uid);
  const [privateaccount, set_privateaccount] = useState(route.params.privateaccount);
  const [following,set_following] = useState();
  const [showmore,set_showmore]=useState(true)
  useEffect(()=>{
      firebase.firestore().collection('Following').doc(firebase.auth().currentUser.uid)
      .collection('userFollowing').where('id','==',uid).get()
      .then((doc)=>{
           if (doc.empty) {
             set_following(false)
           }
           else{
              set_following(true)
           }
      })
  },[])
  const follow_onclick=()=>{
      set_following(true)
      firebase.firestore().collection('Following').doc(firebase.auth().currentUser.uid)
      .collection('userFollowing').doc(uid).set({id:uid})
      firebase.firestore().collection('Followers').doc(uid)
      .collection('userFollowers').doc(firebase.auth().currentUser.uid).set({
          id:firebase.auth().currentUser.uid
      })
      firebase.firestore().collection('Notifications').doc(firebase.auth().currentUser.uid)
      .collection('userNotification').doc(uid).set({
         message:'You started following',
         id:uid,
         username:username,
         image:image
      })
      firebase.firestore().collection('Notifications').doc(uid)
      .collection('userNotification').doc(firebase.auth().currentUser.uid).set({
         message:'started following you',
         id:uid,
         username:username,
         image:image
      })

  }
  const unfollow_onclick=()=>{
    set_following(false)
    firebase.firestore().collection('Following').doc(firebase.auth().currentUser.uid)
    .collection('userFollowing').doc(uid).delete();
    firebase.firestore().collection('Followers').doc(uid)
    .collection('userFollowers').doc(firebase.auth().currentUser.uid).delete();
}
  if (privateaccount) {
    return <Text>privateaccount</Text>;
  } else {
    return (
      <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.header_container}>
          <MaterialCommunityIcons  name='arrow-left' size={30} style={styles.account_icon}/>
          <Text style={styles.profile_text} numberOfLines={1} >{username}</Text>
        </View> 
        
        <TouchableOpacity >
          <MaterialCommunityIcons  name='dots-vertical' size={25} style={styles.settings_icon}/>
        </TouchableOpacity> 
      </View>
      {/* <ActivityIndicator animating={true} size='large' color='#6767FF' /> */}
      <View style={styles.image_username_container}>
          <Avatar source={{uri:image}} rounded size='xlarge'style={styles.profileimage}/>
          
          {following?<TouchableOpacity onPress={unfollow_onclick} style={{backgroundColor:'#FFF',borderColor:'black',borderWidth:1,width:150,height:30,borderRadius:3,marginLeft:45,marginTop:15}} >
                <Text style={{color:'black',textAlign:'center',fontWeight:'bold',marginTop:4}}>UnFollow</Text>      
          </TouchableOpacity>:
          <TouchableOpacity onPress={follow_onclick} style={{backgroundColor:'#6767FF',width:150,height:30,borderRadius:3,marginLeft:45,marginTop:15}}>
                <Text style={{color:'#FFF',textAlign:'center',fontWeight:'bold',marginTop:4}}>Follow</Text>
            </TouchableOpacity>}
      </View>
      {name==''?null:<Text style={styles.username}>@ {name}</Text>}  
      <View style={styles.post_follower_following_container}>
        <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}}>
              <Text style={styles.post_count}>0</Text>
              <Text style={styles.post_text}> Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}}>
              <Text style={styles.followers_count}>0</Text>
              <Text style={styles.followers_text}> Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10,flexDirection:'row'}}>
              <Text style={styles.following_count}>0</Text>
              <Text style={styles.following_text}> Following</Text>
          </TouchableOpacity> 
          </View>             
          {bio==''?null:
          <View style={styles.bio_container}>
            <Text style={styles.bio_text} numberOfLines={showmore?2:null} ellipsizeMode='tail'>{bio}</Text>
             {showmore?
               <TouchableOpacity onPress={()=>{set_showmore(false)}}>
                 <Text style={{color:'grey'}} >Show more</Text>
                </TouchableOpacity>:<TouchableOpacity onPress={()=>{set_showmore(true)}}>
                  <Text style={{color:'grey'}} >Show less</Text>
             </TouchableOpacity>
              }
          </View>
          }
      <Container style={{marginTop:10}}>
      <Tabs
      tabBarUnderlineStyle={{
        borderBottomWidth: 2,
        borderBottomColor: "#E8E8E890",
      }}
      tabContainerStyle={{ elevation: 0 }}
      style={{}}
    >
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: "#FFF" }}>
            <MaterialCommunityIcons
              name="grid"
              size={25}
              color={"#6A6A6A"}
            />
          </TabHeading>
        }
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        
        </View>
      </Tab>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: "#FFF" }}>
            <MaterialCommunityIcons
              name="image"
              size={25}
              color={"#6A6A6A"}
            />
          </TabHeading>
        }
      >
        <Text>home3</Text>
      </Tab>
    </Tabs>
  </Container>
  </View>
    );
  }
}
const styles=StyleSheet.create({
  screen:{
     flex:1,
     backgroundColor:'#FFF'
  },
  header:{
     flexDirection:'row',
     justifyContent:'space-between',
     padding:12,
  },
  header_container:{
     flexDirection:'row',
  },
  profile_text:{
     fontSize:18,
     fontWeight:'bold',
     marginTop:2,
     marginLeft:8,
     color:'black',
     width:200 
  },
  account_icon:{
     color:'black'
  },
  settings_icon:{
     marginRight:15,
     marginTop:4,
     color:'black',
  },
  bottomsheet_top:{
      height:20,
      backgroundColor:'#FFF',
      borderTopLeftRadius:20,
      borderTopRightRadius:20  
   },
  bottomsheet_container:{
      height:50,
      backgroundColor:'#FFF', 
      flexDirection:'row',
      justifyContent:'space-between',
  },
  image_username_container:{
     flexDirection:'row',
     justifyContent:'flex-start',
     marginLeft:20,
     alignItems:'center'
  },
  profileimage:{
     width:100,
     height:100,
     marginTop:20,
  },
  username:{
     fontSize:14,
     fontWeight:'bold',
     marginTop:8,
     color:'black',
     marginLeft:13
  },
  post_follower_following_container:{
     flexDirection:'row',
     justifyContent:'flex-start',
     marginTop:8, 
     marginLeft:5
  },
  post_count:{
      textAlign:'center',
      fontSize:16,
      fontWeight:'bold',
  },
  followers_count:{
      textAlign:'center',
      fontSize:16,
      fontWeight:'bold'
  },
  following_count:{
      textAlign:'center',
      fontSize:16,
      fontWeight:'bold'
  },
  post_text:{
      fontSize:15,
      marginTop:2
  },
  followers_text:{
      fontSize:15,
      marginTop:2
  },
  following_text:{
      fontSize:15,
      marginTop:2,
  },
  bio_container:{
      marginLeft:25,
      marginTop:5,
  },
  bio_text:{
      fontSize:14,
      width:300
  }
})