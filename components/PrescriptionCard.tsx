import { StyleSheet, View, Text } from "react-native";
import { getDateFormat } from "../utils/date";
import DrugCard from "./DrugCard";

export default function PrescriptionCard({ prescription }) {
  return (
    <View>
      <Text style={styles.date}>
        {getDateFormat(new Date(prescription.createdAt))}
      </Text>

      <View>
        {prescription.prescriptions.map((item, index) => (
          <DrugCard
            drug={item.drug}
            prescription={item.prescription}
            showDeleteButton={false}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    paddingVertical: 8,
  },
  drug: {
    fontSize: 18,
  },
  prescription: {
    color: "#00000080",
    fontSize: 13,
  },
});
