import Alert_System from "@/integrations/features/alert/Alert";
import { store } from "@/integrations/store";
import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import ToastManager from "toastify-react-native";
import SocketFeature from "../integrations/SocketFeature";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ToastManager textStyle={{ fontSize: 16, width: "100%" }} />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <Alert_System />
      <SocketFeature />
    </Provider>
  );
}
