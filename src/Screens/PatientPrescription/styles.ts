import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centeredMessage: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  infoText: {
    marginTop: 5,
    fontSize: 15,
    color: "#555",
    textAlign: "center",
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  patientCardWrapper: {
    paddingTop: 24,
  },
  prescriptionSection: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default styles;
