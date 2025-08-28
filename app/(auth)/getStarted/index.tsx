import { useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import Button from "../../../components/ui/Buttonx";
import styles from "./style";

export default function GetStarted() {
  const navigation = useRouter();
  const navigateToSignup = (role: "doctor" | "patient") => {
    navigation.navigate({ pathname: "./signUp", params: { role } });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.titleText}>Let's get started</Text>
            <Text style={styles.subtitleText}>
              Login to access quality healthcare
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/join-us.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.purposeTextContainer}>
            <Text style={styles.purposeText}>I'm here to</Text>
            <View style={styles.buttonGroup}>
              <Button
                title="Give Medical Aid"
                onPress={() => navigateToSignup("doctor")}
              />
              <Button
                title="Receive Medical Aid"
                type="secondary"
                onPress={() => navigateToSignup("patient")}
              />
            </View>
          </View>
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>
              Already have an account?{" "}
              <Text
                style={styles.signInText}
                onPress={() => navigation.navigate("./login")}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
