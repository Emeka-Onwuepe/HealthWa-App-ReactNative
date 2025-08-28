import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePickerModal from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons"; // Or your preferred icon library
import { getDateFormat, getTwelveHourFormat } from "../../utils/date";

interface DateTimePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  mode?: "date" | "time" | "datetime";
  minimumDate?: Date;
  maximumDate?: Date;
  labelStyle?: object;
  containerStyle?: object;
  error?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  mode = "date",
  minimumDate,
  maximumDate,
  labelStyle,
  containerStyle,
  error,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMode, setCurrentMode] = useState<"date" | "time">(
    mode === "time" ? "time" : "date"
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");

    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      if (mode === "datetime" && currentMode === "date") {
        onChange(selectedDate);
        setCurrentMode("time");
        setShowPicker(true);
      } else {
        onChange(selectedDate);
        setShowPicker(false);
        setCurrentMode(mode === "time" ? "time" : "date"); // Reset mode for next time
      }
    }
  };

  const showMode = (pickerMode: "date" | "time") => {
    setCurrentMode(pickerMode);
    setShowPicker(true);
  };

  const displayValue = value
    ? mode === "time"
      ? getTwelveHourFormat(value)
      : mode === "date"
      ? getDateFormat(value)
      : `${getDateFormat(value)} ${getTwelveHourFormat(value)}`
    : `Select ${mode === "time" ? "Time" : "Date"}`;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Pressable
        onPress={() => showMode(mode === "time" ? "time" : "date")}
        style={[styles.inputContainer, error ? styles.errorBorder : null]}
      >
        <Text style={styles.inputText}>{displayValue}</Text>
        <Ionicons
          name={mode === "time" ? "time-outline" : "calendar-outline"}
          size={20}
          color="#666"
        />
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {showPicker && (
        <DateTimePickerModal
          value={value || new Date()}
          mode={currentMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
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
  inputText: { fontSize: 16, color: "#333" },
  errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 5 },
  errorBorder: { borderColor: "red" },
});

export default DateTimePicker;
