import { addIcePending, clearSocketData, setReceiver, setSocketData } from '@/integrations/features/socket/socketSlice';
import { useAppDispatch, useAppSelector } from '@/integrations/hooks';
import { Button } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    MediaStream,
    RTCIceCandidate,
    RTCPeerConnection,
    RTCSessionDescription,
    RTCView,
    mediaDevices
} from 'react-native-webrtc';


const VideoCall = () => {

    const { id, calltype } = useLocalSearchParams<{ id: string, calltype?: string }>();
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
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


    const create_peerConnnection = () =>{

        peerConnection.current = new RTCPeerConnection(configuration)
        // getLocalStream(setLocalStream, peerConnection);

        mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    }).then(stream =>{

                    setLocalStream(stream);
                     for (const track of stream.getTracks()) {
                        console.log(" ---------->>>>>>> Adding local track to peer connection: ");
                        let pc = peerConnection.current
                        if(!pc) return
                        pc.addTrack(track, stream);
                    }
                    })
                    
        peerConnection.current.ontrack = (event: RTCTrackEvent) => {
            console.log('on track')
            console.log(event)
        if (event.streams && event.streams[0]) {
            console.log('Remote track received.');
            console.log('event.streams[0]:', event.streams[0]);
            setRemoteStream(event.streams[0]);
        } else {
            console.log('No streams in event, creating new MediaStream.');
            let inboundStream = new MediaStream();
            inboundStream.addTrack(event.track);
            // setRemoteStream(inboundStream);
        }
        };

        
        peerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            // console.log('New ICE candidate:', event.candidate);
            // Here you would typically send the candidate to the remote peer
            // add to remote peer connection
            if(!event.candidate) return;
            // console.log('Sending ICE candidate to socketState:', event.candidate);
            dispatch(setSocketData({type:'new-ice-candidate', action:'candidate-sent', 
                data:{candidate: JSON.stringify(event.candidate), to: socketState.reciever,
                }}));

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
        
    }



    const start_call = async () => {
        create_peerConnnection()
         if(calltype == 'caller' && connectionStatus == 'init'){
            // console.log('sending video offer')
            const pc = peerConnection.current;
            if (!pc) {
                console.error('PeerConnection is not initialized');
                return;
            }
            const offer = await pc.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true });
            
            if(offer){
                await pc.setLocalDescription(offer)
                // console.log('offer created')
                dispatch(setSocketData({type:'video-offer', action:'offer-sent', 
                                data:{offerSDP: JSON.stringify(offer),
                                     to: {type:'id',id:parseInt(id)}
                                    }}));
            }else{
                console.log('offer not created')
            } 
        }

    }
    

    const acceptCall = async () => {
        create_peerConnnection()
        const pc = peerConnection.current
        console.log('accepted call')
        setConnectionStatus('connecting')
        const offer = JSON.parse(socketState.incoming.data.offerSDP)
        const offerSDP = new RTCSessionDescription(offer);
        // console.log('offer',offerSDP)
        if(!pc) return
            if (offerSDP) {
                await pc.setRemoteDescription(offerSDP)
                // console.log('Remote description set with offer SDP');
                    // Create answer
                const answer = await pc.createAnswer()
                // console.log('Created answer SDP:' );
                await pc.setLocalDescription(answer)
                            // Send answer to remote peer via websockets
                let ids:string[] = []
                
                socketState.pendingCandidates.forEach(ice=>{
                

                if (ice.id != '0' ) {
                     const candidate_ = JSON.parse(ice.data);
                    const candidate = new RTCIceCandidate(candidate_)
                    pc.addIceCandidate(candidate).then(() => {
                    // console.log(calltype,'Added pending ICE candidate:', ice, '<--------------->');
                    // dispatch(deletePendingIceCandidate([ice.id]))

                    }).catch(error => {
                        console.error('Error adding pending ICE candidate:', error)
                    });
                }
                })

                dispatch(setSocketData({type:'video-answer', action:'answer-sent', 
                         data:{answerSDP: JSON.stringify(answer), to: socketState.reciever}}));
            }

    }

   
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
                // console.log('id',id)
                dispatch(addIcePending({id,'data':candidateData}))
                }
            return
        } 
// have a second look

        if (socketState.incoming.type === 'new-ice-candidate' && socketState.incoming.action === 'candidate-received') {
            const candidateData = socketState.incoming.data.candidate;
            // console.log(calltype,'Adding ICE candidate:', '<###################>',candidateData);

            if (candidateData) {
                const candidate_ = JSON.parse(candidateData);
                const candidate = new RTCIceCandidate(candidate_)
                pc.addIceCandidate(candidate).then(() => {
                // console.log(calltype,'Added ICE candidate:', '<--------------->');
                dispatch(clearSocketData({attr:'candidate', data:candidateData, clear:'incoming'}));

                }).catch(error => {
                    console.error('Error adding ICE candidate:', error);

                });
            }
        }

        if (socketState.incoming.type === 'video-answer' && socketState.incoming.action === 'answer-received') {
            let answer = socketState.incoming.data.answerSDP;
            if (answer) {
                // console.log('Received answer SDP via socket:');
                let sdp = JSON.parse(answer)
                const answerSDP = new RTCSessionDescription(sdp);
                pc.setRemoteDescription(answerSDP).then(() => {
                    // console.log('------Remote description set with answer SDP');
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
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Button

                
                // accessibilityState={{ disabled: connectionStatus != 'init' }}
                disabled={connectionStatus != 'init'}
                style={{
                    backgroundColor: connectionStatus !== 'init' ? 'grey' : '#1e90ff',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
                onPress={() => {
                    setConnectionStatus('connecting')
                        if (calltype === 'caller') {
                            start_call();
                        } else {
                            acceptCall();
                        }
                    }}
                >
                    {calltype === 'caller' ? 'Start Call' : 'Accept Call'}
                </Button>
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