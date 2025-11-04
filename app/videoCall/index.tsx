import { setSocketData } from '@/integrations/features/socket/socketSlice';
import { useAppDispatch, useAppSelector } from '@/integrations/hooks';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    MediaStream,
    RTCPeerConnection,
    // RTCSessionDescription,
    RTCView
} from 'react-native-webrtc';
import {
    getLocalStream
} from '../../integrations/features/user/videoCallFunc';


const VideoCall = () => {

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const socketState = useAppSelector(state => state.socket);

    

    const configuration = { iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                ],
                iceCandidatePoolSize: 10,
        };      
    
     // Create peer connection
    const peerConnection = useRef(new RTCPeerConnection(configuration));


   
    useEffect(() => {

        peerConnection.current.ontrack = (event: RTCTrackEvent) => {
        
        if (event.streams && event.streams[0]) {
            console.log('Remote track received.');
            console.log('event.streams[0]:', event.streams[0]);
            setRemoteStream(event.streams[0]);
        } else {
            console.log('No streams in event, creating new MediaStream.');
            let inboundStream = new MediaStream();
            inboundStream.addTrack(event.track);
            setRemoteStream(inboundStream);
        }
        };

        peerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            // console.log('New ICE candidate:', event.candidate);
            // Here you would typically send the candidate to the remote peer
            // add to remote peer connection
            if(!event.candidate) return;
            console.log('Sending ICE candidate to socketState:', event.candidate);
            dispatch(setSocketData({type:'new-ice-candidate', action:'candidate-sent', 
                data:{candidate: JSON.stringify(event.candidate),
                to: 71
                }}));


            // check for remote description
            
            // if (peerConnection.current.remoteDescription) {
            //     peerConnection.current.addIceCandidate(event.candidate).then(() => {
            //         console.log('Added ICE candidate:', event.candidate);
            //     }).catch(error => {
            //         console.log('Error adding ICE candidate:', error);
            //     });
            // } else {
            //     console.log('Remote description not set yet. Cannot add ICE candidate.');
            // }
        }   
    };

    peerConnection.current.oniceconnectionstatechange = (event: Event) => {
        console.log('################################');
        console.log('iceconnectionstatechange event:', event);
        console.log('ICE connection state:', peerConnection.current.iceConnectionState);
        console.log('################################');
    };
    peerConnection.current.onconnectionstatechange = (event: Event) => {
        console.log('--------------------------------');
        console.log('connectionstatechange event:', event);
        console.log('Connection state change:', peerConnection.current.connectionState);
        console.log('--------------------------------');
    };
    
    getLocalStream(setLocalStream, peerConnection);


        // Get local stream

        // Create offer
        // createOffer(peerConnection, setOfferSDP);
         peerConnection.current.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true }).then(offer => {
                // console.log('Offer SDP:', offer);
                // setOfferSDP(JSON.stringify(offer));
                peerConnection.current.setLocalDescription(offer).then(() => {
                    // Send offer to remote peer via websockets
                    dispatch(setSocketData({type:'video-offer', action:'offer-sent', 
                        data:{offerSDP: JSON.stringify(offer), to:71}}));
                });
            });

        // Handle ICE candidates

    },[]);


    useEffect(() => {
        console.log('data recieved from socket.imcoming')

        if (socketState.incoming.type === 'video-offer' && socketState.incoming.action === 'offer-received') {
            const offerSDP = socketState.incoming.data.offerSDP;
            if (offerSDP) {
                console.log('Received offer video-offer via socket:');

                // send call notification

                // 

                peerConnection.current.setRemoteDescription(JSON.parse(offerSDP)).then(() => {
                    console.log('Remote description set with offer SDP');
                    // Create answer
                    peerConnection.current.createAnswer().then(answer => {
                        console.log('Created answer SDP:');
                        peerConnection.current.setLocalDescription(answer).then(() => {
                            // Send answer to remote peer via websockets
                            dispatch(setSocketData({type:'video-answer', action:'answer-sent', 
                                data:{answerSDP: JSON.stringify(answer), to:71}}));
                        });
                    });
                }
                ).catch(error => {
                    console.error('Error setting remote description with offer SDP:', error);
                });
            }
        }

// have a second look

        if (socketState.incoming.type === 'new-ice-candidate' && socketState.incoming.action === 'candidate-received') {
            console.log('adding new ice candidate')
            const candidateData = socketState.incoming.data.candidate;
            if (candidateData) {
                const candidate = new RTCIceCandidate(JSON.parse(candidateData));
                peerConnection.current.addIceCandidate(candidate).then(() => {
                    console.log('Added ICE candidate:', candidate);
                }).catch(error => {
                    console.error('Error adding ICE candidate:', error);
                });
            }
        }

        if (socketState.incoming.type === 'video-answer' && socketState.incoming.action === 'answer-received') {
            const answerSDP = socketState.incoming.data.answerSDP;
            if (answerSDP) {
                console.log('Received answer SDP via socket:');
                peerConnection.current.setRemoteDescription(JSON.parse(answerSDP)).then(() => {
                    console.log('Remote description set with answer SDP');
                }).catch(error => {
                    console.error('Error setting remote description with answer SDP:', error);
                });
            }
        }

    }, [socketState.incoming]);

    // useEffect(() => {

    //         // Handle remote stream
    //         // console.log('Offer SDP cc:', offerSDP)
    //         if(offerSDP){
    //          // Create answer
    //         //  console.log('peerConnection before createAnswer:', peerConnection);
    //         //  create answer and add to peer connection
    //         peerConnection.current.setRemoteDescription(JSON.parse(offerSDP)).then(() => {
    //             console.log('Remote description set successfully');
    //             console.log('peerConnection after createAnswer:', peerConnection);

    //             // return createAnswer(peerConnection, setRemoteStream);
    //         }).catch(error => {
    //             console.error('Error setting remote description:', error);
    //         });

    //         peerConnection.current.createAnswer().then(answer => {
    //             // console.log('Answer SDP:', answer);
    //             peerConnection.current.setLocalDescription(answer).then(() => {
    //                 // Send answer to remote peer via websockets
    //             }
    //         );
    //         })

    //         // handleRemoteStream(peerConnection, setRemoteStream);
    //         }
            
    // }, [offerSDP]);





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