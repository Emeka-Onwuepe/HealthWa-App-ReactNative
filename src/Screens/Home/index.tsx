import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./styles";
import pharma from "../../../assets/images/pharma.png";
import useAuthStore from "../../store/auth";
import UpcomingAppointments from "../../components/UpcomingAppointments";
import PageHeader from "../../components/ui/PageHeader";
import { getAvatarUrl } from "../../utils/avatars";
import AppLayout from "../../components/layouts/app.layout";
import Activities from "../../components/Actvities";
import { useAuth } from "../../hooks/useAuth";

export default function Home({ navigation }) {
  const { user } = useAuthStore();

  const isDoctor = user.role === "doctor";
  const title = isDoctor ? "Dr. " : "";

  const avatarUrl = getAvatarUrl(user.full_name);

  const ProfileButton = () => {
    const imageSource = user.profile_image
      ? { uri: user.profile_image }
      : { uri: avatarUrl };

    const onPress = () => {};

    return (
      <Pressable onPress={onPress} style={styles.profileButton}>
        <Image source={imageSource} style={styles.profileButtonImage} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title={`${title + user.full_name}`}
        leftIcon="menu"
        onLeftButtonPress={() => navigation.navigate("Settings")}
        rightElement={<ProfileButton />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topDisplay}>
          <Image source={pharma} style={styles.backgroundImage} />
          <View style={styles.upperTxt}>
            <Text style={styles.taskTxt}>What would you like today?</Text>
            <Text style={styles.tagTxt}>
              Your perfect health is our priotity
            </Text>
          </View>

          <View style={styles.lowerTxt}>
            <Text style={styles.tipHeader}>Today's health tip</Text>
            <Text style={styles.tipTxt}>Health tip...</Text>
          </View>
        </View>

        <UpcomingAppointments navigation={navigation} />
        <Activities navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
