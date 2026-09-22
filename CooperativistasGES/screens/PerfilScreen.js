import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Image, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';
const GREEN = '#27ae60';

export default function PerfilScreen({ onNavigate, userEmail, profileData, onSaveProfile }) {
  // Datos del perfil 
  const nombreCompleto = profileData?.nombre
    ? `${profileData.nombre} ${profileData.apellidoPaterno || ''} ${profileData.apellidoMaterno || ''}`.trim()
    : 'Nombre no registrado';

  const correoMostrar = userEmail || 'cooperativista@gesmujer.org';
  const comunidadMostrar = profileData?.comunidad || 'No especificada';
  const telefonoMostrar = profileData?.telefono || 'No especificado';
  const cooperativaMostrar = profileData?.cooperativa || 'No seleccionada';
  const fotoUri = profileData?.fotoUri || null;
  const tieneDatos = profileData?.nombre ? true : false;

  const handleSeleccionarFoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permiso requerido', 'Necesitamos permiso para acceder a tus fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        if (onSaveProfile) {
          onSaveProfile({ ...profileData, fotoUri: selectedUri });
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar la foto.');
    }
  };

  const handleOpcionesFoto = () => {
    if (fotoUri) {
      Alert.alert(
        'Foto de Perfil',
        '¿Qué deseas hacer con tu foto?',
        [
          { text: 'Cambiar Foto', onPress: handleSeleccionarFoto },
          {
            text: 'Quitar Foto (Usar Avatar)',
            style: 'destructive',
            onPress: () => {
              if (onSaveProfile) {
                onSaveProfile({ ...profileData, fotoUri: null });
              }
            },
          },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      handleSeleccionarFoto();
    }
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás segura de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => onNavigate('Login'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      {/* ── Cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity onPress={handleCerrarSesion} style={styles.logoutBtn}>
          <Ionicons name='log-out-outline' size={22} color='white' />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Tarjeta de Presentación ── */}
        <View style={styles.profileHeaderCard}>
          <TouchableOpacity
            style={styles.avatarTouchable}
            onPress={handleOpcionesFoto}
            activeOpacity={0.8}
          >
            {fotoUri ? (
              <Image source={{ uri: fotoUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarContainer}>
                <MaterialCommunityIcons name='account-heart' size={54} color={PURPLE} />
              </View>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name='camera' size={14} color='white' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOpcionesFoto}>
            <Text style={styles.changePhotoText}>
              {fotoUri ? 'Cambiar foto de perfil' : '+ Agregar foto de perfil'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.userName}>{nombreCompleto}</Text>

          <View style={styles.emailBadge}>
            <Ionicons name='mail-outline' size={14} color={PURPLE} />
            <Text style={styles.emailText}>{correoMostrar}</Text>
          </View>

          {tieneDatos && (
            <View style={styles.statusPill}>
              <Ionicons name='checkmark-circle' size={14} color={GREEN} />
              <Text style={styles.statusText}>Cooperativista Registrada</Text>
            </View>
          )}
        </View>

        {/* ── Detalle de Información ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}> Información de Cooperativa</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <MaterialCommunityIcons name='storefront-outline' size={20} color={PURPLE} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Cooperativa Afiliada</Text>
              <Text style={styles.infoValue}>{cooperativaMostrar}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name='location-outline' size={20} color={PURPLE} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Comunidad</Text>
              <Text style={styles.infoValue}>{comunidadMostrar}</Text>
            </View>
          </View>
        </View>

        {/* ── Detalle de Contacto ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Datos de Contacto</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name='call-outline' size={20} color={PURPLE} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Teléfono de contacto</Text>
              <Text style={styles.infoValue}>{telefonoMostrar}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name='mail-unread-outline' size={20} color={PURPLE} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Correo de inicio de sesión</Text>
              <Text style={styles.infoValue}>{correoMostrar}</Text>
            </View>
          </View>
        </View>

        {/* ── Botones de Acción ── */}
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => onNavigate('Cooperativistas')}
          activeOpacity={0.8}
        >
          <Ionicons name='create-outline' size={20} color='white' />
          <Text style={styles.btnEditarText}>
            {tieneDatos ? 'Actualizar mis Datos' : 'Registrar mis Datos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnCerrarSesion}
          onPress={handleCerrarSesion}
          activeOpacity={0.8}
        >
          <Ionicons name='log-out-outline' size={20} color='#e74c3c' />
          <Text style={styles.btnCerrarSesionText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  logoutBtn: { padding: 4 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  scrollContent: { padding: 18, paddingBottom: 30 },

  // Tarjeta de Presentación
  profileHeaderCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarTouchable: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: PURPLE,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: PURPLE,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: PURPLE,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
  },
  emailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  emailText: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: '600',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#e8f8f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: GREEN,
  },

  
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#888', fontWeight: '500' },
  infoValue: { fontSize: 14.5, color: '#333', fontWeight: '700', marginTop: 1 },

  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },

  // Botones
  btnEditar: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  btnEditarText: { color: 'white', fontSize: 15, fontWeight: '700' },

  btnCerrarSesion: {
    backgroundColor: '#fdf2f2',
    borderWidth: 1,
    borderColor: '#f5c6cb',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  btnCerrarSesionText: { color: '#e74c3c', fontSize: 15, fontWeight: '700' },
});
