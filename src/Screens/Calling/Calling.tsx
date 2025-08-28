import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CallingStyles from "./styles";
import vlad from "../../../assets/images/vlad.jpg";
import {
  mediaDevices,
  RTCView,
  RTCPeerConnection,
  MediaStream,
  MediaStreamTrack,
} from "react-native-webrtc";

// type WebRTCStream = InstanceType<typeof mediaDevices.getUserMedia>;

export default function Calling({ navigation }) {
  const peerConnection = new RTCPeerConnection();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // user media  for local video
    mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        setLocalStream(stream);
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          peerConnection.addTrack(track, stream);
        });
      })
      .catch((error) => console.error("Media error:", error));

    peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
      }
    });

    peerConnection.addEventListener("track", (event) => {
      if (event.streams?.[0]) setRemoteStream(event.streams[0]);
    });
  }, []);

  const handleEndCall = () => {
    peerConnection
      .getSenders()
      .forEach((sender) => peerConnection.removeTrack(sender));
    localStream?.getTracks().forEach((track) => track.stop());
    peerConnection.close();
    setLocalStream(null);
    setRemoteStream(null);
    navigation.navigate("Feedback");
  };

  return (
    <SafeAreaView style={CallingStyles.waitView}>
      <View style={CallingStyles.videoContainer}>
        {/* Local user video */}

        {localStream && (
          <RTCView
            streamURL={(localStream as any).toURL()}
            style={CallingStyles.localVideo}
          />
        )}
        <Text style={CallingStyles.userLabel}>You</Text>

        {/* Remote user video */}

        {remoteStream && (
          <RTCView
            streamURL={(remoteStream as any).toURL()}
            style={CallingStyles.remoteVideo}
          />
        )}
        <Text style={CallingStyles.docTxt}>Dr John Doe</Text>

        {/* <Image source={vlad} style={styles.pairedImg} />
         */}
      </View>

      <View style={CallingStyles.callControls}>
        <Pressable style={CallingStyles.waitBtn} onPress={handleEndCall}>
          <Text style={CallingStyles.stopTxt}>End</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// THIS IS GOING TO BE A ZOOM OR GOOGLE MEETS CALL INTERFACE
