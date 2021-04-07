import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#6767FF",
    height: 52,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: -3,
    width:"50%"
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    width:"50%",
    marginLeft:10
  },
  profilepic: {
    width: 35,
    height: 35,
  },
  pingmetext: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#FFF",
  },
  bellicon: {
    marginLeft: 20,
    color: "#FFF",
  },
  plusicon: {
    marginLeft: 20,
    color: "#FFF",
  },
  searchicon: {
    marginLeft: 20,
    color: "#FFF",
  },
  bottomsheettopcontainer: {
    backgroundColor: "#FFF",
    height: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomsheetprofilecontainer: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    alignItems: "center",
  },
  bottomsheetprofilepic: {
    width: 85,
    height: 85,
  },
  bottomsheetusername: {
    marginTop:10,
    marginBottom:15,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomsheetnormalcontainer: {
    backgroundColor: "#FFF",
    height: 50,
    flexDirection:"row",
    justifyContent:"space-around",
  },
  friendstext: {
    fontSize: 16,
  },
  edittext: {
    fontSize: 16,
  },
  logouttext: {
    fontSize: 16,
    color: "#6767FF",
  },
  bottomsheetcanceliconcontainer:{
    backgroundColor: "#FFF",
    height: 50,
    alignItems:"center"
  },
  cancelicon: {
    marginTop:12
  },
});
