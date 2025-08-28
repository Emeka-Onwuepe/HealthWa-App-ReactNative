import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";

// import logo from "../../../assets/images/logo.png";
// import logo from "../../../assets/images/logo.png";

// import { login } from "../../api/services/auth.service";
import Checkbox from "../../../components/ui/Checkbox";
// import useAuthStore from "../../store/auth";
import styles from "./styles";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(50, "Password must be less than 50 characters"),
//   remember_me: z.boolean().optional().default(false),
// });

// export type LoginFormData = z.infer<typeof loginSchema>;

type FormData = {
  email: string;
  password: string;
  remember_me: false;
};

export default function Login() {
  const navigation = useRouter();

  const [loading,setLoading] = useState(false)
  // const authStore = useAuthStore();

  // const loginMutation = useMutation({
  //   mutationFn: (credentials: LoginFormData) =>
  //     login({
  //       email: credentials.email,
  //       password: credentials.password,
  //       remember_me: credentials.remember_me,
  //     }),
  //   onSuccess: (data) => {
  //     const user = data.data.user;
  //     const tokens = data.data.tokens;

  //     authStore.login(user, tokens.accessToken, tokens.refreshToken);

  //     Toast.success("Login successful!");
  //   },
  //   onError: (error) => {
  //     console.error("Login failed:", error);
  //     Toast.error("Login failed. Please check your credentials.");
  //   },
  // });

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginFormData>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     remember_me: false,
  //   },
  // });

  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const handleLogin = async () => {
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.headerTxt}>Log in to continue</Text>

      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
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
                placeholder="Password"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                secureTextEntry
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>

        <View style={styles.rememberContainer}>
          <Controller
            control={control}
            name="remember_me"
            render={({ field: { onChange, value } }) => (
              <View>
                <Checkbox
                  label="Remember me"
                  onValueChange={onChange}
                  checked={value}
                />
                {errors.remember_me && (
                  <Text style={styles.error}>{errors.remember_me.message}</Text>
                )}
              </View>
            )}
          />
          <Text onPress={() => navigation.navigate("./forgotPassword")}>
            Forgot password?
          </Text>
        </View>

        <Pressable
          style={styles.buttonContainer}
          onPress={handleSubmit(handleLogin)}
          disabled={loading}
        >
          <Text style={styles.button}>
            {loading ? "Logging in..." : "Log in"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.lowerTxt}>
        Are you new here? You should{" "}
        <Text
          onPress={() => navigation.navigate("./signUp")}
          style={styles.lowerLink}
        >
          Sign up
        </Text>{" "}
        first.
      </Text>
    </View>
  );
}
