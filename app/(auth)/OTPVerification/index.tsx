import React, { useEffect } from "react";
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
import { useRouter } from "expo-router";

// import {
//   resendEmailVerification,
//   verifyEmail,
// } from "../../api/services/auth.service";
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useOTPMutation } from "@/integrations/features/apis/apiSlice";
import { verify } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import styles from "./styles";
// import { getApiErrorMessage } from "../../utils/errors";

// const verificationSchema = z.object({
//   otp: z.string().length(6, "OTP must be 6 digits"),
// });

// type VerificationFormData = z.infer<typeof verificationSchema>;

type FormData = {
  otp: string;
};

export default function Verification() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [OTP, { isLoading }] = useOTPMutation();

  const navigation = useRouter();
  // let { email } = useLocalSearchParams<{ email?: string }>();

  useEffect(() => {
    if (user.verified_email) {
      navigation.replace("/setupPatientProfile");
    }
  }, [user.verified_email]);

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

  const handleOtp = async(action:string) => {

   let data_ = { usertoken: user.usertoken, otp: "", action};
    if(action == 'verify_email'){
    data_.otp = otp

    }
    let res = await OTP(data_);
    console.log("OTP action success:", res);
    console.log(action)

    if (res.data) {
      if (action === 'get_otp') {
        console.log('get_otp')
        dispatch(
          addAlert({
            status: 200,
            message: res.data.message || "OTP Sent",
          })
        );
      }else{
        console.log('else')
        dispatch(
          addAlert({
            status: 200,
            message: res.data.message || "Email Verified",
          })
        );
        dispatch(verify('verified_email'));
        navigation.replace("/setupPatientProfile");
      }
      // setOtpSent(true);
      // setResendTimer(90);
    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "otp" }));
    }
  
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
            {[...Array(6)].map((_, index) => (
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
                onChangeText={(text) => onChange(text.slice(0, 6))}
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={6}
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
            (!isValid || isLoading) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit(()=>handleOtp('verify_email'))}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
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
          onPress={!isLoading ? ()=>handleOtp('get_otp') : undefined}
        >
          {isLoading ? "Sending..." : "resend?"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
