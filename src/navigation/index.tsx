import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./auth";
import Main from "./main";
import useAuthStore from "../store/auth";
import LoadingScreen from "../components/ui/LoadingScreen";

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Main /> : <Auth />;
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
