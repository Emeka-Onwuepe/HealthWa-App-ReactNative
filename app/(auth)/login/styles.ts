import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 24,
  },

  logo: {
    width: 150,
    height: 70,
    borderRadius: 50,
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },

  // form
  inputGroup: {
    marginTop: 10,
    marginBottom: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    // backgroundColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginHorizontal: 20,
  },

  inputButton: {
    marginVertical: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#11B3CF",
    marginVertical: 10,
    borderRadius: 50,
    width: "100%",
    paddingHorizontal: 20,
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

  lowerTxt: {
    fontSize: 14,
    textAlign: "center",
  },

  lowerLink: {
    color: "#0000ff",
    alignItems: "center",
    fontSize: 16,
  },

  keepIn: {
    alignSelf: "flex-start",
    marginLeft: 50,
  },

  keepTxt: {
    textAlign: "left",
    fontSize: 10,
  },
});

export default styles;
