import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  waitView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  waitTxt: {
    color: "#333",
    fontSize: 20,
    fontWeight: "medium",
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
    elevation: 3,
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
