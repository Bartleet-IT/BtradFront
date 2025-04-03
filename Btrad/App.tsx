import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from "./navigation/RootNavigator";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
    <SafeAreaProvider>  {/* Moved inside NavigationContainer */}
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  </NavigationContainer>
);
}