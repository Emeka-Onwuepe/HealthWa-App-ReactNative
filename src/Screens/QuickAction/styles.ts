import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actionView: {
    marginTop: 60,
  },

  actionPoint: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  actionTxt: {
    fontSize: 20,
  },

  logoutTxt: {
    fontSize: 20,
    color: "red",
  },
});
export default styles;
