import { StyleSheet } from "react-native";

export default StyleSheet.create({
  addstoryscreen: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "black",
    height: 80,
    backfaceVisibility:"hidden"
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
    marginLeft:120 
   },
  gobackicon: {
    color: "#FFF",
  },
  addstorytext: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#FFF",
  },
  imageicon: {
    color: "#FFF",
  },
  textinput: {
    width: 290,
    height: 45,
    borderColor:"#FFF",
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "#FFF",
    paddingLeft: 13,
    fontSize: 15,
    marginLeft:10,
    paddingRight:36
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
    flexDirection: "row",
    alignItems: "center",
  },
  bottomsheetprofilepic: {
    width: 70,
    height: 70,
    marginLeft: 6,
  },
  bottomsheetusername: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  bottomsheetnormalcontainer: {
    backgroundColor: "#FFF",
    height: 50,
  },
  friendstext: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 14,
  },
  edittext: {
    fontSize: 17,
    marginLeft: 10,
    marginTop: 14,
  },
  logouttext: {
    fontSize: 17,
    color: "#6767FF",
    marginLeft: 10,
    marginTop: 14,
  },
  canceltext: {
    fontSize: 17,
    color: "red",
    marginLeft: 10,
    marginTop: 14,
  },
});
