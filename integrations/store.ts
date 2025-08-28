import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import alertSlice from './features/alert/alertSlice';
import { mediAppApi } from './features/apis/apiSlice';
import appointmentsSlice from './features/appointment/appointmentsSlice';
import patientsSlice from './features/patient/patientsSlice';
import userslice from './features/user/usersSlice';
import initializeStore from './initializeStore';


export const store = configureStore({
  reducer: {
    user: userslice,
    alert: alertSlice,
    patients: patientsSlice,
    appointments: appointmentsSlice,
    [mediAppApi.reducerPath] : mediAppApi.reducer
  },
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware().concat([mediAppApi.middleware]),
});



initializeStore(store);

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




