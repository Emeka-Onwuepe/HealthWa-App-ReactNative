import { StyleSheet } from "react-native";
import { fontFamily } from "../../../../constants/typography";

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

  profileContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  profileEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: "#DDDDDD",
  },
  profileName: {
    textTransform: "capitalize",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileSpeciality: {
    fontSize: 18,
    color: "#555555",
    marginBottom: 16,
  },
  form: {
    marginBottom: 10,
    width: "100%",
  },
  formInputContainer: { paddingBottom: 10 },
  formInput: {
    borderWidth: 1,
    borderColor: "#11B3CF",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#666666",
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "400",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#11B3CF",
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 4,
    alignItems: "center",
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
