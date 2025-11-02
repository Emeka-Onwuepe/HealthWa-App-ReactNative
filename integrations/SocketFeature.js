import { base_url } from "@/integrations/features/apis/apiSlice";
import { connectSocket, disconnectSocket } from "@/integrations/features/socket/socketSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { io } from "socket.io-client";

export default function SocketFeature() {
    console.log("SocketFeature rendered");
    let socket = useRef(null);

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const socketState = useAppSelector(state => state.socket);

    const socketConnection = (token)  =>{
    const connection = io(base_url,{
        reconnectionDelayMax: 10000,
        auth: {
            token
        }
        });

        return connection
        }


    useEffect(() => {
        dispatch(disconnectSocket())
    }, []);



    useEffect(() => {
    if (user.logedin && !socketState.connected) {
        socket.current = socketConnection(user.usertoken);
        dispatch(connectSocket());

    socket.current.on("connect", () => {
      console.log("Socket ID from con:", socket.current.id);
      dispatch(connectSocket())
    });

    socket.current.on("disconnect", () => {
      console.log('disconnected')
      dispatch(disconnectSocket())
     });

     socket.current.on("reconnect", () => {
      console.log('reconnecting')
          });


    // socket.current.on('connect_error', (err) => {
    //   console.log(`Connection error: ${err.message}`);  
      
    //  });

     socket.current.on('video-offer', (data) => {
        console.log("Received video-offer via socket:", data);
        // Handle the received offer (e.g., set remote description)
        dispatch(setSocketData({type:'video-offer', action:'offer-received', data:{offerSDP: data.offerSDP, from:data.from}}));
    });

     socket.current.on('video-answer', (data) => {
        console.log("Received video-answer via socket:", data);
        // Handle the received answer (e.g., set remote description)
        dispatch(setSocketData({type:'video-answer', action:'answer-received', data:{answerSDP: data.answerSDP}}));
    });

    //  dispatch(disconnectSocket())

  }
}, [user, socketState.connected]);




useEffect(() => {
    
console.log("Socket state changed -->", socketState.connected);

if(socketState.data.type !== "" && socketState.data.type !== ""){
    console.log("New socket data received:", socketState.data.type);

    socket.current.emit(socketState.data.type, {
        action: socketState.data.action,
        data: socketState.data.data
    });

}

 }, [socketState]);


    return (   
         <View></View>
    )
}