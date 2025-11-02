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
  }}
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

    clearSocketData: (state) => {
      state.data.type = ""
      state.data.action = ""
      writeToAsyncStorage("socket", state)
    },

    loadSocketData: (state, action) => {
      state.connected = action.payload.connected
    },
  },
});

export const { connectSocket, disconnectSocket, 
  loadSocketData,clearSocketData,setSocketData } = socketSlice.actions;

export default socketSlice.reducer;
