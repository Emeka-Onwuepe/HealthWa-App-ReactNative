import { StyleSheet } from "react-native";

const PrescriptionStyles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "stretch",
    // justifyContent: "center",
    width: "100%",
  },

  dateView: {
    width: "100%",
  },

  buttonContainer: {
    backgroundColor: "#11B3CF",
    height: 55,

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,

    marginVertical: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    width: "100%",
  },

  btnTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  waitBtn: {
    width: "100%",
    backgroundColor: "#11B3CF",
    borderRadius: 50,
    marginTop: 40,

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

export default PrescriptionStyles;
