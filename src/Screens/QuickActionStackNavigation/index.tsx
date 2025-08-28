import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuickAction from "../QuickAction";
import FindMedic from "../FindMedic/FindMedic";
import Activities from "../Activities/Activities";
import UpcomingAppointments from "../UpcomingAppointments";
import Settings from "../Settings";
import PleaseWait from "../PleaseWait";
import Paired from "../Paired";
import Schedule from "../Schedule";
// import Settings from "../Settings";

const QuickActionStack = createNativeStackNavigator();

export default function QuickActionStackNavigator() {
  return (
    <QuickActionStack.Navigator>
      <QuickActionStack.Screen
        name="QuickActionHome"
        component={QuickAction}
        options={{ headerShown: false }}
      />
      <QuickActionStack.Screen
        name="FindMedic"
        component={FindMedic}
        // options={{ headerShown: false }}

        options={{ title: "Find a Medical Professional" }}
      />
      <QuickActionStack.Screen
        name="PleaseWait"
        component={PleaseWait}
        // options={{ headerShown: false }}

        options={{ title: "Please Wait" }}
      />
      <QuickActionStack.Screen
        name="Paired"
        component={Paired}
        // options={{ headerShown: false }}

        options={{ title: "Paired" }}
      />
      <QuickActionStack.Screen
        name="Schedule"
        component={Schedule}
        // options={{ headerShown: false }}

        options={{ title: "Schedule" }}
      />

      <QuickActionStack.Screen
        name="Activities"
        component={Activities}
        options={{ title: "Activities" }}
      />

      <QuickActionStack.Screen
        name="Upcoming Appointments"
        component={UpcomingAppointments}
        options={{ title: "Upcoming Appointments" }}
      />

      <QuickActionStack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />
    </QuickActionStack.Navigator>
  );
}
