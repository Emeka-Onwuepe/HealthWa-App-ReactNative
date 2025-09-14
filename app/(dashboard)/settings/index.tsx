import { useLogoutMutation } from "@/integrations/features/apis/apiSlice";
import { logoutUser } from "@/integrations/features/user/usersSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../../../components/ui/PageHeader";
import { getAvatarUrl } from "../../../utils/avatars";
import { toTitleCase } from "../../../utils/strings";
import styles from "./styles";


export default function Settings() {
  // const { user, logout } = useAuthStore();

  const navigation = useRouter()
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [logout,{isLoading}] = useLogoutMutation()

  const avatarUrl = getAvatarUrl(user.full_name);
  const isDoctor = user.role === "practitioner";

  const imageSource = user.profile_image
    ? { uri: user.profile_image }
    : { uri: avatarUrl };

  const title = isDoctor ? "Dr. " : "";

  const handleProfilePress = () => {
    navigation.navigate("/settings/profile");
  };


  const handleLogout = async () => {
      logout(user.usertoken)
      dispatch(logoutUser())
      navigation.replace('/login')

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
            <Text style={styles.profileSpeciality}>{user.specialization}</Text>
          </View>
        </Pressable>

        <View style={styles.settingsContainer}>
          <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/changePassword')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}> <Ionicons name="lock-closed-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>"Password"</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>

             <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/notification')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}><Ionicons name="notifications-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>Notification</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>
 
             <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/reminderSettings')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}><Ionicons name="alarm-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>Reminder</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>

             <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/dataProtection')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}><Ionicons name="shield-checkmark-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>Data Protection</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>

             <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/faq')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}><Ionicons name="help-circle-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>FAQ</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>

             <Pressable
              style={styles.settingsItem}
              onPress={() => navigation.navigate('/settings/privacyPolicy')}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsItemIcon}><Ionicons name="shield-outline" size={24} color="#555" /></View>
                <Text style={styles.settingsItemText}>Privacy</Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </Pressable>
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
