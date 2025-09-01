import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SetupPatientProfile from "../../../app/setupPatientProfile";
import Profile from "../../screens/Profile";
import SetupProfile from "../../screens/setupProfile";

const ProfileStack = createNativeStackNavigator();

interface ProfileStackScreenProps {
  initialRoute?: "Profile" | "SetupProfile" | "SetupPatientProfile";
}

const ProfileStackScreen = ({
  initialRoute = "Profile",
}: ProfileStackScreenProps) => {
  console.log("ProfileStackScreen", initialRoute);
  return (
    <ProfileStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="SetupProfile" component={SetupProfile} />
      <ProfileStack.Screen
        name="SetupPatientProfile"
        component={SetupPatientProfile}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
