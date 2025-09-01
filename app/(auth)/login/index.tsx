import React, { useEffect, useState } from "react";
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
import { addAlert } from "@/integrations/features/alert/alertSlice";
import { useLoginMutation } from "@/integrations/features/apis/apiSlice";
import { loginUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
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

  const navigation = useRouter();

  const [loading,setLoading] = useState(true)
  
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [login, { isLoading }] = useLoginMutation();
  
  useEffect(() => {
    if (user.logedin && !loading  && !isLoading) {
      if (user.verified_email ) {
        navigation.replace("/home");
      } else if (!user.verified_email){
        navigation.replace("/OTPVerification");
      } else if(user.gender == 'other') {
        navigation.replace("/setupPatientProfile");
      }
    }
  }, [loading,user]);


  useEffect(() => {
      if (user && loading) {
        setLoading(false);
      }
    }, [user]);

  const handleLogin = async (formdata: FormData) => {
    if (!formdata.email && !formdata.password) {
      // remember to dispatch alert
      return;
    }

    const data = {
      email: formdata.email,
      password: formdata.password,
    };


    let res = await login(data);
    if (res.data) {
      dispatch(
        loginUser({
          ...res.data.user,
          // usertoken: res.data.token,
          logedin: true,
          save: true,
        })
      ); 

      if(res.data.user.gender == 'other') {
        navigation.navigate("/setupPatientProfile");
      }else{
        navigation.navigate("/home");
      }



    } else if (res.error) {
      dispatch(addAlert({ ...res.error, page: "login" }));
    }
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
