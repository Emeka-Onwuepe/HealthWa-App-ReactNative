import { StyleSheet } from "react-native";

const AppointmentStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white", // Example background color
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#E9ECEF",
    borderRadius: 30,
    // marginHorizontal: 20,
    marginVertical: 20,
    height: 45,
  },
  tabButton: {
    flex: 1, // Each button takes half the space
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 10,
  },
  activeTabButton: {
    backgroundColor: "#0B8AA0", // Active tab background color (your primary blue)
    borderRadius: 30, // Match container's radius for smooth pill effect
  },
  tabText: {
    fontSize: 14,
    color: "#6C757D", // Color for inactive text
    fontWeight: "500",
  },
  activeTabText: {
    fontSize: 14,
    color: "#FFFFFF", // Color for active text (white)
    fontWeight: "600",
  },
  contentContainer: {
    // padding: 20,
    // Add styles for your list content area
  },

  /// new
  loadingMoreText: {
    marginLeft: 8,
    color: "#0B8AA0",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#0B8AA0",
  },
  listContentContainer: {},
  footerContainer: {},
  emptyContainer: {},
  emptyText: {},
});

export default AppointmentStyles;
