import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
// import pharma from "../../../assets/images/pharma.png";
// import useAuthStore from "../../../src/store/auth";
import Activities from "@/components/Actvities";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useRouter } from "expo-router";
import PageHeader from "../../../components/ui/PageHeader";
import { getAvatarUrl } from "../../../utils/avatars";
import styles from "./styles";

export default function Home() {
  
    const navigation = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

  const isDoctor = user.role === "practitioner";
  const title = isDoctor ? "Dr. " : "";

  const avatarUrl = getAvatarUrl(user.full_name);

  const ProfileButton = () => {
    const imageSource = user.profile_image
      ? { uri: user.profile_image }
      : { uri: avatarUrl };

      console.log(imageSource)
    const onPress = () => {};

    return (
      <Pressable onPress={()=>navigation.navigate('/settings')} style={styles.profileButton}>
        <Image source={imageSource} style={styles.profileButtonImage} />
      </Pressable>
    );
  };

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <PageHeader
        title={`${title + user.full_name}`}
        leftIcon="menu"
        onLeftButtonPress={() => navigation.navigate("/settings")}
        rightElement={<ProfileButton />}
      />
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}> */}
        <View style={styles.topDisplay}>
        
          <Image source={require("../../../assets/images/pharma.png")} style={styles.backgroundImage} />
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

         <UpcomingAppointments/> 
         <Activities/>
      {/* </ScrollView> */}
    </SafeAreaView>
    </ScrollView>
  );
}
