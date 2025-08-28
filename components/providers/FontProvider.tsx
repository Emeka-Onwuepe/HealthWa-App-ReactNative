import React, { ReactNode, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useFonts, Mitr_400Regular, Mitr_300Light, Mitr_500Medium, Mitr_600SemiBold, Mitr_700Bold } from '@expo-google-fonts/mitr';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

interface FontProviderProps {
  children: ReactNode;
}

const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    MitrLight: Mitr_300Light,
    MitrRegular: Mitr_400Regular,
    MitrMedium: Mitr_500Medium,
    MitrSemiBold: Mitr_600SemiBold,
    MitrBold: Mitr_700Bold,
  });

  // Use useEffect and useCallback to hide the splash screen
  // once the fonts have finished loading
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded) {
    return null; // Return null instead of AppLoading
  }

  return <View onLayout={onLayoutRootView} style={{ flex: 1 }}>{children}</View>;
};

export default FontProvider;