import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 20,
  },

  topProfile: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  profileWelcome: {
    fontSize: 16,
    marginBottom: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#11B3CF",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },

  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },

  uploadTxt: {
    fontSize: 14,
  },

  sectionHead: {
    fontSize: 20,
    color: "#11B3CF",
    marginBottom: 20,
  },

  profileSections: {
    width: "100%",
    marginBottom: 20,
  },

  profileData: {
    marginVertical: 10,
    alignItems: "flex-start",
  },

  profileLabel: {},

  dateInput: {
    width: "100%",
    marginVertical: 20,
    alignItems: "center",
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

  btnTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  profileResponse: {},

  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: "#11B3CF",
    marginHorizontal: 0,
    marginVertical: 10,
    borderRadius: 50,
    paddingLeft: 10,
    width: "100%",
  },

  medicationInput: {
    height: 30,
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginTop: 10,
    paddingLeft: 10,
    width: "100%",
  },

  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  radioButton: {
    marginRight: 10,
  },
});

export default styles;
