import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <Image
          source={{
            uri: "https://media.licdn.com/dms/image/v2/D4D03AQGlhMqZCmigWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713736437818?e=2147483647&v=beta&t=mcPVRl_ib1HA228nKry9jfd6gR50TToQMUs8uS8VVp0",
          }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ fontSize: 18, marginVertical: 10 }}>User Name</Text>
      </View>

      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />

      <Pressable
        style={{ marginVertical: 20, padding: 10, alignItems: "center" }}
        onPress={() => {
          console.log("Logging out");
          props.navigation.navigate("Login");
        }}
      >
        <Text style={{ color: "red" }}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}
