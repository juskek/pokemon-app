import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pokedex from './src/components/Pokedex';
import Navigator from './src/navigation/Navigator';
export default function App() {
  return (
    <Navigator />
  );
}
