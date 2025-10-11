import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { mediaDevices, MediaStream, RTCView } from 'react-native-webrtc';

const VideoCall = () => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        // Get user media (local stream)
        mediaDevices.getUserMedia({
            audio: true,
            video: true,
        }).then(stream => {
            setLocalStream(stream);
            // In a real app, signaling would be used to exchange streams
            // For demo, we simulate remote stream as local stream
            // setRemoteStream(stream);
        });
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

export default VideoCall;