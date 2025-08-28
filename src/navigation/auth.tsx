import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";
import LetGetStarted from "../screens/GetStarted";
import ResetPassword from "../screens/ResetPassword";
import SetupProfile from "../screens/SetupProfile";

const Auth = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LetGetStarted" component={LetGetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ResetPassword} />
      <Stack.Screen name="SetupProfile" component={SetupProfile} />
    </Stack.Navigator>
  );
};

export default Auth;
