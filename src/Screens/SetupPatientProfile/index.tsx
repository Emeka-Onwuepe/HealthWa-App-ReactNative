import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import { Toast } from "toastify-react-native";
import { z } from "zod";
import { setupPatientProfile } from "../../api/services/user.service";
import Button from "../../components/ui/Button";
import DateTimePicker from "../../components/ui/DateTImePicker";
import PageHeader from "../../components/ui/PageHeader";
import SelectInput from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { fontFamily } from "../../constants/typography";
import useAuthStore from "../../store/auth";
import { Gender } from "../../types";
import { getDateByYearsAgo, isAdult } from "../../utils/date";
import { getApiErrorMessage } from "../../utils/errors";
import { convertEnumToPickerObject } from "../../utils/type";
import styles from "./styles";
import { CommonActions } from "@react-navigation/native";

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

const SetupUserProfileFormSchema = z.object({
  date_of_birth: z.coerce.date().refine((date) => isAdult(date), {
    message: "You must be at least 18 years old",
  }),
  gender: z.string(),
  age_range: z.string(),
  occupation: z.string().min(1, "Occupation is required"),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  is_diabetic: z.boolean().default(false),
  is_asthmatic: z.boolean().default(false),
  on_long_term_meds: z.boolean().default(false),
  medications: z.string().optional(),
});

type SetupUserProfileFormData = z.infer<typeof SetupUserProfileFormSchema>;

export default function SetupPatientProfile({ navigation }) {
  const { user, setUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupUserProfileFormData>({
    resolver: zodResolver(SetupUserProfileFormSchema),
    defaultValues: {
      gender: "",
      occupation: "",
      weight: "",
      height: "",
      is_diabetic: false,
      is_asthmatic: false,
    },
  });

  // setup mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SetupUserProfileFormData) => {
      return setupPatientProfile({
        ...data,
        date_of_birth: new Date(data.date_of_birth),
        weight: parseInt(data.weight),
        height: parseInt(data.height),
      });
    },
    onSuccess: (response) => {
      setUser({ ...user, ...response.data.data });
      Toast.success("Profile setup successful!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Profile" }],
        })
      );
    },
    onError: (error) => {
      console.error("Error setting up profile:", error);
      const errorMessage = getApiErrorMessage(
        error,
        "Failed to setup profile. Please try again."
      );
      Toast.error(errorMessage);
    },
  });

  const onSubmit = async (values: SetupUserProfileFormData) => {
    console.log("Form values:", values);
    mutate(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                label="Date of Birth"
                value={value}
                onChange={onChange}
                mode="date"
                maximumDate={getDateByYearsAgo(18)}
                minimumDate={getDateByYearsAgo(100)}
                labelStyle={{ fontFamily: fontFamily.regular }}
                containerStyle={{ fontFamily: fontFamily.regular }}
              />
            )}
          />

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
                value={value}
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
                value={value}
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
                value={value}
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
                value={value}
                onChangeText={onChange}
                error={errors.height?.message}
                labelStyle={styles.inputLabel}
              />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)} loading={isPending}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
