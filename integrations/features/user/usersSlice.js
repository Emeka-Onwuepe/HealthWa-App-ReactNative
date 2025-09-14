import { createSlice } from '@reduxjs/toolkit';
import { readFromAsyncStorage, writeToAsyncStorage } from '../../async_store';

// const initialData = {
//   id: 0, full_name: "", email: "",
//   role: "", phone_number: '',
//   specialization: '', verified_phone_number: false, 
//   verified_email: false, usertoken: "",
//   profile_image: "", gender: "",
//   about_me: "", license_number: "",
//   years_of_experience: 0, logedin: false,

//   patient_count: 0, male_count: 0,
//   female_count:0 , 
//   biography: "", date_of_birth: '',
//   // years_of_experience: 0, logedin: false,
// }

const initialData = {
  id: 0,
  full_name: "",
  email: "",
  role: "",
  profile_image: "",
  gender: "",
  phone_number: "",
  about_me: "",
  date_of_birth: "",
  verified_phone_number: false, 
  verified_email: false, 
  usertoken: "",
  logedin: false,
  // doctors attr
  specialization: "",
  license_number: "",
  years_of_experience: 0,
  place_of_work: "",
  city_of_practice: "",
  state_of_practice: "",
  region: "",
  time_zone: "",
  // patient attr
  occupation: "",
  weight: "",
  height: "",
  is_diabetic: false,
  is_asthmatic: false,
  medications: "",
  on_long_term_meds: "",
}


export const get_initial_user_data = async () => {
  let data = await readFromAsyncStorage("user")
  let userData = initialData
  if (!data) {
    writeToAsyncStorage("user", initialData)
    // userData = initialData
  } else {
    userData = data 
  }
  return userData
} 


export const userSlice = createSlice({
  name: 'user',
  initialState: initialData,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginUser: (state, action) => {
      let save = action.payload.save
      delete action.payload.save
        for (const key in action.payload) {
           state[key] = action.payload[key]
      }
      save ? writeToAsyncStorage("user", action.payload):null
    },
    addPatientCount: (state,action) => {
      state.patient_count += 1
      if (action.payload.gender == 'female') {
        state.female_count += 1
      } else {
        state.male_count += 1
      }
      
       writeToAsyncStorage("user", state)
    },
    verify: (state, action) => {
      state[action.payload] = true
      writeToAsyncStorage("user", state)
    },
    logoutUser: (state)=>{
      for (const key in state) {
        state[key] = initialData[key]
        }
        writeToAsyncStorage("user", initialData)
    }
  },
 
});

export const { loginUser,logoutUser,addPatientCount,verify } = userSlice.actions;

export default userSlice.reducer;
