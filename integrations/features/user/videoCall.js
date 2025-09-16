export const videoCall = () => {
  // Video call logic here
};


export const requestVideoCall = () => {
  // Request video call logic here
//   contact a server to initiate the video call


};

// set up a web socket
  const socket = new WebSocket("wss://your-websocket-url");

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    console.log("WebSocket message received:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
