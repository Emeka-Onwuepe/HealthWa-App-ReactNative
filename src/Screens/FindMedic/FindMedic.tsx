import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
// import BottomTabNav from "../../Components/BottomTabNav";
import Schedule from "../Schedule";
import BottomTabNav from "../../components/BottomTabNav";
// import MultiSelect from "react-native-multi-select";

const professionals = [
  {
    id: 1,
    title: "General Practitioner",
  },
  {
    id: 2,
    title: "Pediatrician",
  },
  {
    id: 3,
    title: "Cardiologist",
  },
  {
    id: 4,
    title: "Nephrologist",
  },
  {
    id: 5,
    title: "Endocrinologist",
  },
  {
    id: 6,
    title: "Pulmonologist",
  },
  {
    id: 7,
    title: "Dermatologist",
  },
  {
    id: 8,
    title: "Family Physician",
  },
  {
    id: 9,
    title: "Surgeon",
  },
  {
    id: 10,
    title: "Haematologist",
  },
  {
    id: 11,
    title: "Obstetrist&Gynaecologist",
  },
  {
    id: 12,
    title: "Gastroenterologist",
  },
];

export default function FindMedic({ navigation }) {
  const now = async () => {
    try {
      navigation.navigate("PleaseWait");

      await new Promise((resolve) => setTimeout(resolve, 3000));

      navigation.navigate("Paired");
    } catch (error) {
      console.error("Error searching for professionals:", error);
    }
  };

  const schedule = async () => {
    try {
      navigation.navigate("Schedule");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

  const [open, setOpen] = useState();
  const [selectedSymptom, setSelectedSymptom] = useState([]);
  const [gender, setGender] = useState<string | undefined>();

  const [items, setItems] = useState([
    { value: "headache", label: "Headache" },
    { value: "cold", label: "Cold" },
    { value: "runnyNose", label: "Runny Nose" },
    { value: "runnyStomach", label: "Runny Stomach" },
    { value: "bitterTaste", label: "Bitter Taste" },
    { value: "dizziness", label: "Dizziness" },
    { value: "itchyEyes", label: "Itchy Eyes" },
    { value: "none", label: "None of the above" },
  ]);

  const proGender: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Male",
        value: "male",
      },
      {
        id: "2",
        label: "Female",
        value: "female",
      },

      {
        id: "3",
        label: "Anybody",
        value: "anybody",
      },
    ],
    []
  );

  const data = [
    { id: "symptomsPicker" },
    { id: "textInput" },
    { id: "professionalsList" },
    { id: "genderRadio" },
    { id: "callTime" },
  ];

  const renderItem = ({ item }) => {
    switch (item.id) {
      case "symptomsPicker":
        return (
          <View style={styles.sectionView}>
            <Text style={styles.headerTxt}>
              What common symptoms do you have?
            </Text>
            <View style={[styles.input, { zIndex: 20 }]}>
              <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={selectedSymptom}
                setValue={setSelectedSymptom}
                items={items}
                setItems={setItems}
                multiple={true}
                placeholder="Choose at least one symptom"
                mode="BADGE"
                listMode="SCROLLVIEW"
                containerStyle={{
                  backgroundColor: "transparent",
                  borderRadius: 5,
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  zIndex: 20,
                }}
                style={{
                  borderColor: "transparent",
                  backgroundColor: "transparent",
                }}
              />
            </View>
          </View>
        );
      case "textInput":
        return (
          <View style={styles.sectionView}>
            <Text style={styles.headerTxt}>Write more symptoms</Text>
            <TextInput
              placeholder="Tell us more about how you feel."
              style={styles.messageInput}
              multiline={true}
            />
          </View>
        );
      case "professionalsList":
        return (
          <View style={styles.sectionViewProfessionals}>
            <Text style={styles.headerTxt}>Preferred Professional</Text>
            <FlatList
              data={professionals}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable style={styles.carouselTitleView}>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        );
      case "genderRadio":
        return (
          <View style={styles.sectionView}>
            <Text style={styles.headerTxt}>Preferred Gender</Text>
            <View style={styles.radioGroup}>
              <RadioGroup
                radioButtons={proGender}
                onPress={setGender}
                selectedId={gender}
                containerStyle={styles.radioGroup}
              />
            </View>
          </View>
        );
      case "callTime":
        return (
          <View style={styles.sectionView}>
            <Text style={styles.headerTxt}>Call Time</Text>

            <View style={styles.scheduleCall}>
              <Pressable style={styles.callNow} onPress={now}>
                <Text style={styles.callNowTxt}>Now!</Text>
              </Pressable>
              <Pressable style={styles.callLater} onPress={schedule}>
                <Text style={styles.callLaterTxt}>Schedule</Text>
              </Pressable>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ marginVertical: 0 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
