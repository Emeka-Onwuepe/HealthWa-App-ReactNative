import { View, Text } from "react-native";

export default function Calling() {
  return (
    <View>
      <Text>Calling</Text>
    </View>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   SafeAreaView,
//   ActivityIndicator,
//   PermissionsAndroid,
// } from "react-native";
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   registerGlobals
// } from "react-native-webrtc";
// import Peer from "peerjs";

// // Register WebRTC globals
// registerGlobals();

// export default function Calling() {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [peerId, setPeerId] = useState("");
//   const [remotePeerId, setRemotePeerId] = useState("");
//   const [callStatus, setCallStatus] = useState("connecting"); // connecting, connected
//   const [streamError, setStreamError] = useState(null);
//   const peerRef = useRef(null);

//   console.log(mediaDevices)

//   useEffect(() => {
//     // Initialize media stream
//     const setupMediaStream = async () => {
//       try {
//         console.log("Requesting user media...");

//         if (!mediaDevices) {
//           throw new Error("mediaDevices is not defined - WebRTC may not be properly initialized");
//         }

//         // Request permissions first if on Android
//         if (Platform.OS === 'android') {
//           try {
//             const granted = await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.CAMERA,
//               {
//                 title: "Camera Permission",
//                 message: "This app needs access to your camera and microphone.",
//                 buttonNeutral: "Ask Me Later",
//                 buttonNegative: "Cancel",
//                 buttonPositive: "OK",
//               }
//             );

//             if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//               throw new Error("Camera/microphone permissions not granted");
//             }
//           } catch (permErr) {
//             console.error("Error requesting permissions:", permErr);
//             setStreamError("Camera/microphone permission denied");
//             return;
//           }
//         }

//         try {
//           const stream = await mediaDevices.getUserMedia({
//             audio: true,
//             video: {
//               width: { min: 640, ideal: 1280, max: 1920 },
//               height: { min: 480, ideal: 720, max: 1080 },
//               frameRate: { min: 15, ideal: 24 },
//               facingMode: 'user',
//             },
//           });

//           console.log("Media stream obtained:", stream.id);
//           console.log("Video tracks:", stream.getVideoTracks().length);
//           console.log("Audio tracks:", stream.getAudioTracks().length);

//           // Ensure we have video tracks
//           if (stream.getVideoTracks().length === 0) {
//             throw new Error("No video tracks in the stream");
//           }

//           setLocalStream(stream);
//           setCallStatus("connected"); // For testing, we'll show the local stream
//           initializePeer(stream);

//         } catch (mediaErr) {
//           console.error("Error getting user media:", mediaErr);
//           setStreamError(`Could not access camera/microphone: ${mediaErr.message}`);
//         }
//       } catch (err) {
//         console.error("Error in setupMediaStream:", err);
//         setStreamError(`Media setup error: ${err.message}`);
//       }
//     };

//     setupMediaStream();

//     return () => {
//       // Cleanup
//       if (localStream) {
//         localStream.getTracks().forEach((track) => {
//           track.stop();
//           console.log(`Stopped track: ${track.kind}`);
//         });
//       }
//       if (peerRef.current) {
//         peerRef.current.destroy();
//         console.log("Peer connection destroyed");
//       }
//     };
//   }, []);

//   const initializePeer = (stream) => {
//     try {
//       const peer = new Peer({
//         debug: 3, // Set debug level for more logs
//       });

//       peer.on("open", (id) => {
//         setPeerId(id);
//         console.log("My peer ID is: " + id);

//         // For demo purposes, automatically set a remote peer ID
//         // In a real app, you'd get this from your backend or user input
//         setRemotePeerId("demo-peer-id");

//         // Auto-call after connection for this demo
//         setTimeout(() => {
//           callPeer("demo-peer-id", stream, peer);
//         }, 2000);
//       });

//       peer.on("error", (err) => {
//         console.error("Peer connection error:", err);
//         setStreamError(`Peer error: ${err.type}`);
//       });

//       peer.on("call", (call) => {
//         console.log("Receiving call...");
//         call.answer(stream);
//         call.on("stream", (incomingStream) => {
//           console.log("Received remote stream");
//           setRemoteStream(incomingStream);
//           setCallStatus("connected");
//         });

//         call.on("error", (err) => {
//           console.error("Call error:", err);
//           setStreamError(`Call error: ${err}`);
//         });
//       });

//       peerRef.current = peer;
//     } catch (error) {
//       console.error("Error initializing peer:", error);
//       setStreamError(`Peer initialization error: ${error.message}`);
//     }
//   };

//   const callPeer = (remotePeerId, stream, peer) => {
//     if (!remotePeerId || !stream || !peer) {
//       console.warn("Missing required parameters for call");
//       return;
//     }

//     try {
//       console.log("Calling peer:", remotePeerId);
//       const call = peer.call(remotePeerId, stream);

//       call.on("stream", (incomingStream) => {
//         console.log("Received stream from call");
//         setRemoteStream(incomingStream);
//         setCallStatus("connected");
//       });

//       call.on("error", (err) => {
//         console.error("Call error:", err);
//         setStreamError(`Call error: ${err}`);
//       });
//     } catch (error) {
//       console.error("Error making call:", error);
//       setStreamError(`Call initiation error: ${error.message}`);
//     }
//   };

//   const endCall = () => {
//     // In a real app, you would disconnect the peer connection here
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//     }
//     if (peerRef.current) {
//       peerRef.current.destroy();
//     }

//     // Return to a previous screen - in a real app this would navigate back
//     setCallStatus("connecting");
//   };

//   const addNote = () => {
//     // In a real app, this would open a note modal or navigate to a note screen
//     console.log("Add note");
//   };

//   const renderConnectingScreen = () => {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.contentContainer}>
//           <View style={styles.loadingContainer}>
//             <View style={styles.dotContainer}>
//               {[1, 2, 3, 4, 5].map((_, index) => (
//                 <View
//                   key={index}
//                   style={[styles.dot, { opacity: 1 - index * 0.15 }]}
//                 />
//               ))}
//             </View>
//             <Text style={styles.connectingText}>
//               Please wait, you're being connected...
//             </Text>
//             {streamError && (
//               <Text style={styles.errorText}>{streamError}</Text>
//             )}
//           </View>

//           <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
//             <Text style={styles.endCallText}>END CALL</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   };

//   const renderConnectedScreen = () => {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.contentContainer}>
//           <View style={styles.videoCallContainer}>
//             {remoteStream ? (
//               <RTCView
//                 streamURL={remoteStream.toURL()}
//                 style={styles.remoteVideo}
//                 objectFit="cover"
//                 zOrder={0}
//               />
//             ) : (
//               <View style={styles.remoteVideo}>
//                 <ActivityIndicator size="large" color="#7DC1D6" />
//                 <Text style={styles.waitingText}>Waiting for remote video...</Text>
//                 {streamError && (
//                   <Text style={styles.errorText}>{streamError}</Text>
//                 )}
//               </View>
//             )}

//             <View style={styles.localVideoContainer}>
//               {localStream ? (
//                 <RTCView
//                   streamURL={localStream.toURL()}
//                   style={styles.localVideo}
//                   objectFit="cover"
//                   zOrder={1}
//                   mirror={true}
//                 />
//               ) : (
//                 <View style={styles.localVideoPlaceholder}>
//                   <Text style={styles.localVideoText}>No local stream</Text>
//                 </View>
//               )}
//             </View>
//           </View>

//           <TouchableOpacity style={styles.addNoteButton} onPress={addNote}>
//             <Text style={styles.addNoteText}>ADD A NOTE</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.endCallButtonRed} onPress={endCall}>
//             <Text style={styles.endCallText}>END CALL</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   };

//   return callStatus === "connecting"
//     ? renderConnectingScreen()
//     : renderConnectedScreen();
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dotContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   dot: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#7DC1D6",
//     marginHorizontal: 4,
//   },
//   connectingText: {
//     fontSize: 18,
//     fontWeight: "500",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//     textAlign: 'center',
//     padding: 10,
//   },
//   waitingText: {
//     marginTop: 10,
//     color: '#666'
//   },
//   endCallButton: {
//     backgroundColor: "#7DC1D6",
//     borderRadius: 30,
//     paddingVertical: 16,
//     paddingHorizontal: 40,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   endCallButtonRed: {
//     backgroundColor: "#D63B6D",
//     borderRadius: 30,
//     paddingVertical: 16,
//     paddingHorizontal: 40,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   endCallText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   videoCallContainer: {
//     flex: 1,
//     width: "100%",
//     borderRadius: 20,
//     overflow: "hidden",
//     position: "relative",
//     borderWidth: 4,
//     borderColor: "#7DC1D6",
//     marginBottom: 20,
//   },
//   remoteVideo: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   localVideoContainer: {
//     position: "absolute",
//     right: 10,
//     top: 10,
//     width: 100,
//     height: 120,
//     borderRadius: 20,
//     overflow: "hidden",
//     borderWidth: 2,
//     borderColor: "#FFFFFF",
//   },
//   localVideo: {
//     flex: 1,
//     backgroundColor: "#333333",
//   },
//   localVideoPlaceholder: {
//     flex: 1,
//     backgroundColor: "#333333",
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   localVideoText: {
//     color: 'white',
//     fontSize: 12
//   },
//   addNoteButton: {
//     backgroundColor: "#7DC1D6",
//     borderRadius: 30,
//     paddingVertical: 16,
//     paddingHorizontal: 40,
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   addNoteText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
