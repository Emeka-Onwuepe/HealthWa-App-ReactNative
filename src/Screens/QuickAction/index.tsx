import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";

export default function QuickAction({ navigation }) {
  const findMedic = () => {
    navigation.navigate("FindMedic");
  };

  const activities = () => {
    navigation.navigate("Activities");
  };

  const upcomingAppointments = () => {
    navigation.navigate("Upcoming Appointments");
  };

  const settings = () => {
    navigation.navigate("Settings");
  };

  const handleLogout = async () => {
    try {
      // await AsyncStorage.removeItem("authToken");
      console.log("User logged out");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.actionView}>
      <Pressable style={styles.actionPoint} onPress={findMedic}>
        <Text style={styles.actionTxt}>Find a Medical Worker</Text>
        <FontAwesomeIcon icon={faChevronRight} size={15} />
      </Pressable>

      <Pressable style={styles.actionPoint} onPress={activities}>
        <Text style={styles.actionTxt}>Activities</Text>
        <FontAwesomeIcon icon={faChevronRight} size={15} />
      </Pressable>

      <Pressable style={styles.actionPoint} onPress={upcomingAppointments}>
        <Text style={styles.actionTxt}>Upcoming Appointments</Text>
        <FontAwesomeIcon icon={faChevronRight} size={15} />
      </Pressable>

      <Pressable style={styles.actionPoint} onPress={settings}>
        <Text style={styles.actionTxt}>Settings</Text>
        <FontAwesomeIcon icon={faChevronRight} size={15} />
      </Pressable>

      <Pressable
        style={styles.actionPoint}
        // style={{ marginVertical: 20, padding: 10, alignItems: "center" }}
        onPress={handleLogout}
      >
        <Text style={styles.logoutTxt}>Logout</Text>
      </Pressable>
    </View>
  );
}
