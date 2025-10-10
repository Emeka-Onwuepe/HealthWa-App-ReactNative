import { base_url } from "@/integrations/features/apis/apiSlice";
import { io } from "socket.io-client";


// const socket = io(baseUrl);
// export const socketFun = () =>{
    
// }

// socketFun()
// get user token
// let  user = {usertoken:""}
// get data from user


const socketConnection_ = (token)  =>{
    const connection = io(base_url,{
reconnectionDelayMax: 10000,
  auth: {
    token
  }
});

return connection
}



// socketConnection.on("connect", () => {
    
//     });

// socketConnection.on("disconnect", () => {
    
//     });

// const onConnection = (socket,id) =>{

// }

export default socketConnection_;