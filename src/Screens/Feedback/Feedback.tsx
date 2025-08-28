import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

export default function Feedback({ navigation }) {
  const submit = () => {
    navigation.navigate("Prescription");
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <Text style={styles.waitTxt}>
        Your call with Dr John Doe has ended, how do you rate your experience?
      </Text>

      {/* Place for 5 starts for rating */}

      <View style={styles.inputView}>
        <Text>Please drop a comment</Text>
        <TextInput multiline={true} style={styles.messageInput} />
      </View>

      <Pressable style={styles.waitBtn} onPress={submit}>
        <Text style={styles.stopTxt}>Submit</Text>
      </Pressable>

      <Pressable style={styles.skipView}>
        <Text style={styles.skip}>Skip</Text>
      </Pressable>
    </SafeAreaView>
  );
}
