import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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

  sectionView: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  sectionViewProfessionals: {
    marginLeft: 20,
    marginVertical: 20,
  },

  headerTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  messageInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0B8AA0",
    padding: 7,
    fontSize: 16,
  },

  carouselTitleView: {
    borderWidth: 1,
    borderColor: "#0B8AA0",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  carouselTitle: {
    color: "#0B8AA0",
  },

  radioGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  scheduleCall: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginVertical: 20,
  },

  callNow: {
    width: "50%",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#11B3CF",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  callLater: {
    width: "50%",
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#11B3CF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  callNowTxt: {
    color: "#11B3CF",
  },
  callLaterTxt: {
    color: "#fff",
  },
});
export default styles;
