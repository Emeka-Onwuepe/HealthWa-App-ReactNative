import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Appointment from "../../screens/Appointment";
import Calling from "../../screens/Calling";
import CreateAppointment from "../../screens/CreateAppointment";
import Patients from "../../screens/Patients";

const AppointmentStack = createNativeStackNavigator();

const AppointmentStackScreen = () => {
  return (
    <AppointmentStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppointmentStack.Screen name="Appointment" component={Appointment} />
      <AppointmentStack.Screen name="Patients" component={Patients} />
      <AppointmentStack.Screen
        name="CreateAppointment"
        component={CreateAppointment}
      />
      <AppointmentStack.Screen name="Call" component={Calling} />
    </AppointmentStack.Navigator>
  );
};

export default AppointmentStackScreen;
