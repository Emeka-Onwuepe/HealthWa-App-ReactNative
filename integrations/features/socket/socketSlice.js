import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';

const initialData = {
  connected: false,
  data:{type:"",
    action:"",
    data:{
    message: "",
    answerSDP:"",
    offerSDP:"",
    candidate:"",
    to: 0,
  }},
  incoming:{type:"",
    action:"",
    data:{
    message: "",
    answerSDP:"",
    offerSDP:"",
    candidate:"",
    pendingCandidates: [],
    to: 0,
  }},

}

export const get_initial_socket_data = async () => {
  let data = await readFromAsyncStorage("socket")
  let socketData = initialData
  if (!data) {
    writeToAsyncStorage("socket", initialData)
  } else {
    socketData = data 
  }
  return socketData
} 


export const socketSlice = createSlice({
  name: 'socket',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   connectSocket: (state) => {
      state.connected = true
      writeToAsyncStorage("socket", state)
    },
    disconnectSocket: (state) => {
      state.connected = false
      writeToAsyncStorage("socket", state)
    },

    setSocketData: (state, action) => {
      state.data.type = action.payload.type
      state.data.action = action.payload.action
      state.data.data = {...state.data.data,...action.payload.data}
      writeToAsyncStorage("socket", state)
    },

    clearSocketData: (state,action) => {
      console.log("Clearing socket data for:", action.payload)
      const payload = action.payload
      const clear = action.payload.clear
      if(state[clear][payload.attr] == payload.data){
        state[clear][payload.attr] = ""
        state[clear].action = ""
        state[clear].type = ""

      }
      writeToAsyncStorage("socket", state)
    },
    setSocketIncoming: (state, action) => {
      console.log('data recieved in incoming state')
      state.incoming.type = action.payload.type
      state.incoming.action = action.payload.action
      state.incoming.data = {...state.incoming.data,...action.payload.data}
      writeToAsyncStorage("socket", state)
    },

    loadSocketData: (state, action) => {
      state.connected = action.payload.connected
    },
  },
});

export const { connectSocket, disconnectSocket, 
  loadSocketData,clearSocketData,setSocketData, 
  setSocketIncoming } = socketSlice.actions;

export default socketSlice.reducer;
