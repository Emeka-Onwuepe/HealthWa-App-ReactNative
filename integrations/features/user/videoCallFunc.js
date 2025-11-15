

// export const getLocalStream = async (setLocalStream, peerConnection) => {
//             const stream = await mediaDevices.getUserMedia({
//                 audio: true,
//                 video: true,
//             });
//              for (const track of stream.getTracks()) {
//                 console.log(" ---------->>>>>>> Adding local track to peer connection: ");
//                 peerConnection.current.addTrack(track, stream);
//             }
//             setLocalStream(stream);
//             // setRemoteStream(stream)
//             // Add local stream tracks to peer connection
//         };

// export const handleRemoteStream = (peerConnection, setRemoteStream,) => {
//     if (!peerConnection){
//         console.log("Peer connection is null");
//         return;
//     }

//     peerConnection.current.ontrack = (event) => {
//         if (event.streams && event.streams[0]) {
//             setRemoteStream(event.streams[0]);
//         } else {
//             let inboundStream = new MediaStream();
//                     inboundStream.addTrack(event.track);
//                     setRemoteStream(inboundStream);
//                 }
//             };
//     // (peerConnection);

//         };

export const handleRemoteStream = (peerConnection, setRemoteStream,e) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot handle remote stream");
        return;
    }
    console.log("Remote track event: ", e);
    if (e && e.streams && e.streams[0]) {
        setRemoteStream(e.streams[0]);
    } else {
        console.log("Creating inbound stream from track");
        // let inboundStream = new MediaStream();
        // inboundStream.addTrack(e.track);
        // setRemoteStream(inboundStream);
    }
    // (peerConnection);

};

export const createOffer = async (peerConnection,setOfferSDP,) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot create offer");
        return;
    }
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    console.log('peerConnection after setting local description:', peerConnection);

    setOfferSDP(JSON.stringify(offer));
    console.log('Offer SDP:', offer);
    // (peerConnection);
    return offer;
}


export const createAnswer = async (peerConnection, offer,) => {
    console.log('Creating answer with offer:', offer);
    if (!peerConnection){
        console.log("Peer connection is null - cannot create answer");
        return;
    }
    if(!offer) return console.log('Retrieve offer from peer first...')
    console.log('peerConnection before setting remote description:', peerConnection);

    let ff = await peerConnection.current.setRemoteDescription(JSON.parse(offer));
    console.log('Set remote description result:', ff);
    const answer = await peerConnection.current.createAnswer();
     console.log('Answer SDP:', answer);
    await peerConnection.current.setLocalDescription(answer);
    console.log('peerConnection after setting local description:', peerConnection);
   
    return answer;
}

export const addAnswer = async (peerConnection, answer,) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot add answer");
        return;
    }
    if(!answer) return console.log('Retrieve answer from peer first...')

    await peerConnection.current.setRemoteDescription(answer);
    // (peerConnection);
}

export const addIceCandidate = async (peerConnection, candidate,) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot add ICE candidate");
        return;
    }
    if (candidate) {
        try {
            await peerConnection.current.addIceCandidate(candidate);
            // (peerConnection);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }
}

export const onIceCandidate_ = (peerConnection, sendCandidate=false) => {
    if (!peerConnection){
        console.log("Peer connection is null");
        return;
    }
    console.log("Setting up ICE candidate handler");
    peerConnection.current.onicecandidate = (event) => {
        console.log("ICE candidate event: ", event);
        if (event.candidate) {
            // sendCandidate(event.candidate);
            peerConnection.current.addIceCandidate(event.candidate);
        }
    };
    
    // (peerConnection);
}

export const onIceCandidate = (peerConnection, e) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot handle ICE candidate");
        return;
    }

    console.log("ICE candidate event: ", e);
        if (e.candidate) {
            // sendCandidate(e.candidate);
            peerConnection.current.addIceCandidate(e.candidate);
        }
    };
    

const onIceCandidateChange = (peerConnection, e) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot handle ICE candidate change");
        return;
    }
    console.log("ICE candidate change event: ", e);
    console.log('ICE connection state changed to:', peerConnection.current.iceConnectionState);
        // Handle candidate change if needed
    };

export const eventListeners = (peerConnection ) => {
    if (!peerConnection){
        console.log("Peer connection is null - cannot set event listeners");
        return;
    }
            peerConnection.current.addEventListener('icecandidate', (e) => onIceCandidate(peerConnection, e));
            peerConnection.current.addEventListener('iceconnectionstatechange', (e) => onIceCandidateChange(peerConnection, e));

            peerConnection.current.addEventListener('track', (e) => handleRemoteStream(peerConnection, setRemoteStream, e));
        }