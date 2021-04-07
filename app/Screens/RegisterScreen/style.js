import { StyleSheet } from "react-native";

export default StyleSheet.create({
  registerscreen: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  createyouraccounttext: {
    fontSize: 21,
    fontWeight: "bold",
  },
  textinput: {
    width: 270,
    height: 50,
    marginTop: 20,
    borderColor: "#CECACA",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "#E8E8E890",
    paddingLeft: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#6767FF",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  },
  buttondisable: {
    backgroundColor: "#6767FF99",
    width: 270,
    height: 40,
    borderRadius: 3,
    marginTop: 20,
  },
  buttontext: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 9,
  },
  alreadyhaveanaccounttext: {
    marginTop: 20,
    color: "#6A6A6A",
    fontSize: 15,
  },
});
