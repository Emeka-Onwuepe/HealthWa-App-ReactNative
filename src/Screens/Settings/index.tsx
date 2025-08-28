import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../components/ui/PageHeader";
import useAuthStore from "../../store/auth";
import { getAvatarUrl } from "../../utils/avatars";
import { toTitleCase } from "../../utils/strings";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import styles from "./styles";

const pages = [
  {
    title: "Password",
    icon: <Ionicons name="lock-closed-outline" size={24} color="#555" />,
    route: "ChangePassword",
  },
  {
    title: "Notification",
    icon: <Ionicons name="notifications-outline" size={24} color="#555" />,
    route: "Notification",
  },
  {
    title: "Reminder",
    icon: <Ionicons name="alarm-outline" size={24} color="#555" />,
    route: "ReminderSettings",
  },
  {
    title: "Data Protection",
    icon: <Ionicons name="shield-checkmark-outline" size={24} color="#555" />,
    route: "DataProtection",
  },
  {
    title: "FAQ",
    icon: <Ionicons name="help-circle-outline" size={24} color="#555" />,
    route: "Faq",
  },
  {
    title: "Privacy",
    icon: <Ionicons name="shield-outline" size={24} color="#555" />,
    route: "PrivacyPolicy",
  },
];

export default function Settings({ navigation }) {
  const { user, logout } = useAuthStore();

  const avatarUrl = getAvatarUrl(user.full_name);
  const isDoctor = user.role === "doctor";

  const imageSource = user.profile_image
    ? { uri: user.profile_image }
    : { uri: avatarUrl };

  const title = isDoctor ? "Dr. " : "";

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const handleNavigate = (route: string) => {
    try {
      navigation.navigate(route);
    } catch (error) {
      console.warn(`Navigation Error: Could not find screen "${route}".`);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");

      logout();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LetGetStarted" }],
        })
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PageHeader title="Settings" />

        <Pressable onPress={handleProfilePress} style={styles.profileContainer}>
          <Image source={imageSource} style={styles.profileImage} />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {toTitleCase(title + user.full_name)}
            </Text>
            <Text style={styles.profileSpeciality}>{user.speciality}</Text>
          </View>
        </Pressable>

        <View style={styles.settingsContainer}>
          {pages.map((page, index) => (
            <Pressable
              key={page.route || index}
              style={styles.settingsItem}
              onPress={() => handleNavigate(page.route)}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}>{page.icon}</View>
                <Text style={styles.settingsItemText}>{page.title}</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#DC3545"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
