import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../../app/(dashboard)/Home";
import ChangePassword from "../../screens/ChangePassword";
import DataProtection from "../../screens/DataProtection";
import FAQ from "../../screens/FAQ";
import Notification from "../../screens/Notification";
import PrivacyPolicy from "../../screens/PrivacyPolicy";
import Settings from "../../screens/Settings";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <HomeStack.Screen name="Faq" component={FAQ} />
      <HomeStack.Screen name="DataProtection" component={DataProtection} />
      <HomeStack.Screen name="ChangePassword" component={ChangePassword} />
      <HomeStack.Screen name="Notification" component={Notification} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
