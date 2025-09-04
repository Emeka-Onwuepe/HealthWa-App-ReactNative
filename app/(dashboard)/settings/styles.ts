import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileSpeciality: {
    fontSize: 16,
  },

  // items
  settingsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: "hidden",
    borderColor: "#EEEEEE",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemIcon: {
    width: 30,
    alignItems: "center",
    marginRight: 15,
  },
  settingsItemText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#DC3545",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
