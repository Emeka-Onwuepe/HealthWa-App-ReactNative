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
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 18,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 6,
  },
  answerText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  footer: {
    marginTop: 16,
    marginBottom: 30,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default styles;
