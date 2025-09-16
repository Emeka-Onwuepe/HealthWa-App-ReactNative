import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import Button from "../../components/ui/Button";
// import DateTimePicker from "../../components/ui/DateTImePicker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { addAlert } from "@/integrations/features/alert/alertSlice";
import { usePatientMutation } from "@/integrations/features/apis/apiSlice";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import SelectInput from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { Gender } from "../../types";
import { convertEnumToPickerObject } from "../../utils/type";
import styles from "./styles";

const genderItems = convertEnumToPickerObject(Gender);
const ageRanges = [
  {
    label: "18-25",
    value: "18-25",
  },
  {
    label: "26-35",
    value: "26-35",
  },
  {
    label: "36-45",
    value: "36-45",
  },
  {
    label: "46-55",
    value: "46-55",
  },
  {
    label: "56-above",
    value: "56-above",
  },
];

const yesNoOptions = [
  {
    id: "true",
    label: "Yes",
    value: "true",
  },
  {
    id: "false",
    label: "No",
    value: "false",
  },
];


type FormData = {
  date_of_birth?: Date | string;
  gender: string;
  age_range?: string;
  occupation: string;
  weight: string;
  height: string;
  is_diabetic: boolean;
  is_asthmatic: boolean;
  on_long_term_meds: boolean;
  medications?: string;
};

export default function SetupPatientProfile() {
  // const { user, setUser } = useAuthStore();
    const navigation = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [patient, { isLoading }] = usePatientMutation();
    const [loading,setLoading] = useState(true)
    

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      gender: "",
      occupation: "",
      weight: "",
      height: "",
      is_diabetic: false,
      is_asthmatic: false,
      medications: "",
      on_long_term_meds: false,
      date_of_birth: new Date().toISOString().split("T")[0],

    },
  });

    useEffect(() => {
      if (user.logedin && !loading  && !isLoading) {
        if (user.verified_email  && user.gender != 'other') {
          navigation.replace("/home");
        } else if (!user.verified_email){
          navigation.replace("/OTPVerification");
        }
      }
    }, [loading,user]);
  
  
    useEffect(() => {
        if (user && loading) {
          setLoading(false);
        }
      }, [user]);

 
  const onSubmit = async (data:FormData) => {
    const data_ = {
      action: "create",
      usertoken:user.usertoken,
      data: {
      ...data,
      user_id: user.id,
       }
        }
         console.log(data_)
        let res = await patient(data_);
       
         if (res.data) {
              dispatch(
                loginUser({
                  ...res.data.user,
                  logedin: true,
                  save: true,
                })
              ); 
              
        
              if(res.data.user.gender != 'other') {
                navigation.replace("/home");
              }
        
        
        
            } else if (res.error) {
              dispatch(addAlert({ ...res.error, page: "patientSetupPage" }));
            }



      };


  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <PageHeader title="Patient Profile Setup" />

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Kindly take a few minutes to set up your profile for swift
            responses.
          </Text>
        </View>

        <View>
          <Text style={styles.sectionHeader}>Bio Data</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Full name</Text>
            <Text style={styles.value}>{user.full_name}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone_number}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)} 
          style={{ borderColor: "#11B3CF", borderWidth: 1, borderRadius: 50, 
                  marginTop: 10}}>
            <View style={[{ flexDirection: "row", alignItems: "center", padding: 10, marginLeft: 10 }]}>
              <Ionicons
              name="calendar-outline"
              size={20}
              style={{ marginRight: 8 }}
              />
              <Controller
              control={control}
              name="date_of_birth"
              render={({ field: { value } }) => (
                <Text>
                {value ? (typeof value === "string" ? value : value.toISOString().split("T")[0]) : ""}
                </Text>
              )}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
          {calendarVisible && (
             <View>
          <DateTimePicker
            value={new Date(getValues("date_of_birth") ?? new Date().toISOString().split("T")[0])}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setCalendarVisible(false);
              if (date) {
                setValue("date_of_birth", date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD 
              }
            }}
          />
        </View>
          )}



        <View>
          {/* <Controller
            control={control}
            name="date_of_birth"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="Date of Birth"
                value={typeof value === "string" || typeof value === "undefined" ? null : value}
                onChange={onChange}
                mode="date"
                maximumDate={getDateByYearsAgo(18)}
                minimumDate={getDateByYearsAgo(100)}
                labelStyle={{ fontFamily: fontFamily.regular }}
                containerStyle={{ fontFamily: fontFamily.regular }}
              />
            )}
          /> */}

              {/* <Controller
                control={control}
                name="date_of_birth"
                render={({ field: { value } }) => (
                  <Text>{value ? (typeof value === "string" ? value : value.toISOString().split("T")[0]) : ""}</Text>
                )}
              /> */}

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Gender"
                data={genderItems}
                onValueChange={onChange}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="age_range"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Age Range"
                data={ageRanges}
                onValueChange={onChange}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Height"
                placeholder="Enter your height in cm"
                value={value ?? ""}
                onChangeText={onChange}
                keyboardType="numeric"
                error={errors.height?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Weight"
                placeholder="Enter your weight in kg"
                value={value ?? ""}
                onChangeText={onChange}
                keyboardType="numeric"
                error={errors.height?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="occupation"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Occupation"
                placeholder="Occupation"
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.height?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="is_asthmatic"
            render={({ field: { onChange, value } }) => (
              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Are you asthmatic?</Text>
                <RadioGroup
                  radioButtons={yesNoOptions}
                  selectedId={value === true ? "true" : "false"}
                  onPress={(selectedId) => {
                    onChange(selectedId == "true");
                  }}
                  containerStyle={styles.radioGroup}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="is_diabetic"
            render={({ field: { onChange, value } }) => (
              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Are you diabetic?</Text>
                <RadioGroup
                  radioButtons={yesNoOptions}
                  selectedId={value === true ? "true" : "false"}
                  onPress={(selectedId) => {
                    onChange(selectedId == "true");
                  }}
                  containerStyle={styles.radioGroup}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="on_long_term_meds"
            render={({ field: { onChange, value } }) => (
              <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>
                  Are you on any long-term medication?
                </Text>
                <RadioGroup
                  radioButtons={yesNoOptions}
                  selectedId={value === true ? "true" : "false"}
                  onPress={(selectedId) => {
                    onChange(selectedId == "true");
                  }}
                  containerStyle={styles.radioGroup}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="medications"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="If yes, kindly list..."
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.height?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} loading={isLoading}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
