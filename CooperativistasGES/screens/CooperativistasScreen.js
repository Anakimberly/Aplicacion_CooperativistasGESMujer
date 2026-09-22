import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#5b1378';

export default function CooperativistasScreen({ onNavigate }) {
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    comunidad: '',
    telefono: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardar = () => {
    const { nombre, apellidoPaterno, apellidoMaterno, comunidad, telefono } = form;
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !comunidad || !telefono) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos.');
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

            <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
              <Text style={styles.btnGuardarText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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