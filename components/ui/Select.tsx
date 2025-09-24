import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { fontFamily } from "../../constants/typography";

interface SelectProps {
  label?: string;
  labelStyle?: any;
  data: { label: string; value: string | number }[];
  onValueChange: (value: string) => void;
  error?: string;
}

export default function Select({
  label,
  labelStyle,
  data,
  onValueChange,
  error,
}: SelectProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <RNPickerSelect
        onValueChange={(value) => onValueChange(value)}
        items={data}
        style={pickerSelectStyles}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  inputBase: {
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    color: "#333",
    fontFamily: fontFamily.regular,
  },
  viewContainerBase: {
    borderWidth: 0.5,
    borderColor: "#11B3CF",
    marginVertical: 10,
    borderRadius: 50,
    fontFamily: fontFamily.regular,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "400",
    fontFamily: fontFamily.regular,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: fontFamily.light,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styles.inputBase,
  },
  inputAndroid: {
    ...styles.inputBase,
  },
  viewContainer: {
    ...styles.viewContainerBase,
  },
  placeholder: {
    color: "#9EA0A4",
  },
});
