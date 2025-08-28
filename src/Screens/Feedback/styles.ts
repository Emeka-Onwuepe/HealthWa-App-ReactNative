import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  waitTxt: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputView: {
    width: "100%",
    marginVertical: 50,
  },

  messageInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0B8AA0",
    padding: 7,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 5,
  },

  waitBtn: {
    width: "100%",
    backgroundColor: "#11B3CF",
    borderRadius: 50,
    marginVertical: 0,

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

  skipView: {
    width: "100%",
    marginVertical: 20,
  },

  skip: {
    color: "#555",
    fontSize: 16,
    textAlign: "right",
  },
});

export default styles;
