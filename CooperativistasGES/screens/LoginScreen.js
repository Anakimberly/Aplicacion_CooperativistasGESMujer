import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, Image,
} from 'react-native';

const PURPLE = '#5b1378';

export default function LoginScreen({ onNavigate }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    const emailToUse = correo.trim() ? correo.trim() : 'cooperativista@gesmujer.org';
    onNavigate('Home', emailToUse);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LOGOGES.png')}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>

        {/* Campos */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo:</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType='email-address'
            autoCapitalize='none'
            placeholder='ejemplo@gesmujer.org'
            placeholderTextColor='rgba(255,255,255,0.5)'
          />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            placeholderTextColor='rgba(255,255,255,0.5)'
          />
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 200, height: 200 },
  formContainer: { marginBottom: 30 },
  label: { color: 'white', fontSize: 16, marginTop: 20, marginBottom: 4 },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 16,
    paddingVertical: 8,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  button: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: { color: 'white', fontSize: 14, fontWeight: '500' },
});