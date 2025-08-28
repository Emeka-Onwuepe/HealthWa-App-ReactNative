import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  headerTextContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  purposeTextContainer: {
    marginBottom: 24,
  },
  purposeText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#00000080",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonGroup: {
    gap: 24,
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  accountText: {
    fontSize: 16,
    color: "#666",
  },
  signInText: {
    color: "#4EABE7",
    fontWeight: "600",
  },
});

export default styles;
