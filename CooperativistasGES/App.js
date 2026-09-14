import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');

  if (currentScreen === 'Login') {
    return <LoginScreen onNavigate={setCurrentScreen} />;
  }
  return <HomeScreen onNavigate={setCurrentScreen} />;
}