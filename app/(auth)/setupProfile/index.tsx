import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { z } from "zod";
// import { updateDoctorProfile } from "../../api/services/user.service";
import Button from "../../../components/ui/Button";
import PageHeader from "../../../components/ui/PageHeader";
import SelectInput from "../../../components/ui/Select";
import TextInput from "../../../components/ui/TextInput";
// import useAuthStore from "../../../store/auth";
import { Gender } from "../../../types";
// import { getApiErrorMessage } from "../../utils/errors";
import { useRouter } from "expo-router";

import { convertEnumToPickerObject } from "../../../utils/type";
import styles from "./styles";

const genderItems = convertEnumToPickerObject(Gender);

export default function SetupProfile() {
  const navigation = useRouter();
  const [licenseFile, setLicenseFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  // const { user, setUser, isDoctor } = useAuthStore();

  // const createValidationSchema = () => {
  //   let baseSchema = z.object({
  //     specialization: z.string().min(1, "Specialization is required"),
  //     gender: z.string().min(1, "Gender is required"),
  //     license_number: z.string().min(1, "License number is required"),
  //     years_of_experience: z.string().min(1, "Years of experience is required"),
  //     place_of_work: z.string().min(1, "Place of work is required"),
  //     city_of_practice: z.string().min(1, "City of practice is required"),
  //     state_of_practice: z.string().min(1, "State of practice is required"),
  //     region: z.string().optional(),
  //     time_zone: z.string().optional(),
  //     about_me: z.string().min(1, "About Me is required"),
  //   });

  //   return baseSchema;
  // };

  // const setupProfileSchema = createValidationSchema();

  // type SetupProfileForm = z.infer<typeof setupProfileSchema>;

  // Define the SetupProfileForm type
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
  };

  type user = {
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
    full_name?: string;
    phone_number?: string;
    email?: string;
  };

  const [user, setUser] = useState({
    specialization: "",
    gender: "",
    license_number: "",
    years_of_experience: "",
    place_of_work: "",
    city_of_practice: "",
    state_of_practice: "",
    region: "",
    time_zone: "",
    about_me: "",
    full_name: "",
    phone_number: "",
    email: "",
  });

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<SetupProfileForm>({
      defaultValues: {
        specialization: user?.specialization || "",
        gender: user?.gender || "",
        license_number: user?.license_number || "",
        years_of_experience: user?.years_of_experience?.toString() || "",
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

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setLicenseFile(result);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (data: SetupProfileForm) => {
  //     return updateDoctorProfile(data);
  //   },
  //   onSuccess: (response) => {
  //     setUser({ ...user, ...response.data.data });
  //     Toast.success("Profile setup completed successfully");
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [
  //           { name: "Profile" },
  //         ],
  //       })
  //     );
  //   },
  //   onError: (error) => {
  //     console.error("Error setting up profile:", error);
  //     const errorMessage = getApiErrorMessage(
  //       error,
  //       "Failed to setup profile. Please try again."
  //     );
  //     Toast.error(errorMessage);
  //   },
  // });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: SetupProfileForm) => {
    
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

          <Text style={styles.formLabel}>Upload license certificate*</Text>
          <Pressable onPress={handlePickDocument} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>
              {licenseFile?.assets?.[0]?.name ?? "Upload certificate"}
            </Text>
            <Ionicons
              name="document-attach-outline"
              size={24}
              color="#4A90E2"
            />
          </Pressable>

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
            loading={loading}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
