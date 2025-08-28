import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

export default function PleaseWait({ navigation }) {
  const paired = () => {
    navigation.navigate("Paired");
  };

  return (
    <SafeAreaView style={styles.waitView}>
      <Text style={styles.waitTxt}>Please wait, you're beign connected...</Text>

      <Pressable style={styles.waitBtn} onPress={paired}>
        <Text style={styles.stopTxt}>Stop Search</Text>
      </Pressable>
    </SafeAreaView>
  );
}
