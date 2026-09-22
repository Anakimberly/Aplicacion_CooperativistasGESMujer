import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Alert, Modal, Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';

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

export default function CooperativistasScreen({ onNavigate, profileData, onSaveProfile }) {
  const [form, setForm] = useState({
    nombre: profileData?.nombre || '',
    apellidoPaterno: profileData?.apellidoPaterno || '',
    apellidoMaterno: profileData?.apellidoMaterno || '',
    comunidad: profileData?.comunidad || '',
    telefono: profileData?.telefono || '',
    cooperativa: profileData?.cooperativa || '',
    fotoUri: profileData?.fotoUri || null,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 📷 Abrir galería para seleccionar foto
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
        handleChange('fotoUri', result.assets[0].uri);
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

  const handleGuardar = () => {
    const { nombre, apellidoPaterno, apellidoMaterno, comunidad, telefono, cooperativa } = form;
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !comunidad || !telefono || !cooperativa) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos, incluyendo la cooperativa.');
      return;
    }

    if (onSaveProfile) {
      onSaveProfile(form);
    }

    Alert.alert(
      '¡Registro Guardado!',
      `Cooperativista ${nombre} ${apellidoPaterno} registrada correctamente.`,
      [
        {
          text: 'Ver Mi Perfil',
          onPress: () => onNavigate('Perfil'),
        },
        { text: 'Aceptar' },
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
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.cardTitle}>Registro de cooperativista</Text>

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
                  autoCapitalize={keyboardType === 'phone-pad' ? 'none' : 'words'}
                  placeholder={`Ingresa tu ${label.toLowerCase()}`}
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
              <Text style={styles.btnGuardarText}>Guardar Registro</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Modal de Selección de Cooperativa ── */}
      <Modal
        visible={modalVisible}
        animationType='fade'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona tu Cooperativa</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 4 }}>
                <Ionicons name='close' size={24} color='#333' />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={true}>
              {COOPERATIVAS.map((coop) => {
                const isSelected = form.cooperativa === coop;
                return (
                  <TouchableOpacity
                    key={coop}
                    style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    onPress={() => {
                      handleChange('cooperativa', coop);
                      setModalVisible(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {coop}
                    </Text>
                    {isSelected && <Ionicons name='checkmark-circle' size={22} color={PURPLE} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  header: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  // Scroll
  scrollContent: { padding: 20 },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
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

  // Photo Picker
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
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  // Dropdown trigger
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: PURPLE,
  },
  modalList: {
    marginTop: 4,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionItemSelected: {
    backgroundColor: '#f3e8fb',
  },
  optionText: {
    fontSize: 14.5,
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: PURPLE,
  },

  // Botón guardar
  btnGuardar: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnGuardarText: { color: 'white', fontSize: 16, fontWeight: '700' },
});