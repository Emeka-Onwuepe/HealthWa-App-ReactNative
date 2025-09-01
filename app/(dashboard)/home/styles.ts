import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "white", 
  },
  pageHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  pageHeader: {
    fontSize: 24,
  },
  menuIcon: {},
  dashboardImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 100,
  },
  topDisplay: {
    backgroundColor: "#004652",
    // width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 30,
    flexDirection: "column",
    padding: 20,
    overflow: "hidden",
    // marginVertical: 20,
  },
  backgroundImage: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 150,
    opacity: 0.15,
    // resizeMode: "contain",
  },
  upperTxt: {
    marginBottom: "auto",
  },
  lowerTxt: {
    // marginTop: "auto",
  },
  taskTxt: {
    color: "#fff",
    fontSize: 20,
  },
  tagTxt: {
    color: "#fff",
    fontSize: 12,
  },
  tipHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  tipTxt: {
    color: "#fff",
    fontSize: 12,
  },

  actions: {
    // marginLeft: 20,
    paddingLeft: 20,
  },

  carouselCaption: {
    color: "#0B8AA0",
    fontWeight: "bold",
    fontSize: 14,
    marginVertical: 5,
    // paddingHorizontal: 20,
  },
  carouselView: {
    padding: 0,
    margin: 0,
  },
  carouselItems: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 150,
    height: 160,
    paddingVertical: 10,
    paddingHorizontal: 4,
    // backgroundColor: "blue",
  },
  img: {
    width: "100%",
    height: "90%",
    borderRadius: 20,
    // gap: 5,
  },
  carouselTitle: {
    fontWeight: "bold",
  },

  activityList: {
    marginVertical: 3,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },

  activity: {
    marginBottom: 3,
    fontWeight: "bold",
  },

  activityDetails: {
    marginBottom: 5,
  },

  activityDate: {
    fontWeight: "bold",
    fontSize: 10,
  },

  // Profile button
  profileButton: {
    marginRight: 10,
  },
  profileButtonImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default styles;
