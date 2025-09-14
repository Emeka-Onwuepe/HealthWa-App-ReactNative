
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

export default function UserProfile() {
  const navigation = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState(new Date());

  const [selectedAge, setSelectedAge] = useState();

  const yesNoButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Yes",
        value: "yes",
      },
      {
        id: "2",
        label: "No",
        value: "no",
      },
    ],
    []
  );

  const genderButtons: RadioButtonProps[] = useMemo(
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
    ],
    []
  );

  const [diabeticSelectedId, setDiabeticSelectedId] = useState<
    string | undefined
  >();

  const [asthmaticSelectedId, setAsthmaticSelectedId] = useState<
    string | undefined
  >();

  const [medicationId, setMedicationId] = useState<string | undefined>();

  const [gender, setGender] = useState<string | undefined>();

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const saveProfile = () => {
    // alert("Profile submitted successfully.");
    // navigation.navigate("/home");
    // const userData = {
    //   profileImage,
    //   // fullName,
    //   // phone,
    //   // email,
    //   dob,
    //   diabeticSelectedId,
    //   asthmaticSelectedId,
    //   medicationId,
    //   gender,
    // };

    // console.log("User Data:", userData);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topProfile}>
            <Text style={styles.profileWelcome}>
              Kindly take a few minutes to set up your{"\n"} profile for swift
              responses.
            </Text>

            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Pressable
                onPress={handleImagePicker}
                style={styles.uploadButton}
              >
                <FontAwesomeIcon  icon='user' size={25} color="black" />
                <Text style={styles.uploadTxt}>Upload Image</Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.sectionHead}>Bio Data</Text>

          <View style={styles.profileSections}>
            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Full Name</Text>
              <Text style={styles.profileResponse}>{}</Text>
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Phone</Text>
              <Text style={styles.profileResponse}>{}</Text>
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Email</Text>
              <Text style={styles.profileResponse}>{}</Text>
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Date of Birth</Text>

              {dob.toLocaleDateString() !== new Date().toLocaleDateString() && (
                <Text style={{}}>{dob.toLocaleDateString()}</Text>
              )}

              <View style={styles.dateInput}>
                <Pressable
                  style={styles.buttonContainer}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.btnTxt}>Select Date of Birth</Text>
                </Pressable>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Gender</Text>

              <View style={styles.radioGroup}>
                <RadioGroup
                  radioButtons={genderButtons}
                  onPress={setGender}
                  selectedId={gender}
                  containerStyle={styles.radioGroup}
                  labelStyle={styles.radioButton}
                />
              </View>
            </View>

            <View style={styles.input}>
              <Picker
                selectedValue={selectedAge}
                onValueChange={(itemValue) => setSelectedAge(itemValue)}
              >
                <Picker.Item label="Selecte Age Range" value="" />
                <Picker.Item label="18-25" value="18-25" />
                <Picker.Item label="26-35" value="26-35" />
                <Picker.Item label="36-45" value="36-45" />
                <Picker.Item label="46-55" value="46-55" />
                <Picker.Item label="56-above" value="56-above" />
              </Picker>
            </View>

            <View>
              <TextInput placeholder="Weight" style={styles.input} />
            </View>

            <View>
              <TextInput placeholder="Height" style={styles.input} />
            </View>

            <View>
              <TextInput placeholder="Occupation" style={styles.input} />
            </View>
          </View>

          <Text style={styles.sectionHead}>Medical History</Text>

          <View style={styles.profileSections}>
            <View>
              <TextInput placeholder="Blood Group" style={styles.input} />
            </View>

            <View>
              <TextInput placeholder="Genotype" style={styles.input} />
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Are you diabetic?</Text>

              <View style={styles.radioGroup}>
                <RadioGroup
                  radioButtons={yesNoButtons}
                  onPress={setDiabeticSelectedId}
                  selectedId={diabeticSelectedId}
                  containerStyle={styles.radioGroup}
                  labelStyle={styles.radioButton}
                />
              </View>
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>Are you asthmatic?</Text>

              <View style={styles.radioGroup}>
                <RadioGroup
                  radioButtons={yesNoButtons}
                  onPress={setAsthmaticSelectedId}
                  selectedId={asthmaticSelectedId}
                  containerStyle={styles.radioGroup}
                  labelStyle={styles.radioButton}
                />
              </View>
            </View>

            <View style={styles.profileData}>
              <Text style={styles.profileLabel}>
                Are you on any long-term medication?
              </Text>

              <View style={styles.radioGroup}>
                <RadioGroup
                  radioButtons={yesNoButtons}
                  onPress={setMedicationId}
                  selectedId={medicationId}
                  containerStyle={styles.radioGroup}
                  labelStyle={styles.radioButton}
                />
              </View>

              <TextInput
                placeholder="If yes, kindly list..."
                style={styles.medicationInput}
              />
            </View>
          </View>
          <Pressable style={styles.buttonContainer} onPress={saveProfile}>
            <Text style={styles.btnTxt}>Save Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
