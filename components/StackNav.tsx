import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";
import UserProfile from "../screens/UserProfile";
import FindMedic from "../screens/FindMedic/FindMedic";
import PleaseWait from "../screens/PleaseWait";
import Paired from "../screens/Paired";
import Feedback from "../screens/Feedback/Feedback";
import Prescription from "../screens/Prescription";
import BottomTabNav from "./BottomTabNav"; // Your Tab navigator
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Update User Profile"
        component={UserProfile}
        options={{ headerShown: true, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindMedic"
        component={FindMedic}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="PleaseWait"
        component={PleaseWait}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Paired"
        component={Paired}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
