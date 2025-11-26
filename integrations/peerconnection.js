import {
    mediaDevices,
    RTCPeerConnection,
    RTCSessionDescription,
} from 'react-native-webrtc'

    export const create_peerConnnection = async(peerConnection,configuration,
                                        localStream,remoteStream,calltype,
                                        socketState, dispatch,setSocketData,
                                        setConnectionStatus ) =>{

        peerConnection.current = new RTCPeerConnection(configuration)
        // getLocalStream(setLocalStream, peerConnection);

        const stream = await mediaDevices.getUserMedia({
                        audio: true,
                        video: true})
        localStream.current = stream
        console.log(calltype," ---------->>>>>>> Adding local track to peer connection: ");
        // add local tracks and verify they were actually added to the RTCPeerConnection
        const tracks = stream.getTracks();
        tracks.forEach(track => {
            try {
            const sender = peerConnection.current?.addTrack(track, stream);
            if (!sender) {
                console.warn('addTrack returned no sender for', track.kind);
            }
            } catch (err) {
            console.error('Error adding local track', track.kind, err);
            }
        });

        // wait 1 second before continuing (give media tracks time to initialize)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // verify senders include the added tracks
        const senders = peerConnection.current?.getSenders() ?? [];
        const addedKinds = new Set(senders.filter(s => s.track).map(s => s.track.kind));
        const missing = tracks.filter(t => !addedKinds.has(t.kind));
        if (missing.length > 0) {
            console.warn('Some local tracks were not added to peerConnection:', missing.map(t => t.kind));
            // handle failure as needed (e.g. set an error state, retry, abort)
        } else {
            console.log('All local tracks successfully added to peerConnection');
        }
                    
        peerConnection.current.ontrack = async (event) => {
            // console.log('on track')
            // console.log(event)
        if (event.streams && event.streams[0]) {
            console.log('Remote track received.',calltype);
            remoteStream.current = event.streams[0]

        } else {
            console.log('No streams in event, creating new MediaStream.');
            let inboundStream = new MediaStream();
            inboundStream.addTrack(event.track);
            remoteStream.current = inboundStream
        }
        };

        
        peerConnection.current.onicecandidate = (event) => {
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

        peerConnection.current.oniceconnectionstatechange = (event) => {
            const pc = peerConnection.current
            if(!pc)return
            if(pc.iceConnectionState === 'connected'){
                setConnectionStatus('connected')
            }
            console.log('################################');
            console.log('iceconnectionstatechange event:', event);
            console.log(calltype,'ICE connection state:', pc.iceConnectionState);
            console.log('################################');
        };
        peerConnection.current.onconnectionstatechange = (event) => {
             const pc = peerConnection.current
            if(!pc)return
            console.log('--------------------------------');
            console.log('connectionstatechange event:', event);
            console.log(calltype,'Connection state change:', pc.connectionState);
            console.log('--------------------------------');
        };
    }


export const start_call = async (peerConnection,configuration,
                                        localStream,remoteStream,calltype,
                                        socketState, dispatch,setSocketData,
                                        setConnectionStatus,connectionStatus,
                                        create_peerConnnection,id
                                    ) => {

        await create_peerConnnection(peerConnection,configuration,
                                        localStream,remoteStream,calltype,
                                        socketState, dispatch,setSocketData,
                                        setConnectionStatus)
         if(calltype == 'caller' && connectionStatus == 'init'){
            // console.log('sending video offer')
            const pc = peerConnection.current;
            if (!pc) {
                console.error('PeerConnection is not initialized');
                return;
            }

            

            const offer = await pc.createOffer({offerToReceiveAudio:true, offerToReceiveVideo:true});
            if(offer){
                dispatch(setSocketData({type:'video-offer', action:'offer-sent', 
                                data:{offerSDP: JSON.stringify(offer),
                                     to: {type:'id',id:parseInt(id)}
                                    }}));
                                    
                await pc.setLocalDescription(offer)
                // console.log('offer created')
            }else{
                console.log('offer not created')
            } 
        }

    }
    

export const acceptCall = async (peerConnection,configuration,
                                        localStream,remoteStream,calltype,
                                        socketState, dispatch,setSocketData,
                                        setConnectionStatus,connectionStatus,
                                        create_peerConnnection) => {

        await create_peerConnnection(peerConnection,configuration,
                                        localStream,remoteStream,calltype,
                                        socketState, dispatch,setSocketData,
                                        setConnectionStatus)
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
                const answer = await pc.createAnswer();
                // verify answer SDP contains video media section
                const sdpText = answer.sdp ?? '';
                if (!/m=video/i.test(sdpText)) {
                    console.warn('Created answer SDP does not contain a video m= section');
                    // setheaderText('No video in answer SDP');
                } else {
                    console.log('Answer SDP contains video information');
                }
                // console.log('Created answer SDP:' );
                dispatch(setSocketData({type:'video-answer', action:'answer-sent', 
                         data:{answerSDP: JSON.stringify(answer), to: socketState.reciever}}));

                await pc.setLocalDescription(answer)
                            // Send answer to remote peer via websockets
                
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

            }

    }

export const endCall = (peerConnection,localStream,remoteStream,
                     socketState, dispatch,setSocketData,
                    setConnectionStatus,setReceiver) => {

        peerConnection.current?.close()
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        // stop and release local stream tracks
        if (localStream.current) {
            localStream.current.getTracks().forEach(track => {
                try { track.stop(); } catch {}
            });
            localStream.current = null;
        }

        // stop and release remote stream tracks
        if (remoteStream.current) {
            remoteStream.current.getTracks().forEach(track => {
                try { track.stop(); } catch {}
            });
            remoteStream.current = null;
        }

        // reset UI / state
        setConnectionStatus('init');
        // setheaderText(text);

        // notify remote peer (optional signaling)
        dispatch(setSocketData({
            type: 'hang-up',
            action: 'hangup-sent',
            data: { to: socketState.reciever }
        }));

        // clear receiver
        dispatch(setReceiver({ type: 'id', id: 0 }));

    }
   