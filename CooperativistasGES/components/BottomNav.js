import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#5b1378';

export default function BottomNav({ currentScreen, onNavigate }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate && onNavigate('Home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={currentScreen === 'Home' ? 'home' : 'home-outline'}
          size={28}
          color='white'
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onNavigate && onNavigate('Perfil')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={currentScreen === 'Perfil' ? 'person' : 'person-outline'}
          size={28}
          color='white'
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        activeOpacity={0.7}
      >
        <Ionicons name='settings-outline' size={28} color='white' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: PURPLE,
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    padding: 6,
  },
});
