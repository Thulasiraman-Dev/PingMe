import { StyleSheet } from "react-native";

export default StyleSheet.create({
  editprofilescreen: {
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
    marginTop: -3,
    width: "50%",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
    marginLeft: 10,
  },
  gobackicon: {
    color: "#FFF",
    marginLeft: 10,
  },
  editprofiletext: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#FFF",
  },
  updateicon: {
    color: "#FFF",
    marginRight: 40,
  },
  editprofilecontainer: {
    marginTop: 50,
    flexDirection: "column",
    alignItems: "center",
  },
  changeprofileimagetext: {
    color: "#6767FF",
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
  },
  bottomsheettopcontainer: {
    backgroundColor: "#FFF",
    height: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomsheetnormalcontainer: {
    backgroundColor: "#FFF",
    height: 50,
  },
  selectfromgallerytext: {
    fontSize: 16,
    color:"#6767FF",
    marginLeft:12,
  },
  removeprofileimagetext: {
    fontSize: 16,
    color:"red",
    marginLeft:12,
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
