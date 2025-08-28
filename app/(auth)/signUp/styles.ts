import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 70,
    borderRadius: 50,
    marginBottom: 20,
  },

  welcomeText: {
    textAlign: "center",
    marginBottom: 20,
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputContainer: {
    width: "100%",
  },
  inputGroup: {
    marginTop: 10,
    marginBottom: 60,
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
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 20,
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
    alignItems: "center",
    marginTop: 10,
  },

  lowerLink: {
    color: "#0000ff",
    fontSize: 16,
  },
});

export default styles;
