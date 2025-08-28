import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginVertical: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#8DD1E1",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  conditionContainer: {
    backgroundColor: "#8DD1E1",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 8,
  },
  conditionText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
  },
  detailsContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D1D9E6",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailsColumn: {
    flex: 1,
    paddingHorizontal: 4,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  detailsValueContainer: {
    backgroundColor: "#EAF7FA",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
  },
  detailsValue: {
    fontSize: 16,
    color: "#666666",
  },
  divider: {
    height: 1,
    // backgroundColor: "#D1D9E6",
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  prescriptionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1D9E6",
  },
  prescriptionText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
  },
  notesContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1D9E6",
  },
  notesText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
  },
  errorText: {
    color: "#DC3545",
    fontSize: 14,
    marginTop: 3,
  }
});

export default styles;
