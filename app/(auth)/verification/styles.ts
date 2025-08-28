import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },

  welcomeText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#00000080",
    fontSize: 16,
  },

  inputContainer: {
    marginVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dashContainer: {
    flexDirection: "row",
  },
  dash: {
    width: 40,
    height: 50,
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dashText: {
    fontSize: 24,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 50,
    width: "100%",
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
    borderRadius: 25,
    paddingHorizontal: 15,
    width: "80%",
    marginBottom: 20,
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
    width: "80%",
  },

  button: {
    color: "#fff",
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.6,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
  resendContainer: {
    flexDirection: "row",
  },
  resendPromptText: {
    fontSize: 16,
    textAlign: "center",
    color: "#00000080",
  },
  resendLinkText: {
    fontSize: 16,
    textAlign: "center",
    color: "#0000ff",
  },
});

export default styles;
