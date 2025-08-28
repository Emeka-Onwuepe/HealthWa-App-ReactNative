import React, { useState } from "react";
import { View, Text, Button, Modal, Pressable, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Schedule({ navigation }) {
  // const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // const handleConfirm = (event, selectedDate) => {
  //   // setShowPicker(false);
  //   if (selectedDate) {
  //     setDate(selectedDate);
  //   }
  //   setShowDatePicker(false);
  //   setShowTimePicker(false);
  // };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) setTime(selectedTime);
    setShowTimePicker(false);
  };

  const handleSchedule = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>When do you want to schedule for?</Text>
      {/* <Pressable onPress={() => setShowPicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Pick Date & Time</Text>
      </Pressable> */}

      {/* {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleConfirm}
        />
      )} */}

      <View style={styles.buttonContainer}>
        <View style={styles.dateView}>
          {/* <Button
            title="Select Date"
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          /> */}
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonTxt}>Select Date</Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.date}>{date.toLocaleDateString()}</Text>
        </View>

        <View style={styles.dateView}>
          {/* <Button
            title="Select Time"
            onPress={() => setShowTimePicker(true)}
            style={styles.dateButton}
          /> */}
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.buttonTxt}>Select Time</Text>
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.date}>{time.toLocaleTimeString()}</Text>
        </View>
      </View>
      <Text style={styles.selectedText}>
        {/* Selected: {date.toLocaleDateString()} {time.toLocaleTimeString()} */}
      </Text>

      <Pressable onPress={handleSchedule} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Schedule</Text>
      </Pressable>

      <Modal
        visible={showPopup}
        transparent={false}
        style={styles.modal}
        animationType="slide"
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Your schedule has been successfully saved!
            </Text>
            <Button title="OK" onPress={handlePopupClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
