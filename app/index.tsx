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
      console.log('navigate')
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

// import React, { useEffect } from "react";
// import { StatusBar, StyleSheet } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import ToastManager from "toastify-react-native";
// import FontProvider from '../components/providers/FontProvider';

// // import { onAuthStateChanged } from "firebase/auth";
// // import { useRouter } from "expo-router";
// import { useState } from "react";
// // import { auth } from "./firebaseConfig";
// // import Navigation from "./src/navigation";

// // const queryClient = new QueryClient();

// export default function App() {


//   // const navigation = useRouter();

//   // const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //     setUser(currentUser);
//   //     setLoading(false);
//   //   });

//   //   return () => unsubscribe();
//   // }, []);

//   useEffect(()=>{
//     // setLoading(false);
// // console.log('losding false')
//   },[])

//   // if (loading) {
//   //   console.log("Loading...");
//   //   return <SplashScreen />;
//   // }

//   return (
//     <SafeAreaProvider>
//         <FontProvider>
//           <StatusBar barStyle="dark-content" backgroundColor="white" />
//           <ToastManager />
//         </FontProvider>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
