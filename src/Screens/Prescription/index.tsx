import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrescriptionStyles from "./styles";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PageHeader from "../../components/ui/PageHeader";
import AppLayout from "../../components/layouts/app.layout";

export default function Prescription() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const data = [
    {
      key: "6",
      component: (
        <View>
          <Text>jknxsmjkdc </Text>
        </View>
      ),
    },
    { key: "1", component: <Text>Follow-up</Text> },
    {
      key: "2",
      component: (
        <Pressable
          style={PrescriptionStyles.buttonContainer}
          onPress={() => showMode("date")}
        >
          <Text style={PrescriptionStyles.btnTxt}>Select Appointment Next Date</Text>
        </Pressable>
      ),
    },
    {
      key: "3",
      component: show && (
        <DateTimePicker
          value={date}
          mode={mode}
          // is24Hour={true}
          onChange={onChange}
        />
      ),
    },
    {
      key: "4",
      component: (
        <Text
          style={{
            borderRadius: 20,
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 40,
            borderColor: "#0B8AA0",
            textAlign: "center",
          }}
        >
          {date.toDateString()}
        </Text>
      ),
    },
    {
      key: "5",
      component: (
        <Pressable style={PrescriptionStyles.waitBtn}>
          <Text style={PrescriptionStyles.stopTxt}>Finish</Text>
        </Pressable>
      ),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={PrescriptionStyles.dateView}>{item.component}</View>
  );

  return (
    <AppLayout>
      <ScrollView>
        <PageHeader title="Prescription" />
      </ScrollView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          width: "100%",
          // alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      />
    </AppLayout>
  );
}
