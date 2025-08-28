import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CheckboxProps {
  label: string;
  onValueChange?: (value: boolean) => void;
  checked?: boolean;
  containerStyle?: any;
  checkboxStyle?: any;
  textStyle?: any;
}

const Checkbox = ({
  label,
  onValueChange,
  checked = false,
  containerStyle,
  checkboxStyle,
  textStyle,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onValueChange && onValueChange(newValue);
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <View
        style={[styles.checkbox, checkboxStyle, isChecked && styles.checked]}
      >
        {isChecked && <View style={styles.checkmark} />}
      </View>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: "#11B3CF",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#11B3CF",
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "white",
    transform: [{ rotate: "-45deg" }],
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});

export default Checkbox;
