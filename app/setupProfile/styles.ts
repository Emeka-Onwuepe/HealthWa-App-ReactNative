import { StyleSheet } from "react-native";
import { fontFamily } from "../../constants/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    fontFamily: fontFamily.regular,
  },
  formContainer: {
    // paddingHorizontal: 20,
    // paddingBottom: 30,
  },
  formLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 30,
    padding: 16,
    marginBottom: 16,
    marginTop: 4,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#666",
  },
  inputField: {
    marginBottom: 16,
    borderRadius: 30,
    borderColor: "#E1E1E1",
    paddingHorizontal: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
    paddingTop: 12,
    borderRadius: 30,
  },

  sectionHeader: {
    color: "#11B3CF",
    textAlign: "center",
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: "column",
    gap: 2,
    marginBottom: 15,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  value: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: "#00000080",
  },
});

export default styles;
