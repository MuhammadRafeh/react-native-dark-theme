import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from 'react-native-screens';
import Navigator from './components/Navigation/Navigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator style={{ flex: 1 }} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  navigator: {
    flex: 1,
  }
});
