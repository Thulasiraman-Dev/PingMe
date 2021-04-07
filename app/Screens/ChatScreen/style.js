import { StyleSheet } from "react-native";

export default StyleSheet.create({
  chatscreen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
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
    width: "50%",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginLeft: 10,
  },
  arrowlefticon: {
    color: "#FFF",
  },
  profilepic: {
    width: 38,
    height: 38,
    marginLeft: 10,
  },
  usernametext: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#FFF",
  },
  messagebox:{
    flex:1,
   
  },
  textinput: {
    width: 290,
    height: 53,
    flex:1,
    backgroundColor: "#E8E8E899",
    paddingLeft: 5,
    fontSize: 15,
    paddingRight: 40,
  },
});
