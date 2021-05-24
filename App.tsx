import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" />

      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
