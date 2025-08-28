import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../components/ui/PageHeader";
import { Text, TextInput, View, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles";
import Button from "../../components/ui/Button";
import { Toast } from "toastify-react-native";
import { useUserProfile } from "../../hooks/useUserProfile";

const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, "Old password is required")
      .min(6, "Password must be at least 6 characters"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New passwords don't match",
    path: ["confirm_password"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { updatePassword } = useUserProfile();

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const res = await updatePassword({
        new_password: data.new_password,
        old_password: data.old_password,
      });

      console.log(res);

      Toast.success("Password changed successfully!");

      // clear form inputs
      reset();
    } catch (error) {
      console.log("Change Password Error:", JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PageHeader title="Change Password" />
        <View style={styles.header}>
          <Text style={styles.title}>Create new password</Text>
          <Text style={styles.subTitle}>
            Your new password must be different from previously used passwords.
          </Text>
        </View>

        <View>
          <View>
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Old password</Text>
                  <TextInput
                    placeholder="Enter your current password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.old_password && (
                    <Text style={styles.errorText}>
                      {errors.old_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New password</Text>
                  <TextInput
                    placeholder="Enter your new password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.new_password && (
                    <Text style={styles.errorText}>
                      {errors.new_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, value, onBlur } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm password</Text>
                  <TextInput
                    placeholder="Confirm your new password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    style={styles.input}
                    secureTextEntry
                  />
                  {errors.confirm_password && (
                    <Text style={styles.errorText}>
                      {errors.confirm_password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>
          <Button onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
