import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    color: "#00000080",
  },

  inputGroup: {
    marginVertical: 10,
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
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",
  },

  errorText: {
    color: "#DC3545",
    fontSize: 14,
    marginTop: 3,
  },
});

export default styles;
