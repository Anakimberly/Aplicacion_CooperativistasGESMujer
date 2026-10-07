import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Image, Alert, Dimensions,
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
  const [verPasswordLogin, setVerPasswordLogin] = useState(false);

  // Campos de Registro
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoRegistro, setCorreoRegistro] = useState('');
  const [contrasenaRegistro, setContrasenaRegistro] = useState('');
  const [verPasswordReg, setVerPasswordReg] = useState(false);

  const [cargando, setCargando] = useState(false);

  // 🔑 Iniciar Sesión (por Nombre de Usuario o Correo Electrónico)
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
      if (!inputUserClean.includes('@')) {
        let userData = null;

        let q = query(
          collection(db, 'cooperativistas'),
          where('nombreUsuarioLower', '==', inputUserLower)
        );
        let querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          q = query(
            collection(db, 'cooperativistas'),
            where('nombreUsuario', '==', inputUserClean)
          );
          querySnapshot = await getDocs(q);
        }

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

  // 📝 Registrar Nueva Cooperativista
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
      await createUserWithEmailAndPassword(auth, emailToUse, passToUse);

      await setDoc(doc(db, 'cooperativistas', emailToUse), {
        ...perfilGuardar,
        fechaCreacion: serverTimestamp(),
      }, { merge: true });

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
          bounces={false}
        >
          {/* Header Curvado Domo Morado */}
          <View style={styles.headerContainer}>
            <View style={styles.headerArc}>
              <Image
                source={require('../assets/LOGOGES.png')}
                style={styles.logo}
                resizeMode='contain'
              />
              <Text style={styles.appName}>GESMujer</Text>
              <Text style={styles.appSubtitle}>Economía Social de las Mujeres</Text>
            </View>
          </View>

          {/* Formulario en Fondo Blanco */}
          <View style={styles.bodyContainer}>
            {modo === 'login' ? (
              <>
                {/* Campo: Usuario o Correo */}
                <View style={styles.pillInputContainer}>
                  <TextInput
                    style={styles.pillInput}
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize='none'
                    placeholder='usuario@gmail.com o usuario'
                    placeholderTextColor='#8A4B9E'
                  />
                </View>

                {/* Campo: Contraseña con Ojo */}
                <View style={styles.pillInputContainer}>
                  <TextInput
                    style={styles.pillInput}
                    value={contrasenaLogin}
                    onChangeText={setContrasenaLogin}
                    secureTextEntry={!verPasswordLogin}
                    placeholder='••••••••'
                    placeholderTextColor='#8A4B9E'
                  />
                  <TouchableOpacity
                    onPress={() => setVerPasswordLogin(!verPasswordLogin)}
                    style={styles.eyeBtn}
                  >
                    <Ionicons
                      name={verPasswordLogin ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={PURPLE}
                    />
                  </TouchableOpacity>
                </View>

                {/* Enlace Toggle */}
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => setModo('registro')}
                >
                  <Text style={styles.toggleBtnText}>¿No tienes cuenta? Registrate aquí</Text>
                </TouchableOpacity>

                {/* Botón Principal (Iniciar Sesión) */}
                <TouchableOpacity
                  style={styles.primaryPillButton}
                  onPress={handleLogin}
                  disabled={cargando}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>
                    {cargando ? 'Procesando...' : 'Iniciar Sesión'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Campo: Nombre de usuario */}
                <View style={styles.pillInputContainer}>
                  <TextInput
                    style={styles.pillInput}
                    value={nombreUsuario}
                    onChangeText={setNombreUsuario}
                    autoCapitalize='none'
                    placeholder='Nombre de usuario'
                    placeholderTextColor='#8A4B9E'
                  />
                </View>

                {/* Campo: Correo electrónico */}
                <View style={styles.pillInputContainer}>
                  <TextInput
                    style={styles.pillInput}
                    value={correoRegistro}
                    onChangeText={setCorreoRegistro}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    placeholder='Correo electrónico'
                    placeholderTextColor='#8A4B9E'
                  />
                </View>

                {/* Campo: Contraseña */}
                <View style={styles.pillInputContainer}>
                  <TextInput
                    style={styles.pillInput}
                    value={contrasenaRegistro}
                    onChangeText={setContrasenaRegistro}
                    secureTextEntry={!verPasswordReg}
                    placeholder='Contraseña (mínimo 6 caracteres)'
                    placeholderTextColor='#8A4B9E'
                  />
                  <TouchableOpacity
                    onPress={() => setVerPasswordReg(!verPasswordReg)}
                    style={styles.eyeBtn}
                  >
                    <Ionicons
                      name={verPasswordReg ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={PURPLE}
                    />
                  </TouchableOpacity>
                </View>

                {/* Enlace Toggle */}
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => setModo('login')}
                >
                  <Text style={styles.toggleBtnText}>¿Ya tienes cuenta? Inicia sesión</Text>
                </TouchableOpacity>

                {/* Botón Principal (Crear Mi Cuenta) */}
                <TouchableOpacity
                  style={styles.primaryPillButton}
                  onPress={handleRegister}
                  disabled={cargando}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>
                    {cargando ? 'Procesando...' : 'Crear Mi Cuenta'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },

  // ── Header Curvado Domo Morado ──
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  headerArc: {
    width: '140%',
    backgroundColor: PURPLE,
    borderBottomLeftRadius: 240,
    borderBottomRightRadius: 240,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 45 : 35,
    paddingBottom: 35,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 6,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13.5,
    fontWeight: '500',
    marginTop: 2,
  },

  // ── Formulario en Fondo Blanco ──
  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 36,
    paddingTop: 35,
    paddingBottom: 40,
  },

  // ── Inputs Ovalados (Pill) ──
  pillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 48,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  pillInput: {
    flex: 1,
    color: PURPLE,
    fontSize: 15,
    fontWeight: '600',
    height: '100%',
    textAlign: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },

  // ── Botón Toggle Texto ──
  toggleBtn: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  toggleBtnText: {
    color: '#777777',
    fontSize: 13.5,
    fontWeight: '500',
    textAlign: 'center',
  },

  // ── Botón Principal Ovalado (Pill) Centrado ──
  primaryPillButton: {
    backgroundColor: PURPLE,
    borderRadius: 25,
    height: 46,
    paddingHorizontal: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
    elevation: 3,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
  },
});