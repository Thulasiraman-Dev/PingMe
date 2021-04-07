import { StyleSheet } from "react-native";

export default StyleSheet.create({
  searchscreen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  inputcontainer: {
    backgroundColor: "#6767FF",
    borderBottomColor: "#6767FF",
    borderTopColor: "#6767FF",
    height: 52,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    paddingHorizontal: 10,
  },
  inputtextcontainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 39,
    marginTop: -3,
  },
  inputfont: {
    fontSize: 15,
    color: "black",
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
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomsheetnormalcontainer: {
    backgroundColor: "#FFF",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomsheetcanceliconcontainer: {
    backgroundColor: "#FFF",
    height: 50,
    alignItems: "center",
  },
  cancelicon: {
    marginTop: 12,
  },
  followbutton: {
    width: 150,
    height: 35,
    backgroundColor: "#6767FF",
    marginBottom: 15,
    borderRadius: 5,
  },
  addasfriendtext: {
    textAlign: "center",
    marginTop: 7,
    color: "#FFF",
    fontWeight: "bold",
  },
  requestbutton: {
    width: 150,
    height: 35,
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 5,
    borderColor: "#00000090",
    borderWidth: 1,
  },
  requestedtext: {
    textAlign: "center",
    marginTop: 6,
    color: "black",
    fontWeight: "bold",
  },
  unfollowbutton: {
    width: 150,
    height: 35,
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 5,
    borderColor: "#6767FF90",
    borderWidth: 1,
  },
  removeasfriendtext: {
    textAlign: "center",
    marginTop: 6,
    color: "#6767FF",
    fontWeight: "bold",
  },
});
