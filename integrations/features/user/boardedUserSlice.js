import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';

const initialData = {
  boarded: false,
  registered: false,
  navigate:false,
  old: null,
  canSearch: false,
}

export const get_initial_board_data = async () => {
  let data = await readFromAsyncStorage("board")
  let userData = initialData
  if (!data) {
    writeToAsyncStorage("board", initialData)
  } else {
    userData = data 
  }
  return userData
} 


export const boardUserSlice = createSlice({
  name: 'board',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    boardUser: (state) => {
      state.boarded = true
      state.navigate = true
      writeToAsyncStorage("board", state)
      console.log(state)
    },
    userRegistered: (state) => {
      state.registered = true
      state.navigate = true
      writeToAsyncStorage("board", state)
    },
    setCanSearch: (state) =>{
      state.canSearch = !state.canSearch
    },
    loadData: (state, action) => {
      state.boarded = action.payload.boarded
      state.registered = action.payload.registered
      state.navigate = true
    },
  },
});

export const { boardUser,userRegistered,loadData,setCanSearch } = boardUserSlice.actions;

export default boardUserSlice.reducer;
