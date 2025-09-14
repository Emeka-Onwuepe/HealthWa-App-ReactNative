import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import SelectInput from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { Gender } from "../../types";


import { addAlert } from "@/integrations/features/alert/alertSlice";
import { usePractitionerMutation } from "@/integrations/features/apis/apiSlice";
import { addPatients } from "@/integrations/features/patient/patientsSlice";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { convertEnumToPickerObject } from "../../utils/type";
import styles from "./styles";

const genderItems = convertEnumToPickerObject(Gender);

export default function SetupProfile() {
  const navigation = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [calendarVisible, setCalendarVisible] = useState(false);
  // const [isLoading,setLoading] = useState(false)
  const [practitioner, { isLoading }] = usePractitionerMutation();


  type SetupProfileForm = {
    specialization: string;
    gender: string;
    license_number: string;
    years_of_experience: string;
    place_of_work: string;
    city_of_practice: string;
    state_of_practice: string;
    region?: string;
    time_zone?: string;
    about_me: string;
    date_of_birth?: Date | string;

  };

    const {
      control,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
      reset,
    } = useForm<SetupProfileForm>({
      defaultValues: {
        specialization: user?.specialization || "",
        gender: user?.gender || "",
        license_number: user?.license_number || "",
        years_of_experience: user?.years_of_experience?.toString() || "",
        date_of_birth: new Date().toISOString().split("T")[0],
        
        place_of_work: user?.place_of_work || "",
        city_of_practice: user?.city_of_practice || "",
        state_of_practice: user?.state_of_practice || "",
        region: user?.region || "",
        time_zone: user?.time_zone || "",
        about_me: user?.about_me || "",
      },
    });

  useEffect(() => {
    reset(undefined, { keepValues: true });
  }, [reset]);


    const onSubmit = async (data:SetupProfileForm) => {
      const data_ = {
        action: "create",
        usertoken:user.usertoken,
        data: {
        ...data,
        user_id: user.id,
         }
          }
           console.log(data_)
          let res = await practitioner(data_);
         
           if (res.data) {
                dispatch(
                  loginUser({
                    ...res.data.user,
                    logedin: true,
                    save: true,
                  })
                ); 
  
                dispatch(
                  addPatients({data:res.data.patient,save:true,})
                ); 
                
          
                if(res.data.user.gender != 'other') {
                  navigation.replace("/home");
                }
          
          
          
              } else if (res.error) {
                dispatch(addAlert({ ...res.error, page: "patientSetupPage" }));
              }
        };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageHeader title="Doctor Profile Setup" />

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Kindly take a few minutes to set up your professional profile.
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

        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Gender*"
                data={genderItems}
                onValueChange={onChange}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="specialization"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Area of specialization*"
                placeholder="Enter your specialization"
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.specialization?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="license_number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="License number*"
                placeholder="Input License number"
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.license_number?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          {/* <Text style={styles.formLabel}>Upload license certificate*</Text>
          <Pressable onPress={handlePickDocument} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>
              {licenseFile?.assets?.[0]?.name ?? "Upload certificate"}
            </Text>
            <Ionicons
              name="document-attach-outline"
              size={24}
              color="#4A90E2"
            />
          </Pressable> */}

          <Controller
            control={control}
            name="years_of_experience"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Years of experience*"
                placeholder="Years of experience"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                error={errors.years_of_experience?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="place_of_work"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Place of work*"
                placeholder="Enter your place of work"
                value={value}
                onChangeText={onChange}
                error={errors.place_of_work?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="city_of_practice"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="City of practice*"
                placeholder="Enter city of practice"
                value={value}
                onChangeText={onChange}
                error={errors.city_of_practice?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="state_of_practice"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="State of practice*"
                placeholder="Enter state of practice"
                value={value}
                onChangeText={onChange}
                error={errors.state_of_practice?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="about_me"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="About Me*"
                placeholder="Tell patients about your qualifications, experience, and approach"
                value={value}
                onChangeText={onChange}
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                labelStyle={styles.inputLabel}
                error={errors.about_me?.message}
                inputStyle={styles.multilineInput}
              />
            )}
          />

          {/* Common fields continued */}
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Region"
                placeholder="Enter region"
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.region?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Controller
            control={control}
            name="time_zone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Time zone"
                placeholder="Select time zone"
                value={value ?? ""}
                onChangeText={onChange}
                error={errors.time_zone?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
