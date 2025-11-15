import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';

const initialData = {
  connected: false,
  reciever: {type:'id',id:0},
  busy: false,
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
    to: 0,
    from_id: "",
    from_socket: ""
  }},
  pendingCandidates: [{id:'0',data:""}],

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
      // console.log("Clearing socket data for:", action.payload)
      const payload = action.payload
      const clear = action.payload.clear
      if(state[clear].data[payload.attr] == payload.data){
        state[clear].data[payload.attr] = ""
        state[clear].action = ""
        state[clear].type = ""

      }
      writeToAsyncStorage("socket", state)
    },

    addIcePending: (state,action)=> {
        state.pendingCandidates = [...state.pendingCandidates,action.payload]
        if(state.incoming.data.candidate == action.payload.data){
           state.incoming.data.candidate = ""
          state.incoming.action = ""
            state.incoming.type = ""
        }
        writeToAsyncStorage("socket", state)
    },

    deletePendingIceCandidate: (state,action)=>{
      let ids = action.payload
      let stillPending = []
      state.pendingCandidates.forEach(ice=>{
        let found = false
        ids.forEach(id=>{
          if(id==ice.id){
            found = true
            return
          }
        })
        if(!found){
          stillPending.push(ice)
        }
      })
      // console.log(' clear ids',ids)
      // console.log('pending',state.pendingCandidates)
      // console.log('still pending',stillPending)
      state.pendingCandidates = stillPending
      writeToAsyncStorage("socket", state)
    },

    setSocketIncoming: (state, action) => {
      if(action.payload.type == 'new-ice-candidate'){
        // console.log(action.payload.from,action.payload)
      }
       if(action.payload.type === 'video-offer'){
        state.reciever = action.payload.reciever
        state.pendingCandidates = []
      }
      // console.log('incoming type',action.payload.type,action.payload.from)
      state.incoming.type = action.payload.type
      state.incoming.action = action.payload.action
      state.incoming.data = {...state.incoming.data,...action.payload.data}
      state.incoming.data.from_id = action.payload.from
     
      writeToAsyncStorage("socket", state)
    },
    setBusy: (state,action)=>{
      state.busy = action.payload,
      writeToAsyncStorage("socket", state)

    },
    setReceiver: (state, action) => {
      state.reciever = action.payload
    },
    loadSocketData: (state, action) => {
      state.connected = action.payload.connected
    },
  },
});

export const { connectSocket, disconnectSocket, 
  loadSocketData,clearSocketData,setSocketData, 
  setSocketIncoming,setBusy, setReceiver,addIcePending,
  deletePendingIceCandidate } = socketSlice.actions;

export default socketSlice.reducer;
