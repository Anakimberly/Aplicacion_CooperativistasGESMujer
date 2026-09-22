import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Alert, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#5b1378';

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

export default function CooperativistasScreen({ onNavigate }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    comunidad: '',
    telefono: '',
    cooperativa: '',
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = () => {
    const { nombre, apellidoPaterno, apellidoMaterno, comunidad, telefono, cooperativa } = form;
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !comunidad || !telefono || !cooperativa) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos, incluyendo la cooperativa.');
      return;
    }
    Alert.alert('Guardado', `Cooperativista ${nombre} ${apellidoPaterno} registrada correctamente.`);
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
              <Text style={styles.btnGuardarText}>Guardar</Text>
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
    marginBottom: 20,
    textAlign: 'center',
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