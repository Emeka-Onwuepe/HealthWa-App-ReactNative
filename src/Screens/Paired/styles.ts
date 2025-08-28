import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  waitView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,

    paddingVertical: 20,
  },

  waitTxt: {
    color: "#333",
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 200,
  },

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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  stopTxt: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#fff",
    textAlign: "center",
  },
});
export default styles;
