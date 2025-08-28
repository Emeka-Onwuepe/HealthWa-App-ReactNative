import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import vlad from "../../../assets/images/vlad.jpg";

export default function Paired({ navigation }) {
  const feedback = () => {
    navigation.navigate("Feedback");
  };
  return (
    <SafeAreaView style={styles.waitView}>
      <Text style={styles.waitTxt}>You have been paired</Text>
      <Image source={vlad} style={styles.pairedImg} />
      <Text style={styles.docTxt}>Dr John Doe</Text>

      <Text style={styles.callingTxt}>Calling...</Text>

      <Pressable style={styles.waitBtn} onPress={feedback}>
        <Text style={styles.stopTxt}>Answer</Text>
      </Pressable>
    </SafeAreaView>
  );
}
