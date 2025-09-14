import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";


import { useLocalSearchParams, useRouter } from "expo-router";

import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useRegisterUserMutation } from "@/integrations/features/apis/apiSlice";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import Checkbox from "../../../components/ui/Checkbox";
import styles from "./styles";

interface SignupFormData {
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
  terms_accepted: boolean;
}

export default function Signup() {
  const navigation = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  console.log("Role from params:", role);

  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.logedin) {
      if (user.verified_phone_number) {
        navigation.navigate("/home");
      } else {
        navigation.navigate("/OTPVerification");
      }
    }
  }, [user]);

  // const signupMutation = useMutation({
  //   mutationFn: (data: SignupFormData) => register(data),
  //   onSuccess: (data) => {
  //     const userEmail = data?.data?.user?.email;
  //     if (userEmail) {
  //       alert("Signup successful! Please verify your email now.");
  //       navigation.navigate("Verification", { email: userEmail });
  //     } else {
  //       console.warn(
  //         "Signup success, but email not found in response for navigation."
  //       );
  //       alert(
  //         "Signup successful! Proceeding without email verification navigation."
  //       );
  //       navigation.navigate("Login");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Signup Error:", error);
  //     alert(`Signup failed: ${error.message || "Please try again."}`);
  //   },
  // });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      role: role || "patient",
      terms_accepted: false,
    },
  });

  // const handleSignup = async () => {

  // };

  const handleSignup = async (formdata: SignupFormData) => {
    if (formdata.terms_accepted) {
      const data = {
        email: formdata.email,
        phone_number: formdata.phone_number,
        password: formdata.password,
        role: formdata.role,
        full_name: formdata.full_name,
      };

      let res = await registerUser(data);
      console.log(res)
      if (res.data) {
        dispatch(
          loginUser({
            ...res.data.user,
            // usertoken: res.data.token,
            logedin: true,
            save: true,
          })
        );
        // dispatch(userRegistered());
        navigation.navigate("/OTPVerification");
      } else if (res.error) {
        dispatch(addAlert({ ...res.error, page: "signup" }));
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />

          <Text style={styles.welcomeText}>
            Join us on this amazing journey{"\n"} to seamless healthcare.
          </Text>

          <Text style={styles.headerTxt}>Sign up</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="full_name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                  />
                )}
              />
              {errors.full_name && (
                <Text style={styles.error}>{errors.full_name.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="phone_number"
                    keyboardType="numeric"
                    style={styles.input}
                    value={value || ""}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.phone_number && (
                <Text style={styles.error}>{errors.phone_number.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={value || ""}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Create Password"
                    style={styles.input}
                    secureTextEntry
                    value={value || ""}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.confirm_password && (
                <Text style={styles.error}>
                  {errors.confirm_password.message}
                </Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="terms_accepted"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Checkbox
                      label="I agree to the Terms and Conditions"
                      onValueChange={onChange}
                      checked={value}
                    />
                    {errors.terms_accepted && (
                      <Text style={styles.error}>
                        {errors.terms_accepted.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>

          <Pressable
            style={styles.buttonContainer}
            onPress={handleSubmit(handleSignup)}
            disabled={!isValid || loading}
          >
            <Text style={styles.button}>
              {loading ? "Signing up..." : "Sign up"}
            </Text>
          </Pressable>

          <Text style={styles.lowerTxt}>
            Do you have an account? You should{" "}
            <Text
              onPress={() => navigation.navigate("./login")}
              style={styles.lowerLink}
            >
              Log in{" "}
            </Text>
            first.
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
