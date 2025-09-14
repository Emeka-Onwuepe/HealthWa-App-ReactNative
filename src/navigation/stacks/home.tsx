import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../../app/(dashboard)/Home";
import Settings from "../../../app/(dashboard)/settings";
import ChangePassword from "../../../app/(dashboard)/settings/changePassword";
import DataProtection from "../../../app/(dashboard)/settings/dataProtection";
import FAQ from "../../../app/(dashboard)/settings/faq";
import Notification from "../../../app/(dashboard)/settings/notification";
import PrivacyPolicy from "../../../app/(dashboard)/settings/privacyPolicy";

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
