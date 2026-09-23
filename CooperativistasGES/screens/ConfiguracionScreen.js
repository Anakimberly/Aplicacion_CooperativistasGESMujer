import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Switch, Alert, Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';

export default function ConfiguracionScreen({ onNavigate, userEmail }) {
  // Estados de Configuración
  const [notificaciones, setNotificaciones] = useState(true);
  const [recordatoriosCosteo, setRecordatoriosCosteo] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  // Modales informativos
  const [modalAyudaVisible, setModalAyudaVisible] = useState(false);

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás segura de que deseas salir de tu cuenta?',
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

  const handleCambiarContrasena = () => {
    Alert.alert(
      'Cambiar Contraseña',
      `Se enviará un enlace de restablecimiento a:\n${userEmail || 'tu correo registrado'}.\n\n¿Deseas solicitar el cambio?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar enlace',
          onPress: () => Alert.alert('Éxito', 'Enlace enviado a tu correo electrónico.'),
        },
      ]
    );
  };

  const handleContactoWhatsApp = () => {
    Alert.alert(
      '📞 Contacto GESMujer',
      'Línea Directa y WhatsApp de atención:\n\n📱 951 516 06 39\n📧 contacto@gesmujer.org\n\nAtención de Lunes a Viernes de 9:00 a 18:00 hrs.'
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
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── SECCIÓN 1: NOTIFICACIONES ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🔔 Notificaciones</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingLabel}>Avisos y Eventos</Text>
              <Text style={styles.settingSublabel}>Recibir noticias de la cooperativa y GESMujer</Text>
            </View>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{ false: '#ccc', true: PURPLE }}
              thumbColor='white'
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingLabel}>Recordatorios de Costeo</Text>
              <Text style={styles.settingSublabel}>Avisos para revisar y actualizar tus productos</Text>
            </View>
            <Switch
              value={recordatoriosCosteo}
              onValueChange={setRecordatoriosCosteo}
              trackColor={{ false: '#ccc', true: PURPLE }}
              thumbColor='white'
            />
          </View>
        </View>

        {/* ── SECCIÓN 2: APARIENCIA E IDIOMA ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🎨 Apariencia e Idioma</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingLabel}>Modo Oscuro</Text>
              <Text style={styles.settingSublabel}>Cambiar a colores oscuros de noche</Text>
            </View>
            <Switch
              value={modoOscuro}
              onValueChange={setModoOscuro}
              trackColor={{ false: '#ccc', true: PURPLE }}
              thumbColor='white'
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingClickRow} activeOpacity={0.7}>
            <View style={styles.settingTextGroup}>
              <Text style={styles.settingLabel}>Idioma</Text>
              <Text style={styles.settingSublabel}>Español (México)</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#999' />
          </TouchableOpacity>
        </View>

        {/* ── SECCIÓN 3: SEGURIDAD Y CUENTA ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🔒 Seguridad y Cuenta</Text>

          <TouchableOpacity
            style={styles.settingClickRow}
            onPress={handleCambiarContrasena}
            activeOpacity={0.7}
          >
            <View style={styles.iconLabelGroup}>
              <Ionicons name='key-outline' size={20} color={PURPLE} />
              <Text style={styles.settingLabel}>Cambiar Contraseña</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#999' />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.settingClickRow}
            onPress={() => onNavigate('Perfil')}
            activeOpacity={0.7}
          >
            <View style={styles.iconLabelGroup}>
              <Ionicons name='person-outline' size={20} color={PURPLE} />
              <Text style={styles.settingLabel}>Editar Datos de Mi Perfil</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#999' />
          </TouchableOpacity>
        </View>

        {/* ── SECCIÓN 4: SOPORTE Y GESMUJER ── */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>ℹ️ Soporte y GESMujer</Text>

          <TouchableOpacity
            style={styles.settingClickRow}
            onPress={() => setModalAyudaVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.iconLabelGroup}>
              <Ionicons name='help-circle-outline' size={20} color={PURPLE} />
              <Text style={styles.settingLabel}>Preguntas Frecuentes (FAQ)</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#999' />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.settingClickRow}
            onPress={handleContactoWhatsApp}
            activeOpacity={0.7}
          >
            <View style={styles.iconLabelGroup}>
              <MaterialCommunityIcons name='whatsapp' size={20} color='#25D366' />
              <Text style={styles.settingLabel}>Contactar a GESMujer</Text>
            </View>
            <Ionicons name='chevron-forward' size={20} color='#999' />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.settingClickRow}>
            <View style={styles.iconLabelGroup}>
              <Ionicons name='information-circle-outline' size={20} color={PURPLE} />
              <Text style={styles.settingLabel}>Versión de la App</Text>
            </View>
            <Text style={styles.versionText}>v1.0.0 (Expo)</Text>
          </View>
        </View>

        {/* ── SECCIÓN 5: CERRAR SESIÓN ── */}
        <TouchableOpacity
          style={styles.btnCerrarSesion}
          onPress={handleCerrarSesion}
          activeOpacity={0.8}
        >
          <Ionicons name='log-out-outline' size={20} color='#e74c3c' />
          <Text style={styles.btnCerrarSesionText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ── MODAL PREGUNTAS FRECUENTES (FAQ) ── */}
      <Modal
        visible={modalAyudaVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalAyudaVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalAyudaVisible(false)}
        >
          <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Preguntas Frecuentes</Text>
              <TouchableOpacity onPress={() => setModalAyudaVisible(false)} style={{ padding: 4 }}>
                <Ionicons name='close' size={24} color='#333' />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={true}>
              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Cómo calculo el precio de mi producto?</Text>
                <Text style={styles.faqAnswer}>
                  Ingresa a la sección "Costeo", agrega tus materiales, tus horas de trabajo e insumos. La app calculará automáticamente el precio justo sugerido.
                </Text>
              </View>

              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Mis datos están seguros?</Text>
                <Text style={styles.faqAnswer}>
                  Sí, la información de tu perfil y cooperativa es privada y protegida por la organización GESMujer.
                </Text>
              </View>

              <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Cómo puedo cambiar mi foto o comunidad?</Text>
                <Text style={styles.faqAnswer}>
                  Ingresa a la sección "Mi Perfil" y toca "Actualizar mis Datos". Ahí podrás modificar tu foto y toda tu información.
                </Text>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  scrollContent: { padding: 18, paddingBottom: 30 },

  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
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

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingClickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  settingTextGroup: { flex: 1, paddingRight: 10 },
  settingLabel: { fontSize: 14.5, fontWeight: '600', color: '#333' },
  settingSublabel: { fontSize: 12, color: '#888', marginTop: 2 },

  iconLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },

  versionText: { fontSize: 13, fontWeight: '600', color: '#888' },

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
    marginTop: 6,
  },
  btnCerrarSesionText: { color: '#e74c3c', fontSize: 15, fontWeight: '700' },

  // Modal FAQ
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: PURPLE,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 14.5,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 13.5,
    color: '#555',
    lineHeight: 18,
  },
});
