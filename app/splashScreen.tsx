import React, { useEffect } from "react";
import { Image, View } from "react-native";
// import logo from "../../../assets/images/logo.png";
import { useRouter } from "expo-router";
import Styles from "../styles/splashStyles";


export default function SplashScreen() {
  console.log("SplashScreen rendered");
  const navigation = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("./getStarted");
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={Styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={Styles.logo}
      />
    </View>

    


  );
}

