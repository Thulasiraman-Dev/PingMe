import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,TouchableHighlight,ActivityIndicator,KeyboardAvoidingView,Keyboard} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {BottomSheet,Avatar} from 'react-native-elements' 
import {AutoGrowTextInput} from 'react-native-auto-grow-textinput'
import firebase from 'firebase'
import { Container,Tab,Tabs,TabHeading,Content,Form, Item, Input, Label,Root,Toast} from "native-base";
import * as ImagePicker from "expo-image-picker";
export default function Edit_profile({navigation,route}){
    const [bottomsheet_visible,set_bottomsheet_visible]=useState(false);
    const [username,set_username]=useState('');
    const [check_username,set_check_username]=useState('');
    const [profileimage,set_profileimage]=useState('');
    const [bio,set_bio]=useState('');
    const [name,set_name]=useState('');
    const [load,set_load]=useState(false);
    const [update_icon_disable,set_update_icon_disable]=useState(false)
    useState(()=>{
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .onSnapshot((doc)=>{
            set_username(doc.data().username);
            set_profileimage(doc.data().profileimage);
            set_bio(doc.data().bio)
            set_name(doc.data().name)
            set_check_username(doc.data().username)
        })
    },[])
    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need camera roll permissions to make this work!");
            }
          }
        })();
      }, []);
    useEffect(()=>{
          {username.length>0?set_update_icon_disable(false):set_update_icon_disable(true)}
    },[username])  
    const remove_profile=()=>{
        firebase.firestore().collection('default_pic').doc('image').get()
        .then((doc)=>{
            set_profileimage(doc.data().image)
        })
        set_bottomsheet_visible(false);
    }
    const choose_from_gallery=async ()=>{
        let result =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
      
          if (!result.cancelled) {
            set_profileimage(result.uri);
          }
          set_bottomsheet_visible(false) 
    }
    const updateinfo=()=>{
      Keyboard.dismiss();
      set_load(true)
      if (check_username==username) {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .update({
                "username":username,
                "profileimage":profileimage,
                "bio":bio,
                "name":name
        }).then(()=>{
          Toast.show({
                    text:'Successfully updated',
                    position:'bottom',
                    type:'success',
                    duration:3000
                  })
             set_load(false)     
            })
           }
      else{
           firebase.firestore().collection('users').where('username','==',username).get()
        .then((doc)=>{
           if (doc.empty) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .update({
                "username":username,
                "profileimage":profileimage,
                "bio":bio,
                "name":name
            }).then(()=>{
              Toast.show({
                text:'Successfully updated',
                position:'bottom',
                type:'success',
                duration:3000
              })
              set_load(false)  
            })
           }
           else{
              Toast.show({
                text:'Username already taken',
                position:'bottom',
                type:'danger',
                duration:3000
              })
              set_load(false)  
           }
        })
      }
      
        
    }
    return(
      <Root>
       <View style={styles.screen}>
            <View style={styles.header}>
             <TouchableOpacity onPress={()=>{navigation.goBack();}}> 
                <View style={styles.header_container}>
                   <MaterialCommunityIcons name='arrow-left' size={30} style={styles.goback_icon}/> 
                   {/* <Text style={styles.editprofile_text}>Edit profile</Text> */}
                </View>
            </TouchableOpacity>
              {load?<ActivityIndicator animating={load} size='large' style={{marginTop:1,marginRight:15}} color='#6767FF' />:<TouchableOpacity disabled={update_icon_disable} onPress={updateinfo}>
                <MaterialCommunityIcons  name='check' size={30} style={styles.update_icon}/>
              </TouchableOpacity>}

            </View>
          
            <Container>
            
              <Tabs tabBarUnderlineStyle={{borderBottomWidth:2,borderBottomColor:"#E8E8E890"}}tabContainerStyle={{ elevation: 0 }}>
              
                <Tab heading={ <TabHeading style={{ backgroundColor: "#FFF" }}>
                 <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Edit profile</Text>
                </TabHeading>}>
                
                    <KeyboardAvoidingView behavior='height' style={styles.image}>
                        <Avatar source={{uri:profileimage}} rounded size='xlarge'style={styles.profileimage}/>
                        <TouchableOpacity onPress={()=>{set_bottomsheet_visible(true)}}>
                           <Text style={styles.change_profile_image} >Change profile image</Text>
                        </TouchableOpacity>
                        <Item floatingLabel style={{width:300,marginTop:20}} >
                         <Label>Username</Label>
                         <Input value={username} onChangeText={(text)=>{set_username(text)}}/>
                       </Item>
                       <Item floatingLabel  style={{width:300,marginTop:20}}>
                         <Label>Name</Label>
                         <Input value={name} onChangeText={(text)=>{set_name(text)}}/>
                       </Item>
                    </KeyboardAvoidingView>
                    
                </Tab>
                
                <Tab heading={<TabHeading style={{ backgroundColor: "#FFF" }}>
                  <Text style={{color:'black',fontSize:15,fontWeight:'bold'}}>Edit bio</Text>
                </TabHeading>}>
                    <View style={styles.image}>
                      
                       <AutoGrowTextInput placeholder='Bio' style={styles.bio_text_input} value={bio} onChangeText={(text)=>{set_bio(text)}}/>
                      
                    </View>
                </Tab>
              </Tabs>
            
            </Container>
            
            <BottomSheet isVisible={bottomsheet_visible}>
                <Text style={styles.bottomsheet_top}></Text>
                <TouchableHighlight onPress={choose_from_gallery}>
                  <View style={styles.bottomsheet_container}>
                    <Text style={{fontSize:17,marginTop:14,marginLeft:10,color:'#6767FF'}}>Choose from gallery</Text>   
                  </View>
                </TouchableHighlight>    
                <TouchableHighlight onPress={remove_profile}>
                  <View style={styles.bottomsheet_container}>
                    <Text style={{textAlign:'center',color:'red',fontSize:17,marginTop:14,marginLeft:10}}>Remove Profile Photo</Text>   
                  </View>
                </TouchableHighlight>  
            </BottomSheet>
       </View>
       </Root>
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
        padding:12
    },
    header_container:{
        flexDirection:'row',
    },
    update_icon:{
        marginRight:15,
        marginTop:1,
        color:'black',
     },
    goback_icon:{
        color:'black'
    },
    editprofile_text:{
        color:'black',
        fontWeight:'bold',
        fontSize:18,
        marginTop:2,
        marginLeft:12
    },
    image:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center', 
     },
    profileimage:{
        width:120,
        height:120,
        marginTop:30
    },
    change_profile_image:{
        color:'#6767FF',
        fontSize:17,
        marginTop:10,
        textAlign:'center'
    },
    username_text_input:{
        width: 270,
        height: 50,
        marginTop: 20,
        borderBottomColor: "#CECACA",
        borderLeftColor:'#FFF',
        borderRightColor:'#FFF',
        borderTopColor:'#FFF',
        borderRadius: 3,
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 16,
        paddingBottom:-20 
    },
    bio_text_input:{
        width: 270,
        height: 50,
        marginTop: 30,
        borderBottomColor: "#CECACA",
        borderLeftColor:'#FFF',
        borderRightColor:'#FFF',
        borderTopColor:'#FFF',
        borderRadius: 3,
        borderWidth: 1,
        fontSize: 15,
        paddingLeft:10,
        paddingBottom:10
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
})