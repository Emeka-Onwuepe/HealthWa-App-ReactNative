import { StyleSheet, Text, View } from "react-native";
import { getDateFormat } from "../../utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ActivityCardProps {
  activity?: any;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.title}>Patient Consultation</Text>
          <Text style={styles.preview}>
            Part of the complaints and symptoms will appear here. Just a few
            characters.
          </Text>
          <Text style={styles.date}>{getDateFormat(new Date())}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#0B8AA0",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#222",
  },
  preview: {
    fontSize: 13,
    color: "#444",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
