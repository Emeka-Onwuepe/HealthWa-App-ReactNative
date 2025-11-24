import { addIcePending, clearSocketData, setReceiver, setSocketData } from '@/integrations/features/socket/socketSlice';
import { useAppDispatch, useAppSelector } from '@/integrations/hooks';
import { acceptCall, create_peerConnnection, endCall, start_call } from '@/integrations/peerconnection';
import { Button } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    MediaStream,
    RTCIceCandidate,
    RTCPeerConnection,
    RTCSessionDescription,
    RTCView
} from 'react-native-webrtc';



const VideoCall = () => {

    const { id, calltype } = useLocalSearchParams<{ id: string, calltype?: string }>();
    // const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    // const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const localStream = useRef<MediaStream | null>(null);
    const remoteStream = useRef<MediaStream | null>(null);
    const [connectionStatus, setConnectionStatus] = useState('init')
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const socketState = useAppSelector(state => state.socket);
    const name = 'Emeka Onwuepe'
    const text = `calling ${name}`
    const [headerText, setheaderText ] = useState(text);
    const rejected = false
    // if(calltype){
    //     setCallType(calltype)
    // }

    // const configuration = { 
        
    //     iceServers: [
    //                 { urls: 'stun:stun.l.google.com:19302' },
    //             ],
    //             iceCandidatePoolSize: 10,
    //     }; 
    
    const configuration = {
            iceServers: [
                 {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "cb51c0b5fc8eecbfd6b06956",
        credential: "SXH9qAluJOL0WGA5",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "cb51c0b5fc8eecbfd6b06956",
        credential: "SXH9qAluJOL0WGA5",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "cb51c0b5fc8eecbfd6b06956",
        credential: "SXH9qAluJOL0WGA5",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "cb51c0b5fc8eecbfd6b06956",
        credential: "SXH9qAluJOL0WGA5",
      },

            ]
    }
    
    

     // Create peer connection
    const peerConnection = useRef<RTCPeerConnection | null>(null)


    useEffect(() => {
        if(calltype === 'caller' && socketState.reciever.id !== parseInt(id)){
           dispatch(setReceiver({type:'id',id:parseInt(id)}))
        }

        // Get local stream

        // Create offer
        // createOffer(peerConnection, setOfferSDP);
        // Handle ICE candidates

    },[socketState.reciever]);


    useEffect(() => {
        let pc = peerConnection.current
        if (!pc){
            // console.log(socketState.incoming.type,' recieved without pc')
            if (socketState.incoming.type === 'new-ice-candidate' && socketState.incoming.action === 'candidate-received') {
                const candidateData = socketState.incoming.data.candidate;
                // console.log(candidateData)
                let {candidate} =  JSON.parse(candidateData)
                let [id] = candidate.split(' ')
                // console.log('id',id
                if(calltype == 'caller') {
                console.log(calltype,"saving pending Ice Candidate",'<----999------>')
                }
                dispatch(addIcePending({id,'data':candidateData}))
                }
            return
        } 
// have a second look

        if (socketState.incoming.type === 'new-ice-candidate' && socketState.incoming.action === 'candidate-received') {
            const candidateData = socketState.incoming.data.candidate;

                if(pc.remoteDescription === null){
                    console.log('remotedescription is null')
                    console.log(calltype, 'localdescription', pc.localDescription?.type)
                    console.log(calltype,'remotedescription', pc.remoteDescription)
                    console.log(calltype,'pc signalingstate', pc.signalingState)
                    console.log(calltype,'pc keys', Object.keys(pc))

                    // console.log(calltype,"saving pending Ice Candidate",'<----000------>')
                    // let {candidate} =  JSON.parse(candidateData)
                    // let [id] = candidate.split(' ')
                    // dispatch(addIcePending({id,'data':candidateData}))
                    // return
                }

            if (candidateData) {
                const candidate_ = JSON.parse(candidateData);
                const candidate = new RTCIceCandidate(candidate_)
                let err = false
                pc.addIceCandidate(candidate).then(() => {
                console.log(calltype,'Added ICE candidate:', '<--------------->');
                dispatch(clearSocketData({attr:'candidate', data:candidateData, clear:'incoming'}));

                }).catch(error => {
                    console.log('Error adding ICE candidate:', error);
                    err = true 
                });

                if(err){
                     setTimeout(() => {
                        pc.addIceCandidate(candidate).then(() => {
                            console.log(calltype,'Added ICE candidate on retry:', '<--------------->');
                            dispatch(clearSocketData({attr:'candidate', data:candidateData, clear:'incoming'}));
                        }).catch(err => {
                            console.error('Retry failed adding ICE candidate:', err);
                        });
                    }, 1000);

            }
         }
        }


        if (socketState.incoming.type === 'video-answer' && socketState.incoming.action === 'answer-received') {
            let answer = socketState.incoming.data.answerSDP;
            if (answer) {
                // console.log('Received answer SDP via socket:');
                let sdp = JSON.parse(answer)
                const answerSDP = new RTCSessionDescription(sdp);
                console.log(' receieved answer sdp')
                pc.setRemoteDescription(answerSDP).then(() => {
                    // console.log('------Remote description set with answer SDP');
                    // socketState.pendingCandidates.forEach(ice=>{
                    // if (ice.id != '0' ) {
                    //      const candidate_ = JSON.parse(ice.data);
                    //     const candidate = new RTCIceCandidate(candidate_)
                    //     if(!candidate) return
                    //     pc.addIceCandidate(candidate).then(() => {
                    //         console.log(calltype,'Added pending ICE candidate:', ice, '<--------------->');
                    //         // dispatch(deletePendingIceCandidate([ice.id]))
                    //     }).catch(error => {
                    //         console.error('Error adding pending ICE candidate:', error)
                    //     });
                    // }
                    // })

                }).catch(error => {
                    console.error('Error setting remote description with answer SDP:', error);
                });
            }
        }

    }, [socketState.incoming]);


    return (
        <View style={styles.container}>
                    <Text style={styles.header}>{headerText}</Text>

                    <View style={styles.videoContainer}>
                        {localStream.current ? (
                            <RTCView
                                streamURL={localStream.current.toURL()}
                                style={styles.localVideo}
                                objectFit="cover"
                            />
                        ) : (
                            <View style={styles.localVideo}>
                            <Text style={{color:'white', position:'relative', top:20, left:20}}>No Local Stream</Text>
                            </View>
                        )}
                        {remoteStream.current ? (
                            <RTCView
                                streamURL={remoteStream.current.toURL()}
                                style={styles.remoteVideo}
                                objectFit="cover"
                            />
                        ) : (
                        <View style={styles.remoteVideo}>
                        <Text style={{color:'white', position:'relative', top:20, left:20}}>No Remote Stream</Text>
                        </View>
                        )}
                    </View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Button

                
                disabled={connectionStatus === 'connecting'}
                style={{
                    backgroundColor:
                        connectionStatus === 'connected' ? '#ff4d4f' :
                        connectionStatus === 'connecting' ? 'grey' : '#1e90ff',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                    // overflow: 'hidden',
                }}
                onPress={() => {
                    // prevent actions while in-flight
                    if (connectionStatus === 'connecting') return;

                    // if already connected, hang up
                    if (connectionStatus === 'connected') {
                        endCall( peerConnection, localStream, remoteStream,
                             socketState, dispatch,
                             setSocketData, setConnectionStatus,
                             setReceiver);
                        return;
                    }

                    // transition to connecting and start/accept depending on role
                    setConnectionStatus('connecting');
                    if (calltype === 'caller' && connectionStatus === 'init') {
                        start_call(peerConnection, configuration, localStream,
                             remoteStream, calltype, socketState, dispatch, 
                             setSocketData, setConnectionStatus,connectionStatus,
                            create_peerConnnection,id);
                    } else if (calltype !== 'caller' && connectionStatus === 'init') {
                        acceptCall(peerConnection, configuration, localStream, 
                            remoteStream, calltype, socketState, dispatch,
                             setSocketData, setConnectionStatus,connectionStatus,
                            create_peerConnnection);
                    }
                }}
                       
                >
                    {connectionStatus === 'connected' ? 'End Call' : (calltype === 'caller' ? 'Start Call' : 'Accept Call')}
                </Button>
            </View>
            
        </View>
    );
};



// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#222' },
//     header: { color: '#fff', fontSize: 20, marginBottom: 20, alignSelf: 'center' },
//     videoContainer: { flex: 1 },
//     localVideo: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         width: '40%',
//         height: '30%',
//         backgroundColor: '#444',
//         borderRadius: 8,
//         zIndex: 2,
//         borderWidth: 2,
//         borderColor: '#fff',
//     },
//     remoteVideo: {
//         flex: 1,
//         width: '100%',
//         height: '85%',
//         backgroundColor: '#444',
//         borderRadius: 0,
//         zIndex: 1,
//     },
// });





const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222' },
    header: { color: '#fff', fontSize: 20, marginBottom: 20, alignSelf: 'center' },
    videoContainer: {
        flex: 1,
        flexDirection: 'column', // place videos side by side
        alignItems: 'stretch',
        justifyContent: 'space-between',
        borderColor: 'green',
        borderWidth: 2,
        borderStyle: 'solid',
        padding: 8,
        width:'95%',
    },
    localVideo: {
        // flex: 1,
        backgroundColor: '#444',
        borderRadius: 8,
        marginRight: 4,
         borderColor: 'yellow',
        borderWidth: 2,
        borderStyle: 'solid',
        // ensure the RTCView fills its container
        // width: '50%',
        height: '50%',
    },
    remoteVideo: {
        // flex: 1,
        backgroundColor: '#444',
         borderColor: 'green',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        marginLeft: 4,
        // width: '50%',
        height: '50%',
    },
});

export default VideoCall;