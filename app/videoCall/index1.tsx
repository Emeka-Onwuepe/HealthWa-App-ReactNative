import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    mediaDevices, MediaStream,
    RTCPeerConnection,
    RTCView
} from 'react-native-webrtc';

const videocallex = () => {

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [peerConnectionState_1, setPeerConnectionState_1] = useState<RTCPeerConnection | null>(null);
    const [peerConnectionState_2, setPeerConnectionState_2] = useState<RTCPeerConnection | null>(null);



   


    useEffect(() => {

        const peerConnection_1 = new RTCPeerConnection(
            { iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                ],
                iceCandidatePoolSize: 10,
        }
        );

        const peerConnection_2 = new RTCPeerConnection(
            { iceServers: [
                    { urls: 'stun:stun1.l.google.com:19302' }
                ],
                iceCandidatePoolSize: 10,
        }
        );

        // const getName = (pc: RTCPeerConnection | null) => (pc === peerConnectionState_1 ? 'pc1' : 'pc2');
        // const getOtherPc = (pc: RTCPeerConnection | null) => (pc === peerConnectionState_1 ? peerConnectionState_2 : peerConnectionState_1);

        // const gotRemoteStream = (e: any) => {
        //         if (e.streams && e.streams[0]) {
        //             setRemoteStream(e.streams[0]);
        //         } else {
        //             let inboundStream = new MediaStream();
        //             inboundStream.addTrack(e.track);
        //             setRemoteStream(inboundStream);
        //         }
        //     };

        // const onIceCandidate = (pc: RTCPeerConnection, event: RTCPeerConnectionIceEvent) => {
        //     if (event.candidate) {
        //         const otherPc = getOtherPc(pc);
        //         otherPc?.addIceCandidate(event.candidate)
        //             .then(() => {
        //                 console.log(`${getName(otherPc)} addIceCandidate success`);
        //             })
        //             .catch((e) => {
        //                 console.log(`${getName(otherPc)} failed to add ICE Candidate: ${e.toString()}`);
        //             });
        //         }
        //     }
        

        // peerConnection_1.addEventListener('icecandidate', (e: RTCPeerConnectionIceEvent) => onIceCandidate(peerConnection_1, e));
        // peerConnection_2.addEventListener('icecandidate', (e: RTCPeerConnectionIceEvent) => onIceCandidate(peerConnection_2, e));
        // peerConnection_1.addEventListener('iceconnectionstatechange', (e: Event) => onIceStateChange(peerConnection_1, e));
        // peerConnection_2.addEventListener('iceconnectionstatechange', (e: Event) => onIceStateChange(peerConnection_2, e));
        // peerConnection_2.addEventListener('track', gotRemoteStream);



        // handle peer connection events
          mediaDevices.getUserMedia({
            audio: true,
            video: true,
          }).then((stream) => {
            setLocalStream(stream);
            if (peerConnection_1) {
              stream.getTracks().forEach((track) => {
                peerConnection_1.addTrack(track, stream);
              });
            }
            });

            // peerConnection.onaddstream = (event) => {
            // setRemoteStream(event.stream);
            // };

             peerConnection_1.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true }).then(offer => {
                console.log('Offer SDP:', offer);
                peerConnection_1.setLocalDescription(offer).then(() => {
                    // Send offer to remote peer via websockets
                });
            });
        

                    // Simulate remote peer receiving the offer
            // peerConnection_2.setRemoteDescription(offer);
            // peerConnection_2.createAnswer().then(answer => {
            //     peerConnection_2.setLocalDescription(answer).then(() => {
            //         // Send answer back to original peer via websockets
            //         peerConnection_1.setRemoteDescription(answer);
            //     });

            //     // Send answer back to original peer via websockets
            //     // peerConnection_1.setRemoteDescription(answer);

            // });
        
        //   peerConnection.onaddstream = (event) => {
        //     if (onStream) onStream(event.stream);
        //   };
        



        // Get user media (local stream)
        // mediaDevices.getUserMedia({
        //     audio: true,
        //     video: true,
        // }).then(stream => {
        //     setLocalStream(stream);
        //     // In a real app, signaling would be used to exchange streams
        //     // For demo, we simulate remote stream as local stream
        //     setRemoteStream(stream);
        // });

        // setPeerConnectionState_1(peerConnection_1);
        // setPeerConnectionState_2(peerConnection_2);

        // return () => {
        //     // Cleanup
        //     if (localStream) {
        //         localStream.getTracks().forEach(track => track.stop());
        //     }
        //     if (peerConnectionState) {
        //         peerConnectionState.close();
        //     }
        // };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>2-Person Video Call</Text>
            <View style={styles.videoContainer}>
                {localStream && (
                    <RTCView
                        streamURL={localStream.toURL()}
                        style={styles.localVideo}
                        objectFit="cover"
                    />
                )}
                {remoteStream && (
                    <RTCView
                        streamURL={remoteStream.toURL()}
                        style={styles.remoteVideo}
                        objectFit="cover"
                    />
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222' },
    header: { color: '#fff', fontSize: 20, marginBottom: 20, alignSelf: 'center' },
    videoContainer: { flex: 1 },
    localVideo: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: '40%',
        height: '30%',
        backgroundColor: '#444',
        borderRadius: 8,
        zIndex: 2,
        borderWidth: 2,
        borderColor: '#fff',
    },
    remoteVideo: {
        flex: 1,
        width: '100%',
        height: '85%',
        backgroundColor: '#444',
        borderRadius: 0,
        zIndex: 1,
    },
});

export default videocallex;