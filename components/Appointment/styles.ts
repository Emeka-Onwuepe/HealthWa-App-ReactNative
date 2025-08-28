import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8fa",
    borderRadius: 16,
    padding: 16,
    position: "relative",
    overflow: "hidden",
  },
  timerBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  timerText: {
    color: "#d63384",
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    marginBottom: 16,
  },
  profileSection: {
    marginRight: 16,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#7bc1e1",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#beaf9f",
  },
  detailsSection: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: "#e6f2f7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  appointmentType: {
    fontSize: 18,
    color: "#4a7f96",
    marginBottom: 4,
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a7f96",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feesContainer: {
    backgroundColor: "#d63384",
    borderRadius: 8,
    padding: 8,
    minWidth: 100,
  },
  feesLabel: {
    color: "white",
    fontSize: 16,
  },
  feesAmount: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  statusText: {
    color: "#4a7f96",
    fontSize: 16,
  },
  tokenContainer: {
    backgroundColor: "#5eb1dd",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    minWidth: 100,
  },
  tokenLabel: {
    color: "white",
    fontSize: 16,
  },
  tokenNumber: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  joinCallButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e6f2f7",
    marginTop: 10,
  },
  joinCallIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  joinCallText: {
    fontSize: 20,
    color: "#5eb1dd",
    fontWeight: "bold",
  },
});