import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>  {/* Moved inside NavigationContainer */}
        <StatusBar style="light" />
        <RootNavigator />
        <Toast /> {/* Added Toast component */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
