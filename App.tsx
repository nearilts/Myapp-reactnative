import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/navigation/Navigation.js';
import { AuthProvider } from './src/context/AuthContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>

    // <Navigation />
  );
};
export default App;