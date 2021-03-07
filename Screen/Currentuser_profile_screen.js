import React,{useEffect,useState}  from 'react' 
import {Text,View,StyleSheet,TouchableOpacity,TouchableHighlight,ActivityIndicator,Switch,Button} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {BottomSheet,Avatar} from 'react-native-elements' 
import firebase from 'firebase'
import {Container,Tab,Tabs,TabHeading,} from "native-base";
export default function Current_user_profile_screen({navigation}){
    const [bottomsheet_visible,set_bottomsheet_visible]=useState(false);
    const [username,set_username]=useState('');
    const [profileimage,set_profileimage]=useState('');
    const [bio,set_bio]=useState('');
    const [name,set_name]=useState('');
    const [privateaccount,set_privateaccount]=useState()
    const [showmore,set_showmore]=useState(true)
    const [following_count,set_following_count]=useState(0)
    useState(()=>{
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .onSnapshot((doc)=>{
            set_username(doc.data().username);
            set_profileimage(doc.data().profileimage);
            set_bio(doc.data().bio)
            set_name(doc.data().name)
            set_privateaccount(doc.data().privateaccount)
        })
        firebase.firestore().collection('Following').doc(firebase.auth().currentUser.uid)
        .collection('userFollowing').onSnapshot((doc)=>{
            set_following_count (doc.size);
        })
         
       
    },[])
    const onclick_settings_icon=()=>{
        set_bottomsheet_visible(true)
    }
    
    return(
        <View style={styles.screen}>
            <View style={styles.header}>
              <View style={styles.header_container}>
                <MaterialCommunityIcons  name='account-circle-outline' size={30} style={styles.account_icon}/>
                <Text style={styles.profile_text} numberOfLines={1} >{username}</Text>
              </View> 
              
              <TouchableOpacity onPress={onclick_settings_icon}>
                <MaterialCommunityIcons  name='cog' size={25} style={styles.settings_icon}/>
              </TouchableOpacity> 
            </View>
            {/* <ActivityIndicator animating={true} size='large' color='#6767FF' /> */}
            <View style={styles.image_username_container}>
                <Avatar source={{uri:profileimage}} rounded size='xlarge'style={styles.profileimage}/>
               
                <TouchableOpacity onPress={()=>{set_bottomsheet_visible(false),navigation.navigate('editprofilescreen',{username:username})}} style={{backgroundColor:'#6767FF',width:150,height:30,borderRadius:3,marginLeft:45,marginTop:15}}>
                <Text style={{color:'#FFF',textAlign:'center',fontWeight:'bold',marginTop:4}}>Edit profile</Text>
            </TouchableOpacity>
            </View>
             {name==''?null:<Text style={styles.username}>@{name}</Text>} 
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
                    <Text style={styles.following_count}>{following_count-1}</Text>
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
            <BottomSheet isVisible={bottomsheet_visible}>
                <Text style={styles.bottomsheet_top}></Text>
                <View style={styles.bottomsheet_container}>
                  <Text style={{fontSize:18,marginTop:14,marginLeft:10}}>Private account</Text>   
                  <Switch value={privateaccount} trackColor={{ false: "#767577", true: "#6767FF" }} thumbColor={privateaccount ? "#6767FF" : "#f4f3f4"} 
                  onValueChange={((privateaccount)=>firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).
                  update({
                      privateaccount:privateaccount
                  }) )} style={{marginRight:15,marginTop:10}} />
                </View>
                <TouchableHighlight>
                  <View style={styles.bottomsheet_container}>
                    <Text style={{fontSize:18,marginTop:14,marginLeft:10}}>Change Password</Text>   
                  </View>
                </TouchableHighlight>
                <TouchableHighlight>
                  <View style={styles.bottomsheet_container}>
                    <Text onPress={()=>{firebase.auth().signOut();}} style={{fontSize:18,marginTop:14,marginLeft:10,color:'#6767FF'}}>Logout</Text>   
                  </View>
                </TouchableHighlight>    
                <TouchableHighlight onPress={()=>{set_bottomsheet_visible(false)}}>
                  <View style={styles.bottomsheet_container}>
                    <Text style={{textAlign:'center',color:'red',fontSize:18,marginTop:14,marginLeft:10}}>Cancel</Text>   
                  </View>
                </TouchableHighlight>  
            </BottomSheet>
        </View>
    );
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
       marginLeft:13,
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
        fontWeight:'bold',
        marginLeft:15
    },
    following_count:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        marginLeft:15
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
        marginLeft:13,
        marginTop:8,
    },
    bio_text:{
        fontSize:14,
        width:295
    }
})