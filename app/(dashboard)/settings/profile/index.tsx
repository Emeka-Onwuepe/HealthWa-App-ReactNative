// import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { z } from "zod";
// import { useUserProfile } from "../../../../src/hooks/useUserProfile";
// import useAuthStore from "../../../../src/store/auth";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useRouter } from "expo-router";
import Button from "../../../../components/ui/Button";
import PageHeader from "../../../../components/ui/PageHeader";
import { getAvatarUrl } from "../../../../utils/avatars";
import styles from "./styles";

// const updateProfileSchema = z.object({
//   email: z.string().email(),
//   phone_number: z.string(),
//   gender: z.string(),
//   speciality: z.string().optional(),
//   years_of_experience: z.string().optional(),
//   license_number: z.string().optional(),
//   about_me: z.string().optional(),
// });

// export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface FormData {
  email: string;
  phone_number: string;
  gender: string;
  speciality: string;
  years_of_experience: number;
  license_number: string;
  about_me: string;
}

export default function Profile() {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode

  const navigation = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  // const { user, setUser } = useAuthStore();

  const avatarUrl = getAvatarUrl(user.full_name);

  const isDoctor = user.user_role === "practitioner" ? "doctor" : "";
  const title = isDoctor ? "Dr. " : "";
  const imageSource = user.profile_image
    ? { uri: user.profile_image }
    : { uri: avatarUrl };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender ?? "",
      speciality: user.specialization ?? "",
      years_of_experience: user.years_of_experience ?? 0,
      about_me: user.about_me ?? "",
      license_number: user.license_number ?? "",
    },
  });

  // const { updateProfile, uploadProfileImage } = useUserProfile();

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      mediaTypes: "images",
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
      handleImageUpload(uri);
    }
  };

  const handleImageUpload = async (uri: string) => {
    // const formData = new FormData();
    // const filename = uri.split("/").pop();
    // const match = /\.(\w+)$/.exec(filename);
    // const type = match ? `image/${match[1]}` : `image`;
    // formData.append("file", {
    //   uri,
    //   name: filename,
    //   type,
    // } as unknown as Blob);
    // try {
    //   const res = await uploadProfileImage(formData);
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleUpdateProfile = async (data: FormData) => {
    // try {
    //   const res = await updateProfile(data);
    //   Toast.success("Your profile information has been updated");
    //   // Update user data
    //   // setUser(res.data);
    //   reset({
    //     email: res.data.email,
    //     phone_number: res.data.phone_number,
    //     gender: res.data.gender ?? "",
    //     speciality: res.data.speciality ?? "",
    //     years_of_experience: res.data.years_of_experience ?? "",
    //     about_me: res.data.about_me ?? "",
    //     license_number: res.data.license_number ?? "",
    //   });
    //   setIsEditing(false); // Switch back to view mode
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>
          <PageHeader title="Profile" />
        </Text>
        <View style={styles.profileContainer}>
          <Pressable onPress={handlePickImage} style={styles.profileEdit}>
            <Image source={imageSource} style={styles.profileImage} />
          </Pressable>
          <Text style={styles.profileName}> {title + user.full_name}</Text>
          {isDoctor ? (
            <Text style={styles.profileSpeciality}>{user.specialization}</Text>
          ) : null}
        </View>

        <View style={styles.form}>
          {!isEditing ? (
            // View Mode with consistent template
            <View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{user.email}</Text>
              </View>

              <View style={styles.valueContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>{user.phone_number}</Text>
              </View>

              <View style={styles.valueContainer}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>
                  {user.gender || "Not specified"}
                </Text>
              </View>

              {isDoctor && (
                <>
                  <View style={styles.valueContainer}>
                    <Text style={styles.label}>Specialization</Text>
                    <Text style={styles.value}>
                      {user.specialization || "Not specified"}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.label}>Work Experience</Text>
                    <Text style={styles.value}>
                      {user.years_of_experience || "Not specified"}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.label}>License Number</Text>
                    <Text style={styles.value}>
                      {user.license_number || "Not specified"}
                    </Text>
                  </View>

                  <View style={styles.valueContainer}>
                    <Text style={styles.label}>About Me</Text>
                    <Text style={styles.value}>
                      {user.about_me || "No information provided"}
                    </Text>
                  </View>
                </>
              )}

              <View style={styles.editButton}>
                <Button onPress={() => setIsEditing(true)}>
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </Button>
              </View>
            </View>
          ) : (
            // Edit Mode
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                      placeholder="Email"
                      style={styles.formInput}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="default"
                      editable={false}
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text style={styles.formLabel}>Phone Number</Text>
                    <TextInput
                      placeholder="Phone Number"
                      style={styles.formInput}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="default"
                    />
                  </View>
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text style={styles.formLabel}>Gender</Text>
                    <TextInput
                      placeholder="Gender"
                      style={styles.formInput}
                      value={value}
                      onChangeText={onChange}
                      keyboardType="default"
                    />
                  </View>
                )}
              />
              {isDoctor && (
                <>
                  <Controller
                    control={control}
                    name="speciality"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Text style={styles.formLabel}>Speciality</Text>
                        <TextInput
                          placeholder="Speciality"
                          style={styles.formInput}
                          value={value}
                          onChangeText={onChange}
                          keyboardType="default"
                        />
                      </View>
                    )}
                  />
                  <Controller
                    control={control}
                    name="years_of_experience"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Text style={styles.formLabel}>Work Experience</Text>
                        <TextInput
                          placeholder="Work Experience"
                          style={styles.formInput}
                          value={value.toString()}
                          onChangeText={onChange}
                          keyboardType="default"
                        />
                      </View>
                    )}
                  />
                  <Controller
                    control={control}
                    name="license_number"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Text style={styles.formLabel}>License Number</Text>
                        <TextInput
                          placeholder="License Number"
                          style={styles.formInput}
                          value={value}
                          onChangeText={onChange}
                          keyboardType="default"
                        />
                      </View>
                    )}
                  />
                  <Controller
                    control={control}
                    name="about_me"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <Text style={styles.formLabel}>About Me</Text>
                        <TextInput
                          placeholder="About Me"
                          style={styles.formInput}
                          value={value}
                          onChangeText={onChange}
                          keyboardType="default"
                          multiline={true}
                          numberOfLines={7}
                        />
                      </View>
                    )}
                  />
                </>
              )}
              <Button onPress={handleSubmit(handleUpdateProfile)}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
