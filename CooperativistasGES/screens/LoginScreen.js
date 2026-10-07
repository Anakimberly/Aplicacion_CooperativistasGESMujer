import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const PURPLE = '#5b1378';

export default function LoginScreen({ onNavigate, onSaveProfile }) {
  // Estado para alternar entre 'login' y 'registro'
  const [modo, setModo] = useState('login'); // 'login' | 'registro'

  // Campos de Login
  const [usuario, setUsuario] = useState(''); // Puede ser correo o nombre de usuario
  const [contrasenaLogin, setContrasenaLogin] = useState('');

  // Campos de Registro
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [contrasenaRegistro, setContrasenaRegistro] = useState('');

  const [cargando, setCargando] = useState(false);

  //  Iniciar Sesión (por Nombre de Usuario o Correo Electrónico)                                
  const handleLogin = async () => {
    const inputUserClean = usuario.trim();
    const inputUserLower = inputUserClean.toLowerCase();
    const passToUse = contrasenaLogin.trim();

    if (!inputUserClean || !passToUse) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu usuario o correo y tu contraseña.');
      return;
    }

    setCargando(true);
    let emailToUse = inputUserClean;

    try {
      // Si el input no contiene '@', buscar el correo asociado al usuario o nombre en Firestore
      if (!inputUserClean.includes('@')) {
        let userData = null;

        // 1. Buscar por nombreUsuarioLower
        let q = query(
          collection(db, 'cooperativistas'),
          where('nombreUsuarioLower', '==', inputUserLower)
        );
        let querySnapshot = await getDocs(q);

        // 2. Buscar por nombreUsuario exacto
        if (querySnapshot.empty) {
          q = query(
            collection(db, 'cooperativistas'),
            where('nombreUsuario', '==', inputUserClean)
          );
          querySnapshot = await getDocs(q);
        }

        // 3. Buscar por campo 'nombre'
        if (querySnapshot.empty) {
          q = query(
            collection(db, 'cooperativistas'),
            where('nombre', '==', inputUserClean)
          );
          querySnapshot = await getDocs(q);
        }

        if (!querySnapshot.empty) {
          userData = querySnapshot.docs[0].data();
          if (userData.correo) {
            emailToUse = userData.correo;
            if (onSaveProfile) {
              onSaveProfile(userData);
            }
          } else {
            Alert.alert('Error', 'No se encontró un correo válido para este usuario.');
            setCargando(false);
            return;
          }
        } else {
          Alert.alert(
            'Usuario no encontrado',
            `No encontramos a "${inputUserClean}". Verifica tu nombre de usuario o regístrate.`
          );
          setCargando(false);
          return;
        }
      } else {
        // Si ingresó un correo con '@', cargar los datos del perfil desde Firestore
        try {
          const docRef = doc(db, 'cooperativistas', emailToUse.toLowerCase());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && onSaveProfile) {
            onSaveProfile(docSnap.data());
          }
        } catch (e) {
          console.log('Error consultando perfil:', e);
        }
      }

      // Iniciar sesión en Firebase Auth
      await signInWithEmailAndPassword(auth, emailToUse.toLowerCase(), passToUse);
      onNavigate('Home', emailToUse.toLowerCase());
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(
          'Datos incorrectos',
          'El usuario/correo o la contraseña son incorrectos. Si no tienes cuenta, toca en "Registrarme".'
        );
      } else {
        Alert.alert('Error al entrar', error.message || 'Verifica tus datos.');
        onNavigate('Home', emailToUse);
      }
    } finally {
      setCargando(false);
    }
  };

  //  Registrar Nueva Cooperativista (solo Usuario, Correo y Contraseña)
  const handleRegister = async () => {
    const usernameToUse = nombreUsuario.trim();
    const emailToUse = correoRegistro.trim().toLowerCase();
    const passToUse = contrasenaRegistro.trim();

    if (!usernameToUse || !emailToUse || !passToUse) {
      Alert.alert('Campos requeridos', 'Por favor completa tu nombre de usuario, correo y contraseña.');
      return;
    }

    if (passToUse.length < 6) {
      Alert.alert('Contraseña corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setCargando(true);

    const perfilGuardar = {
      nombreUsuario: usernameToUse,
      nombreUsuarioLower: usernameToUse.toLowerCase(),
      nombre: usernameToUse,
      correo: emailToUse,
    };

    try {
      // 1. Crear usuario en Firebase Auth
      await createUserWithEmailAndPassword(auth, emailToUse, passToUse);

      // 2. Guardar documento único en Firestore usando el correo como ID de documento
      await setDoc(doc(db, 'cooperativistas', emailToUse), {
        ...perfilGuardar,
        fechaCreacion: serverTimestamp(),
      }, { merge: true });

      // 3. Actualizar perfil local
      if (onSaveProfile) {
        onSaveProfile(perfilGuardar);
      }

      Alert.alert('¡Registro Exitoso!', `¡Bienvenida ${usernameToUse}! Tu cuenta ha sido creada.`);
      onNavigate('Home', emailToUse);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Correo ya registrado', 'Este correo ya tiene cuenta. Toca en "Iniciar Sesión".');
      } else {
        try {
          await setDoc(doc(db, 'cooperativistas', emailToUse), {
            ...perfilGuardar,
            fechaCreacion: serverTimestamp(),
          }, { merge: true });
        } catch (e) {}
        if (onSaveProfile) onSaveProfile(perfilGuardar);
        Alert.alert('¡Registro Guardado!', `Usuario ${usernameToUse} registrada.`);
        onNavigate('Home', emailToUse);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/LOGOGES.png')}
              style={styles.logo}
              resizeMode='contain'
            />
          </View>

          {/* Título de sección */}
          <Text style={styles.titleText}>
            {modo === 'login' ? 'Iniciar Sesión' : 'Registro de Cuenta'}
          </Text>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {modo === 'login' ? (
              <>
                <Text style={styles.label}>Nombre de usuario o Correo:</Text>              
                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                  autoCapitalize='none'
                  placeholder='Tu usuario o correo'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                />

                <Text style={styles.label}>Contraseña:</Text>
                <TextInput
                  style={styles.input}
                  value={contrasenaLogin}
                  onChangeText={setContrasenaLogin}
                  secureTextEntry
                  placeholder='••••••••'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                />
              </>
            ) : (
              <>
                <Text style={styles.label}>Nombre de usuario:</Text>
                <TextInput
                  style={styles.input}
                  value={nombreUsuario}
                  onChangeText={setNombreUsuario}
                  autoCapitalize='none'
                  placeholder='Ej. maria_oaxaca'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                />

                <Text style={styles.label}>Correo electrónico:</Text>
                <TextInput
                  style={styles.input}
                  value={correoRegistro}
                  onChangeText={setCorreoRegistro}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  placeholder='ejemplo@gesmujer.org'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                />

                <Text style={styles.label}>Contraseña (mínimo 6 caracteres):</Text>
                <TextInput
                  style={styles.input}
                  value={contrasenaRegistro}
                  onChangeText={setContrasenaRegistro}
                  secureTextEntry
                  placeholder='••••••••'
                  placeholderTextColor='rgba(255,255,255,0.5)'
                />
              </>
            )}
          </View>

          {/* Botón Principal */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={modo === 'login' ? handleLogin : handleRegister}
            disabled={cargando}
          >
            <Text style={styles.primaryButtonText}>
              {cargando
                ? 'Procesando...'
                : modo === 'login'
                ? 'Iniciar Sesión'
                : 'Crear Mi Cuenta'}
            </Text>
          </TouchableOpacity>

          {/* Alternar entre Login y Registro */}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setModo(modo === 'login' ? 'registro' : 'login')}
          >
            <Text style={styles.toggleButtonText}>
              {modo === 'login'
                ? '¿Eres nueva? Toca aquí para Registrarte'
                : '¿Ya tienes cuenta? Toca aquí para Iniciar Sesión'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },
  scrollContent: { paddingHorizontal: 32, paddingVertical: 24 },

  logoContainer: { alignItems: 'center', marginBottom: 20 },
  logo: { width: 160, height: 160 },

  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },

  formContainer: { marginBottom: 20 },
  label: { color: 'white', fontSize: 14, fontWeight: '600', marginTop: 14, marginBottom: 4 },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 15,
    paddingVertical: 6,
  },

  primaryButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  primaryButtonText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '800',
  },

  toggleButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13.5,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});