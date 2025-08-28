import AppLayout from "../../components/layouts/app.layout";
import PageHeader from "../../components/ui/PageHeader";
import { z } from "zod";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/ui/TextInput";

import styles from "./styles";
import { APPOINTMENT_TYPE, AppointmentMode, Gender } from "../../types";
import useAuthStore from "../../store/auth";
import { toTitleCase } from "../../utils/strings";
import Select from "../../components/ui/Select";
import { convertEnumToPickerObject } from "../../utils/type";
import DateTimePicker from "../../components/ui/DateTImePicker";
import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../../api/services/appointment.service";
import MultiSelect from "../../components/ui/MultiSelect";
import { Toast } from "toastify-react-native";

export const createAppointmentSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  type: z
    .nativeEnum(APPOINTMENT_TYPE)
    .default(APPOINTMENT_TYPE.INITIAL_CONSULTATION),
  symptoms: z.array(z.string()),
  preferred_professional: z.string().optional(),
  preferred_gender: z.string().optional(),
  mode: z.nativeEnum(AppointmentMode).default(AppointmentMode.ONLINE),
  appointmentDate: z
    .date()
    .min(new Date(), { message: "Date cannot be in the past" }),
  appointmentTime: z.date(),
});

export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;

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

export default function CreateAppointment() {
  const { user, accessToken, refreshToken } = useAuthStore();
  console.log(accessToken, refreshToken);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      full_name: toTitleCase(user.full_name),
      type: APPOINTMENT_TYPE.INITIAL_CONSULTATION,
      appointmentDate: new Date(),
      appointmentTime: new Date(),
    },
  });

  const typeItems = convertEnumToPickerObject(APPOINTMENT_TYPE);
  const genderItems = convertEnumToPickerObject(Gender);
  const modeItems = convertEnumToPickerObject(AppointmentMode);

  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentFormData) => createAppointment(data),
    onSuccess: (data) => {
      console.log("Appointment booked successfully:", data);
      Toast.success("Appointment booked successfully!");
      reset();
    },
  });

  console.log(errors);
  const onSubmit = (data: CreateAppointmentFormData) => {
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

    createAppointmentMutation.mutate(mutationData);
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

            <View style={styles.inputContainer}>
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
            </View>
            <View style={styles.inputContainer}>
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
            </View>

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
                {createAppointmentMutation.isPending
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
