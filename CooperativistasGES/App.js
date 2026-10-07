import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen           from './screens/LoginScreen';
import HomeScreen            from './screens/HomeScreen';
import CooperativistasScreen from './screens/CooperativistasScreen';
import GESMujerScreen        from './screens/GESMujerScreen';
import CosteoScreen          from './screens/CosteoScreen';
import PerfilScreen          from './screens/PerfilScreen';
import InformacionScreen     from './screens/InformacionScreen';
import GuiaEconomiaScreen    from './screens/GuiaEconomiaScreen';
import BottomNav             from './components/BottomNav';

import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [userEmail, setUserEmail] = useState('');
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    comunidad: '',
    telefono: '',
    cooperativa: '',
  });

  // Cargar perfil desde Firestore cuando cambia el correo del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) return;
      try {
        const docRef = doc(db, 'cooperativistas', userEmail.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (e) {
        console.log('Aviso al cargar perfil en App:', e);
      }
    };
    fetchProfile();
  }, [userEmail]);

  const handleNavigate = (screen, email = null) => {
    if (email) {
      setUserEmail(email);
    }
    setCurrentScreen(screen);
  };

  const handleSaveProfile = (newProfile) => {
    setProfileData((prev) => ({ ...prev, ...newProfile }));
  };

  if (currentScreen === 'Login') {
    return <LoginScreen onNavigate={handleNavigate} onSaveProfile={handleSaveProfile} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Cooperativistas':
        return (
          <CooperativistasScreen
            onNavigate={handleNavigate}
            userEmail={userEmail}
            profileData={profileData}
            onSaveProfile={handleSaveProfile}
          />
        );
      case 'GESMujer':
        return <GESMujerScreen onNavigate={handleNavigate} />;
      case 'Costeo':
        return <CosteoScreen onNavigate={handleNavigate} />;
      case 'GuiaEconomia':
        return <GuiaEconomiaScreen onNavigate={handleNavigate} />;
      case 'Perfil':
        return (
          <PerfilScreen
            onNavigate={handleNavigate}
            userEmail={userEmail}
            profileData={profileData}
            onSaveProfile={handleSaveProfile}
          />
        );
      case 'Informacion':
        return (
          <InformacionScreen
            onNavigate={handleNavigate}
          />
        );
      case 'Home':
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
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