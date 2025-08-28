import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,

    paddingVertical: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },

  dateView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dateButton: {
    backgroundColor: "#11B3CF",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonTxt: {
    color: "#fff",
  },

  date: {
    fontSize: 16,
    fontWeight: "bold",
  },

  selectedText: {},

  button: {
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

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#fff",
    textAlign: "center",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  popupContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
  },

  popup: {
    justifyContent: "center",
    alignItems: "center",
  },

  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default styles;
