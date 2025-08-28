import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
import { useLocalSearchParams, useRouter } from "expo-router";

// import {
//   resendEmailVerification,
//   verifyEmail,
// } from "../../api/services/auth.service";
import styles from "./styles";
// import { getApiErrorMessage } from "../../utils/errors";

// const verificationSchema = z.object({
//   otp: z.string().length(4, "OTP must be 4 digits"),
// });

// type VerificationFormData = z.infer<typeof verificationSchema>;

type FormData = {
  otp: string;
};

export default function Verification() {
  const route = useRouter();
  let { email } = useLocalSearchParams<{ email?: string }>();
  const [verify_loading, setVerifyLoading] = useState(false);
  const [resend_loading, setResendLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");

  // const verifyEmailMutation = useMutation({
  //   mutationFn: (data: { email: string; code: string }) => verifyEmail(data),
  //   onSuccess: (data) => {
  //     Toast.success("OTP verified successfully!");
  //     navigation.navigate("Login");
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     const errorMessage = getApiErrorMessage(error, "Failed to verify OTP");
  //     Toast.error(errorMessage);
  //   },
  // });

  // const resendOtpMutation = useMutation({
  //   mutationFn: (data: { email: string }) => resendEmailVerification(data),
  //   onSuccess: (data) => {
  //     console.log(data);
  //     Toast.success("A new OTP has been sent to you.");
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     const errorMessage = getApiErrorMessage(error, "Failed to resend OTP");
  //     Toast.error(errorMessage);
  //   },
  // });

  const onSubmit = () => {
  
  };

  const handleResendOtp = () => {
  
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTxt}>Verify Your Email</Text>

      <Text style={styles.welcomeText}>
        We sent a verification code to your email,{"\n"}
        please enter it here.
      </Text>

      <View style={styles.inputButton}>
        <View style={styles.inputContainer}>
          <View style={styles.dashContainer}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.dash}>
                <Text style={styles.dashText}>{otp ? otp[index] : ""}</Text>
              </View>
            ))}
          </View>
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => onChange(text.slice(0, 4))}
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={4}
                style={styles.hiddenInput}
              />
            )}
          />
        </View>
        {errors.otp && (
          <Text style={styles.errorText}>{errors.otp.message}</Text>
        )}

        <Pressable
          style={[
            styles.buttonContainer,
            (!isValid || verify_loading) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || verify_loading}
        >
          {verify_loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.button}>Submit</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendPromptText}>Didn't recieve the OTP? </Text>
        <Text
          style={styles.resendLinkText}
          onPress={!resend_loading ? handleResendOtp : undefined}
        >
          {resend_loading ? "Sending..." : "resend?"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
