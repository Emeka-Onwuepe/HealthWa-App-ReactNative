import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputGroup: {
    marginTop: 10,
    marginBottom: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
  },
  headerContainer: {
    marginVertical: 16,
  },
  buttonContainer: {
    backgroundColor: "#11B3CF",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
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

  button: {
    color: "#fff",
    fontWeight: "bold",
  },

 
});

export default styles;
