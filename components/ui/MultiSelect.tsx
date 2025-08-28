import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MultiSelectOption {
  label: string;
  value: string | number;
}

interface MultiSelectProps {
  label?: string;
  data: MultiSelectOption[];
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
  placeholder?: string;
  labelStyle?: object;
  containerStyle?: object;
  error?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  data,
  selectedValues,
  onSelectionChange,
  placeholder = "Select items...",
  labelStyle,
  containerStyle,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleItem = (value: string | number) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelectedValues);
  };

  const renderItem = ({ item }: { item: MultiSelectOption }) => {
    const isSelected = selectedValues.includes(item.value);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleToggleItem(item.value)}
      >
        <Ionicons
          name={isSelected ? "checkbox" : "square-outline"}
          size={24}
          color={isSelected ? "#0B8AA0" : "#ccc"}
        />
        <Text style={styles.itemLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const displaySelectedLabels = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    return selectedValues
      .map((value) => data.find((item) => item.value === value)?.label)
      .filter(Boolean) // Remove undefined if a value doesn't match
      .join(", ");
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={[styles.inputContainer, error ? styles.errorBorder : null]}
      >
        <Text style={styles.inputText} numberOfLines={1} ellipsizeMode="tail">
          {displaySelectedLabels()}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color="#666" />
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || "Select Options"}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={styles.list}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: "100%" },
  label: { fontSize: 16, color: "#333", marginBottom: 8, fontWeight: "500" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderWidth: 0.5,
    borderColor: "#11B3CF",
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  inputText: { fontSize: 16, color: "#333", flex: 1, marginRight: 10 },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 5 },
  errorBorder: { borderColor: "red" },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  list: {},
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemLabel: { fontSize: 16, marginLeft: 10, color: "#333" },
});

export default MultiSelect;
