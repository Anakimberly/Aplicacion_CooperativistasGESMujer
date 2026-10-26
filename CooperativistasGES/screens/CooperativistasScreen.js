import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Alert, Modal, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { db, auth } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#e1bee7';

const COOPERATIVAS = [
  'Mujeres Bordando Sueños',
  'Yukumao',
  'Ña’a Inuu Ini',
  'Las cataleyas',
  'Mujeres Afro del Ciruelo',
  'Raices Tejidas',
  'Aroma Ñuu Savi',
  'Naxo Tojndi',
  'Comunali Economia Social para las Mujeres Oaxaqueñas',
  'Casa de la Mujer Chatina',
  'SAE',
  'Cooperativa Quiahije',
];

export default function CooperativistasScreen({ onNavigate, userEmail, profileData, onSaveProfile }) {
  const [form, setForm] = useState({
    nombre: profileData?.nombre || profileData?.nombreUsuario || '',
    apellidoPaterno: profileData?.apellidoPaterno || '',
    apellidoMaterno: profileData?.apellidoMaterno || '',
    comunidad: profileData?.comunidad || '',
    telefono: profileData?.telefono || '',
    cooperativa: profileData?.cooperativa || '',
    fotoUri: profileData?.fotoUri || null,
  });

  useEffect(() => {
    if (profileData) {
      setForm((prev) => ({
        ...prev,
        nombre: profileData.nombre || profileData.nombreUsuario || prev.nombre,
        apellidoPaterno: profileData.apellidoPaterno || prev.apellidoPaterno,
        apellidoMaterno: profileData.apellidoMaterno || prev.apellidoMaterno,
        comunidad: profileData.comunidad || prev.comunidad,
        telefono: profileData.telefono || prev.telefono,
        cooperativa: profileData.cooperativa || prev.cooperativa,
        fotoUri: profileData.fotoUri || prev.fotoUri,
      }));
    }
  }, [profileData]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field, value) => {
    
    if (field === 'telefono') {
      const soloNumeros = value.replace(/[^0-9]/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, [field]: soloNumeros }));
      return;
    }

    
    if (field === 'nombre' || field === 'apellidoPaterno' || field === 'apellidoMaterno') {
      const sinNumeros = value.replace(/[0-9]/g, '');
      setForm((prev) => ({ ...prev, [field]: sinNumeros }));
      return;
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // seleccionar foto
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
        quality: 0.35,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const base64Data = asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
        handleChange('fotoUri', base64Data);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    }
  };

  const handleOpcionesFoto = () => {
    if (form.fotoUri) {
      Alert.alert(
        'Foto de Perfil',
        '¿Qué deseas hacer con tu foto?',
        [
          { text: 'Cambiar Foto', onPress: handleSeleccionarFoto },
          {
            text: 'Quitar Foto (Usar Avatar)',
            style: 'destructive',
            onPress: () => handleChange('fotoUri', null),
          },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    } else {
      handleSeleccionarFoto();
    }
  };

  const handleGuardar = async () => {
    const { nombre, apellidoPaterno, apellidoMaterno, comunidad, telefono, cooperativa, fotoUri } = form;
    if (!nombre.trim() || !apellidoPaterno.trim() || !apellidoMaterno.trim() || !comunidad.trim() || !telefono.trim() || !cooperativa) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos, incluyendo la cooperativa.');
      return;
    }

    // Validación de nombres y apellidos 
    const regexNumeros = /[0-9]/;
    if (regexNumeros.test(nombre) || regexNumeros.test(apellidoPaterno) || regexNumeros.test(apellidoMaterno)) {
      Alert.alert('Datos no válidos', 'El nombre y apellidos no deben contener números.');
      return;
    }

    // Validación de telefono
    const telefonoLimpio = telefono.replace(/[^0-9]/g, '');
    if (telefonoLimpio.length !== 10) {
      Alert.alert('Teléfono incorrecto', 'El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    const emailToUse = (userEmail || auth.currentUser?.email || '').toLowerCase().trim();

    const perfilActualizado = {
      nombre: nombre.trim(),
      nombreUsuario: nombre.trim(),
      nombreUsuarioLower: nombre.trim().toLowerCase(),
      apellidoPaterno: apellidoPaterno.trim(),
      apellidoMaterno: apellidoMaterno.trim(),
      comunidad: comunidad.trim(),
      telefono: telefono.trim(),
      cooperativa,
      fotoUri: fotoUri || null,
      correo: emailToUse,
    };

    if (onSaveProfile) {
      onSaveProfile(perfilActualizado);
    }

    //  Actualizar/guardar en Cloud Firestore usando un ID único por correo de usuario
    try {
      if (emailToUse) {
        await setDoc(doc(db, 'cooperativistas', emailToUse), {
          ...perfilActualizado,
          fechaActualizacion: serverTimestamp(),
        }, { merge: true });
      }
    } catch (e) {
      console.log('Aviso Firestore al guardar:', e);
    }

    Alert.alert(
      '¡Registro Guardado!',
      'Tus datos han sido guardados correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => onNavigate('Home'),
        },
      ]
    );
  };

  const campos = [
    { label: 'Nombre',            field: 'nombre',          keyboardType: 'default'  },
    { label: 'Apellido Paterno',   field: 'apellidoPaterno', keyboardType: 'default'  },
    { label: 'Apellido Materno',   field: 'apellidoMaterno', keyboardType: 'default'  },
    { label: 'Comunidad',          field: 'comunidad',       keyboardType: 'default'  },
    { label: 'Teléfono',           field: 'telefono',        keyboardType: 'phone-pad'},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      {/* ── Cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cooperativistas</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Formulario ── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Registro y actualización de datos</Text>

            {/* ── Selector de Foto de Perfil ── */}
            <View style={styles.photoPickerContainer}>
              <TouchableOpacity style={styles.avatarTouchable} onPress={handleOpcionesFoto} activeOpacity={0.8}>
                {form.fotoUri ? (
                  <Image source={{ uri: form.fotoUri }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <MaterialCommunityIcons name='account-heart' size={46} color={PURPLE} />
                  </View>
                )}
                <View style={styles.cameraBadge}>
                  <Ionicons name='camera' size={14} color='white' />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpcionesFoto}>
                <Text style={styles.photoPickerLabel}>
                  {form.fotoUri ? 'Cambiar foto de perfil' : '+ Agregar foto de perfil'}
                </Text>
                <Text style={styles.photoPickerSublabel}>
                  (Opcional - Si no agregas se usará el avatar por defecto)
                </Text>
              </TouchableOpacity>
            </View>

            {campos.map(({ label, field, keyboardType }) => (
              <View key={field} style={styles.fieldGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={form[field]}
                  onChangeText={(val) => handleChange(field, val)}
                  keyboardType={keyboardType}
                  maxLength={field === 'telefono' ? 10 : undefined}
                  autoCapitalize={keyboardType === 'phone-pad' ? 'none' : 'words'}
                  placeholder={field === 'telefono' ? 'Ej: 9511234567 (10 dígitos)' : `Ingresa tu ${label.toLowerCase()}`}
                  placeholderTextColor='#bbb'
                />
              </View>
            ))}

            {/* ── Campo Cooperativa (Dropdown Modal) ── */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Cooperativa a la que pertenece</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dropdownTriggerText,
                    !form.cooperativa && styles.placeholderText,
                  ]}
                  numberOfLines={1}
                >
                  {form.cooperativa || 'Selecciona tu cooperativa'}
                </Text>
                <Ionicons name='chevron-down' size={20} color='#777' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
              <Text style={styles.btnGuardarText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Modal de selección de Cooperativa ── */}
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona tu Cooperativa</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name='close' size={24} color='#666' />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {COOPERATIVAS.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.cooperativaItem}
                  onPress={() => {
                    handleChange('cooperativa', item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.cooperativaText,
                      form.cooperativa === item && styles.cooperativaTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {form.cooperativa === item && (
                    <Ionicons name='checkmark' size={20} color={PURPLE} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },

  header: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  // Scroll
  scrollContent: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    flexGrow: 1,
  },

  // Card
  card: {
    backgroundColor: '#f3e5f5', 
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e1bee7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 16,
    textAlign: 'center',
  },

  photoPickerContainer: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatarTouchable: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 2,
    borderColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
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
  photoPickerLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
  },
  photoPickerSublabel: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },

  // Campos
  fieldGroup: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#ffffff',
  },

  dropdownTrigger: {
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownTriggerText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  placeholderText: {
    color: '#bbb',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE,
  },
  cooperativaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  cooperativaText: {
    fontSize: 15,
    color: '#444',
  },
  cooperativaTextSelected: {
    color: PURPLE,
    fontWeight: '700',
  },

  // Botón Guardar
  btnGuardar: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  btnGuardarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
