import { base_url } from "@/integrations/features/apis/apiSlice";
import {
    connectSocket, disconnectSocket,
    setSocketIncoming
} from "@/integrations/features/socket/socketSlice";
import { useAppDispatch, useAppSelector } from "@/integrations/hooks";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { io } from "socket.io-client";

export default function SocketFeature() {
    // console.log("SocketFeature rendered");
    let socket = useRef(null);

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const socketState = useAppSelector(state => state.socket);
    const [tokenChanged,setTokenChanged] = useState(true)
    const [token,setToken] = useState('')


    const socketConnection = (token)  =>{
    const connection = io(base_url,{
        // transports: ['websocket'],
        reconnectionDelayMax: 10000,
        auth: {
            token
        }
        });
        connection.on("connect_error", (err) => {
            console.log("Socket connect_error:", err.message);
            console.log("Socket connect_error:", err.cause);
             console.log("Socket connect_error:", err.name);



        });
        

        connection.on("reconnect_error", (err) => {
            console.log("Socket reconnect_error:", err);
        });

        connection.on("error", (err) => {
            console.log("Socket error:", err);
        });
        return connection
        }

    let attr = ''


    useEffect(() => {

    // if(!user.logedin && socket.current){
    //     socket.current.disconnect();
    //     socket.current = null;
    //     dispatch(disconnectSocket());
    // }

    if(token != '' && token != user.usertoken){
        setToken(user.usertoken)
        setTokenChanged(true)
    }

    if(socket.current){
    if(socketState.connected && socket.current.readyState < 1){
        console.log("Socket not connected, updating state...");
        dispatch(disconnectSocket())
    }
    }
    
    if(user.logedin && !socket.current && socketState.connected){
        dispatch(disconnectSocket())
    }

   if (socket.current && user.logedin) {
        // console.log('con 1',socket.current.connected)
        // console.log('con 2',socketState.connected)


    if (socket.current.readyState === 1 && !socketState.connected) {
        console.log("Socket is already connected.");
        dispatch(connectSocket());
    }
    else if(socket.current.readyState === 0 && !socketState.connected){
        console.log("Reconnecting socket...");
        socket.current.connect();
        dispatch(connectSocket());
    }
    }

    if ((user.logedin && !socket.current) && tokenChanged) {
        console.log("Initializing socket connection...");
        dispatch(disconnectSocket())
        if(token != '' && socket.current.connected ){
            socket.current.disconnect()
        }
        socket.current = socketConnection(user.usertoken);
        console.log("Socket initialized:", socket.current.connected);
        if(token == ''){
            setToken(user.usertoken)
        }
        setTokenChanged(false)
        // dispatch(connectSocket());

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

    socket.current.on('success', (message) => {
      console.log("Success message from socket:", message);
    });

    socket.current.on('error', (error) => {
      console.error("Error message from socket:", error);
    });

    // socket.current.on('connect_error', (err) => {
    //   console.log(`Connection error: ${err.message}`);  
      
    //  });

     socket.current.on('video-offer', (data) => {
        // console.log("Received video-offer via socket from :",data.from);
        // Handle the received offer (e.g., set remote description)
        // dispatch(setReceiver({type:'id',id: data.from }))
        dispatch(setSocketIncoming({type: data.type, action: data.action,
                                    reciever : {type:'id',id: data.from },
                                    data:{offerSDP: data.offerSDP, from:data.from}}));
    });

     socket.current.on('video-answer', (data) => {
        // console.log("Received video-answer via socket:");
        // Handle the received answer (e.g., set remote description)
        dispatch(setSocketIncoming({type: data.type, action:data.action, data:{answerSDP: data.answerSDP}}));
    });

    socket.current.on('new-ice-candidate', (data) => {
        // console.log("Received new-ice-candidate via socket:");
        // Handle the received answer (e.g., set remote description)
        dispatch(setSocketIncoming({type: data.type, action: data.action, from: data.from, data:{candidate: data.candidate}}));
    });

    //  dispatch(disconnectSocket())
    

}


}, [user, socketState.connected,tokenChanged]);

const selector = {offerSDP: "video-offer",
                    answerSDP: "video-answer",
                    candidate: "new-ice-candidate"}
                    


useEffect(() => {
    
console.log("Socket state changed -->", socketState.connected);

if(socketState.data.type !== "" && socketState.data.type !== ""){
    // console.log("New socket data added:", socketState.data.type);

    for (const key in selector) {
        if(selector[key] === socketState.data.type){
            attr = key
        }
    }

    const socketEmit = socket.current.emit(socketState.data.type, {
        action: socketState.data.action,
        [attr]: socketState.data.data[attr] ,
        to: socketState.data.data.to,
        type:socketState.data.type
    }
    , 
    ( res) => {
        if(res.status === "ok"){
            // console.log(`Emitted ${socketState.data.type} event successfully.`);
            dispatch(clearSocketData({attr, data:socketState.data.data[attr], clear:'data'}));
        } else {
            console.log(`Error response for ${socketState.data.type} event:`, res);
        }
    }
);
// socketEmit.on("error", (error) => {
//     console.error(`Error emitting ${socketState.data.type} event:`, error);
// });
// console.log(socketEmit)
// socketEmit.on("success", (response) => {
//     console.log(`Success response for ${socketState.data.type} event:`, response);
//     console.log(`Emitted ${socketState.data.type} event successfully.`);
//     dispatch(clearSocketData({attr, data:socketState.data.data[attr], clear:'data'}));
// });
// console.log(socketEmit," emitted via socket.");
}

 }, [socketState.data]);


    return (   
         <View></View>
    )
}