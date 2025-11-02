import { Alert } from 'react-native';
import {
  // export const videoCall = () => {
  //   // Video call logic here
  // };
  // export const requestVideoCall = () => {
  //   // Request video call logic here
  // //   contact a server to initiate the video call
  // };
  // // set up a web socket
  //   const socket = new WebSocket("wss://your-websocket-url");
  //   socket.onopen = () => {
  //     console.log("WebSocket connection established");
  //   };
  //   socket.onmessage = (event) => {
  //     console.log("WebSocket message received:", event.data);
  //   };
  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };
  // Example: Using react-native-webrtc for video call functionality
  RTCPeerConnection,
  mediaDevices
} from 'react-native-webrtc';

let socket = null;
let peerConnection = null;

export const startWebSocket = (url, onMessage) => {
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    if (onMessage) onMessage(event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

export const requestVideoCall = (calleeId) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'video-call-request', calleeId }));
  } else {
    Alert.alert('Connection Error', 'WebSocket is not connected.');
  }
};

export const acceptVideoCall = (callerId) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'video-call-accept', callerId }));
  }
};

export const setupPeerConnection = async (onStream) => {
  peerConnection = new RTCPeerConnection();

  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });

  peerConnection.onaddstream = (event) => {
    if (onStream) onStream(event.stream);
  };

  return stream;
};

export const endVideoCall = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (socket) {
    socket.close();
    socket = null;
  } 
};