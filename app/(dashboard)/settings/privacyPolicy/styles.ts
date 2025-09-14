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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    marginBottom: 30,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
});

export default styles;
