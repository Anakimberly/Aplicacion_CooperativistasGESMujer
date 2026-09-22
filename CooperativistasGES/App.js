import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen           from './screens/LoginScreen';
import HomeScreen            from './screens/HomeScreen';
import CooperativistasScreen from './screens/CooperativistasScreen';
import GESMujerScreen        from './screens/GESMujerScreen';
import CosteoScreen          from './screens/CosteoScreen';
import BottomNav             from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');

  if (currentScreen === 'Login') {
    return <LoginScreen onNavigate={setCurrentScreen} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Cooperativistas':
        return <CooperativistasScreen onNavigate={setCurrentScreen} />;
      case 'GESMujer':
        return <GESMujerScreen onNavigate={setCurrentScreen} />;
      case 'Costeo':
        return <CosteoScreen onNavigate={setCurrentScreen} />;
      case 'Home':
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  screenContainer: {
    flex: 1,
  },
});