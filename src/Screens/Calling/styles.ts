import { StyleSheet } from "react-native";

const CallingStyles = StyleSheet.create({
  waitView: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  waitTxt: {
    color: "#333",
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 200,
  },

  videoContainer: {},

  localVideo: {},

  remoteVideo: {},

  userLabel: {},

  callControls: {},

  pairedImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },

  docTxt: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  callingTxt: {
    color: "#333",
    fontSize: 20,
  },

  waitBtn: {
    width: "100%",
    backgroundColor: "#11B3CF",
    borderRadius: 50,
    marginVertical: 100,
  },

  stopTxt: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#fff",
    textAlign: "center",
  },
});


export default CallingStyles;
