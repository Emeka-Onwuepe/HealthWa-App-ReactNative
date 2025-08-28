import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/Settings";
// import Logout from "../Screens/Logout/Logout";
import Profile from "../screens/Profile";
import StackNav from "./StackNav";
import { Pressable, Text } from "react-native";
import DrawerContent from "./DrawerContent";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNav from "./BottomTabNav";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        ),
        headerTitleAlign: "center",
      })}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNav}
        options={{ headerShown: false }}
      />

      {/* <Drawer.Screen
        name="Home"
        component={StackNav}
        // options={{ headerShown: false }}
      /> */}

      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
