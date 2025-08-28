import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DrugCardProps {
  drug: string;
  prescription: string;
  image?: any; // React Native image source
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

export default function DrugCard({
  drug,
  prescription,
  image,
  onDelete = () => {},
  showDeleteButton = true,
}: DrugCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={image || require("../../assets/images/sample-drug.jpg")}
        style={styles.drugImage}
      />

      <View style={styles.textContainer}>
        <Text style={styles.drugName}>{drug}</Text>
        <Text style={styles.prescriptionText}>{prescription}</Text>
      </View>

      {showDeleteButton && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 8,
    paddingVertical: 4,
  },
  drugImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#5cb3d1",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  drugName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  prescriptionText: {
    color: "#00000080d",
    fontSize: 13,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
  },
});
