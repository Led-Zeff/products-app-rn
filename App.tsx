import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { StatusBar } from 'react-native';
import { AppState } from './src/context/AppState';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" />

      <AppState>
        <StackNavigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
