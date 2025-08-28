import { addAppointments, get_initial_appointments_data } from './features/appointment/appointmentsSlice';
import { get_initial_user_data, loginUser } from './features/user/usersSlice';

import { addPatients, get_initial_patients_data } from './features/patient/patientsSlice';


const initializeStore = async (store) => {
  const user_data = await get_initial_user_data();
  store.dispatch(loginUser({ ...user_data, save: false }));

  const patients = await get_initial_patients_data()
  store.dispatch(addPatients({ data: patients.data, save: false }))
  
  const appointments = await get_initial_appointments_data()
  store.dispatch(addAppointments({ data: appointments.data, save: false }))
};

export default initializeStore;