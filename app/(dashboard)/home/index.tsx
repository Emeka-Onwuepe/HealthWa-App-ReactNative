import React, { useState } from "react";
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
    const socketState = useAppSelector(state => state.socket);
    const [connect,setConnect] = useState(false)
    
  //   useEffect(() => {

  //    const socket = io(baseUrl);
  //       console.log("Socket Initialized");
  //       socket.on("connect", () => {
  //       console.log(socket.connected); // true
  //       console.log(socket);
  //       });
    
  //       socket.on("disconnect", () => {
  //       console.log(socket.connected); // false
  //       });

  // }, []);



  const isDoctor = user.user_role === "practitioner";
  const title = isDoctor ? "Dr. " : "";

  const avatarUrl = getAvatarUrl(user.full_name);
  // let socketConnection: ReturnType<typeof socketConnection_>;
  // let socketConnection = useRef(socketConnection_(user.usertoken))
  // useEffect(()=>{
  //   if(socketConnection.current.connected){
  //     dispatch(connectSocket())
  //   }else{
  //     dispatch(disconnectSocket())
  //   }
  // },[])
  
// useEffect(()=>{
//   socketConnection.current.on("connect", () => {
//       console.log("Socket ID from con:", socketConnection.current.id);
//       dispatch(connectSocket())
//     });

//     socketConnection.current.on("disconnect", () => {
//       console.log('disconnected')
//       dispatch(disconnectSocket())
//      });

//      socketConnection.current.on("reconnect", () => {
//       console.log('reconnecting')
      
//      });
//      dispatch(disconnectSocket())

// },[])


//   useEffect(() => {
//     console.log(socketState)
//     if(user.logedin){
//         if(!socketState.connected){
//           console.log('try toconnect socket')
//             // socketConnection = socketConnection_(user.usertoken)

//           // connect to socket server
//           // console.log('inside if')
//              socketConnection.current.connect();
//             // socketConnection.current.emit("authenticate", { token: user.usertoken });
//         }else{
//           // send token to server
          
//           // socketConnection.current.emit("authenticate", { token: user.usertoken });
//         }
//     }

//     // if(socketConnection){

//     //   socketConnection.current.on("connect", () => {
//     //   console.log("Socket ID from con:", socketConnection.current.id);
//     //   dispatch(connectSocket())
//     // });
//     // socketConnection.current.on("disconnect", () => {
//     //   console.log('disconnected')
//     //   dispatch(disconnectSocket())
//     // });

//     // }

//   }, [user, socketState]);

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
