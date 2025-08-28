import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Patients from "../../screens/Patients";
import ConsultationDetail from "../../screens/ConsultationDetail";

const PatientStack = createNativeStackNavigator();

const PatientStackScreen = () => {
  return (
    <PatientStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PatientStack.Screen name="Patients" component={Patients} />
      <PatientStack.Screen
        name="PatientProfile"
        component={ConsultationDetail}
      />
    </PatientStack.Navigator>
  );
};

export default PatientStackScreen;
