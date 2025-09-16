import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AppLayout from "../../../../components/layouts/app.layout";
import MultiSelect from "../../../../components/ui/MultiSelect";
import PageHeader from "../../../../components/ui/PageHeader";
import Select from "../../../../components/ui/Select";
import TextInput from "../../../../components/ui/TextInput";
import { APPOINTMENT_TYPE, AppointmentMode, Gender } from "../../../../types";
import { toTitleCase } from "../../../../utils/strings";
import { convertEnumToPickerObject } from "../../../../utils/type";
import styles from "./styles";


const symptomOptions = [
  { label: "Fever", value: "fever" },
  { label: "Cough", value: "cough" },
  { label: "Headache", value: "headache" },
  { label: "Sore Throat", value: "sore_throat" },
  { label: "Fatigue", value: "fatigue" },
  { label: "Shortness of Breath", value: "shortness_of_breath" },
  { label: "Muscle or Body Aches", value: "muscle_aches" },
  { label: "Nausea or Vomiting", value: "nausea_vomiting" },
  { label: "Diarrhea", value: "diarrhea" },
  { label: "Loss of Taste or Smell", value: "loss_of_taste_smell" },
  { label: "Runny or Stuffy Nose", value: "runny_nose" },
  { label: "Chills", value: "chills" },
  { label: "Dizziness", value: "dizziness" },
  { label: "Skin Rash", value: "skin_rash" },
  { label: "Abdominal Pain", value: "abdominal_pain" },
];

interface appointmentForm {
  full_name: string;
  symptoms: string[];
  type: string;
  preferred_professional: string;
  preferred_gender: string;
  mode: string;
  appointmentDate: string;
  appointmentTime: string;
}

export default function CreateAppointment() {
  const isLoading = false;
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

  const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

  const handleConfirm = (date:string) => {
      hideDatePicker();
    };




  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<appointmentForm>({
    defaultValues: {
      full_name: toTitleCase(user.full_name),
      type: APPOINTMENT_TYPE.INITIAL_CONSULTATION,
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: new Date().toISOString().split("T")[1],
    },
  });

  const typeItems = convertEnumToPickerObject(APPOINTMENT_TYPE);
  const genderItems = convertEnumToPickerObject(Gender);
  const modeItems = convertEnumToPickerObject(AppointmentMode);


  const onSubmit = (data: appointmentForm) => {
    console.log("Form data:", data);

    const combinedDateTime = new Date(data.appointmentDate);
    const timeDate = new Date(data.appointmentTime);

    combinedDateTime.setHours(
      timeDate.getHours(),
      timeDate.getMinutes(),
      timeDate.getSeconds()
    );


    const mutationData = {
      type: data.type,
      symptoms: data.symptoms,
      preferred_professional: data.preferred_professional,
      preferred_gender: data.preferred_gender,
      mode: data.mode,
      schedule: combinedDateTime,
    };

  };

  return (
    <AppLayout>
      <PageHeader title="Create Appointment" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Schedule a new appointment</Text>
        </View>

        <View>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="full_name"
                render={({ field }) => (
                  <TextInput
                    label="Patient Name"
                    placeholder="Type"
                    error={errors?.type?.message}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control} // From useForm()
                name="symptoms" // Your form field name
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    label="Select Symptoms"
                    data={symptomOptions}
                    selectedValues={value || []} // Ensure value is an array
                    onSelectionChange={onChange} // Pass the new array directly to react-hook-form
                    placeholder="Tap to select symptoms"
                    error={errors.symptoms?.message} // Display validation errors
                  />
                )}
              />
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <View>
                    <Select
                      label="Select type of appointment"
                      data={typeItems}
                      onValueChange={field.onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="preferred_gender"
                render={({ field }) => (
                  <View>
                    <Select
                      label="Select preferred gender"
                      data={genderItems}
                      onValueChange={field.onChange}
                    />
                  </View>
                )}
              />
            </View>

            {/* <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="appointmentDate"
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    label="Select Date"
                    value={value}
                    onChange={onChange}
                    mode="date"
                    minimumDate={new Date()}
                    error={errors.appointmentDate?.message}
                  />
                )}
              />
            </View> */}

             {/* Date Picker */}

        <View style={{ width: '100%' }}>
          <Text style = {{color: 'black',textAlign: 'left'}}>Select Date</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View style={{ marginBottom: 10,marginTop:10, borderColor: '#11B3CF',
              borderWidth:1, padding: 15, borderRadius: 15 }} >
              <Ionicons
                name="calendar-outline"
                size={20}
              />
              <Controller
                control={control}
                name="appointmentDate"
                rules={{ required: "Date is required" }}
                render={({ field: { value } }) => (
                  <Text>
                    {value || "Select Date"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.appointmentDate && (
            <Text>{errors.appointmentDate.message}</Text>
          )}
        </View>

            {/* Date Picker Modal */}
          {calendarVisible && (
             <View>
          <DateTimePicker
            value={new Date(getValues("appointmentDate"))}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setCalendarVisible(false);
              if (date) {
                setValue("appointmentDate", date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD 
              }
            }}
          />
        </View>
          )} 

          
        {/* Time Picker */}
        <View style={{ width: '100%' }}>
          <Text >Select Time</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <View style={{ marginBottom: 10,marginTop:10, borderColor: '#11B3CF',
              borderWidth:1, padding: 15, borderRadius: 15 }}  >
              <Ionicons
                name="time-outline"
                size={20}
              />
              <Controller
                control={control}
                name="appointmentTime"
                rules={{ required: "Time is required" }}
                render={({ field: { value } }) => (
                  <Text >
                    {value || "Select Time"}
                  </Text>
                )}
              />
            </View>
          </TouchableOpacity>

          {errors.appointmentTime && (
            <Text>{errors.appointmentTime.message}</Text>
          )}
        </View>

          {/* Time Picker Modal */}
          {showPicker && (
             <View>
          <DateTimePicker
            value={new Date(getValues("appointmentTime"))}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowPicker(false);
              if (time) {
                // Format time to "HH:mm"
                const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
                setValue("appointmentTime", formattedTime);
              }
            }}
          />
        </View>
          )}
        

            {/* <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="appointmentTime"
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    label="Select Time"
                    value={value}
                    onChange={onChange}
                    mode="time"
                    error={errors.appointmentTime?.message}
                  />
                )}
              />
            </View> */}

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="mode"
                render={({ field }) => (
                  <View>
                    <Select
                      label="Select mode"
                      data={modeItems}
                      onValueChange={field.onChange}
                    />
                  </View>
                )}
              />
            </View>

            <Pressable
              style={styles.buttonContainer}
              onPress={handleSubmit(onSubmit)}
              // disabled={createAppointmentMutation.isPending}
            >
              <Text style={styles.button}>
                {isLoading
                  ? "Booking appointment..."
                  : "Book Appointment"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
}
