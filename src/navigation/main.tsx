import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreatePrescription from "../screens/CreatePrescription";
import PatientPrescription from "../screens/PatientPrescription";
import Prescription from "../screens/Prescription";
import QuickAction from "../screens/QuickAction";
import useAuthStore from "../store/auth";

import AppointmentStackScreen from "./stacks/appointment";
import HomeStackScreen from "./stacks/home";
import PatientStackScreen from "./stacks/patient";
import ProfileStackScreen from "./stacks/profile";

const PrescriptionStack = createNativeStackNavigator();

const PrescriptionStackScreen = () => {
  return (
    <PrescriptionStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PrescriptionStack.Screen name="Prescription" component={Prescription} />
      <PrescriptionStack.Screen
        name="PatientPrescription"
        component={PatientPrescription}
      />
      <PrescriptionStack.Screen
        name="CreatePrescription"
        component={CreatePrescription}
      />
    </PrescriptionStack.Navigator>
  );
};

const QuicKActionStack = createNativeStackNavigator();

const QuickActionStackScreen = () => {
  return (
    <QuicKActionStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <QuicKActionStack.Screen name="QuickAction" component={QuickAction} />
    </QuicKActionStack.Navigator>
  );
};

// Create tab navigator
const Tab = createBottomTabNavigator();

const Main = () => {
  const { user, isAuthenticated } = useAuthStore();
  console.log("isAuthenticed", isAuthenticated);
  const isPatient = user.user_role === "patient";
  const isDoctor = user.user_role === "doctor";

  return (
    <Tab.Navigator
      initialRouteName={user.profile_setup_completed ? "Home" : "Profile"}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#0B8AA0",
          // paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
          textTransform: "uppercase",
        },
        tabBarItemStyle: {
          // paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Conditionally render QuickAction tab only for patients */}
      {isPatient && (
        <Tab.Screen
          name="QuickAction"
          component={QuickActionStackScreen}
          options={{
            // You might want to explicitly set the label
            tabBarLabel: "Quick Action",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "accessibility" : "accessibility-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Appointment"
        component={AppointmentStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Prescription"
        component={PrescriptionStackScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "document-text" : "document-text-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      /> */}

      {isDoctor && (
        <Tab.Screen
          name="Patients"
          component={PatientStackScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "people" : "people-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileStackScreen
            initialRoute={
              user.profile_setup_completed
                ? "Profile"
                : user.user_role === "doctor"
                ? "SetupProfile"
                : "SetupPatientProfile"
            }
          />
        )}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = ({
  name,
  color,
  size,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
}) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default Main;
