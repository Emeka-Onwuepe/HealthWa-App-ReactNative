import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 100,
  },

  welcomeTxt: {
    fontSize: 48,
  },

  health: {
    color: "#11B3CF",
  },

  tagline: {
    fontSize: 16,
  },
});

export default Styles;
