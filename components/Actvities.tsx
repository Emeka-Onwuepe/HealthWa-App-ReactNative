import { Pressable, StyleSheet, View, Text } from "react-native";
import ActivityCard from "./ui/ActivitiesCard";

export default function Activities({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Activities</Text>
        <Pressable onPress={() => navigation.navigate("Activities")}>
          <Text style={styles.headerLink}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.activityList}>
        <ActivityCard />
        <ActivityCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  headerLink: {
    color: "#0B8AA0",
    fontSize: 14,
    fontWeight: "500",
  },
  activityList: {
    gap: 8,
  },
});
