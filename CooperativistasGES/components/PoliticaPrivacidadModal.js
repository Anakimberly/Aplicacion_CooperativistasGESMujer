import React from 'react';
import {
  View, Text, StyleSheet, Modal,
  ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PURPLE = '#5b1378';

export default function PoliticaPrivacidadModal({
  visible,
  onClose,
  onAccept,
  loading = false,
  acceptButtonText = 'Acepto y Crear mi Cuenta',
  cancelButtonText = 'No acepto / Regresar',
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor={PURPLE} />

        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={onClose}
            disabled={loading}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          <Text style={styles.navTitle} numberOfLines={1}>
            Política de Privacidad
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* Documento en texto plano formal */}
        <ScrollView
          style={styles.documentScrollView}
          contentContainerStyle={styles.documentContent}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.docMainTitle}>
            Aviso de Privacidad y Protección de Datos Personales
          </Text>
          <Text style={styles.docSubtitle}>
            Red de Mujeres Cooperativistas • GESMujer Oaxaca{'\n'}
            Última actualización: Noviembre de 2026
          </Text>

          <View style={styles.divider} />

          {/* 1. Responsable */}
          <Text style={styles.heading}>1. Responsable del Tratamiento de los Datos</Text>
          <Text style={styles.paragraph}>
            El Grupo de Educación Popular con Mujeres A.C. (GESMujer), con sede en Oaxaca de Juárez, Oaxaca, México, es la organización responsable del uso, resguardo y protección de los datos personales proporcionados por las usuarias de esta aplicación móvil.
          </Text>

          {/* 2. Datos que se recopilan */}
          <Text style={styles.heading}>2. Información que Recopilamos</Text>
          <Text style={styles.paragraph}>
            Para el funcionamiento de la aplicación y la administración de tu cuenta, recopilamos los siguientes datos de forma directa y voluntaria:
          </Text>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.bold}>Datos de identificación:</Text> Nombre de usuario, nombre completo y dirección de correo electrónico.
          </Text>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.bold}>Datos de contacto y comunidad:</Text> Número telefónico, comunidad y nombre de tu cooperativa o grupo colectivo (opcionales en tu perfil).
          </Text>
          <Text style={styles.bulletPoint}>
            • <Text style={styles.bold}>Información de productos:</Text> Registros de costeo, insumos, horas de trabajo y precios que calcules en la herramienta de costeo.
          </Text>

          {/* 3. Finalidad del uso de datos */}
          <Text style={styles.heading}>3. Finalidades del Uso de tus Datos</Text>
          <Text style={styles.paragraph}>
            La información personal que recabamos será utilizada exclusivamente para los siguientes propósitos legítimos y comunitarios:
          </Text>
          <Text style={styles.bulletPoint}>
            • Crear, verificar y mantener tu acceso seguro a la aplicación.
          </Text>
          <Text style={styles.bulletPoint}>
            • Guardar y sincronizar tus productos y cálculos de costeo para que no se pierdan al cerrar sesión o cambiar de dispositivo.
          </Text>
          <Text style={styles.bulletPoint}>
            • Ofrecer acompañamiento, asesoría formativa y contacto solidario por parte del equipo facilitador de GESMujer.
          </Text>

          {/* 4. Confidencialidad y no venta */}
          <Text style={styles.heading}>4. Confidencialidad y No Comercialización</Text>
          <Text style={styles.paragraph}>
            Tus datos personales y la información sobre tus productos y costos son confidenciales. GESMujer no vende, no renta, no comercializa ni transfiere tus datos personales a empresas privadas, bancos, financieras ni a ningún tercero con fines lucrativos o comerciales.
          </Text>

          {/* 5. Seguridad de los datos */}
          <Text style={styles.heading}>5. Seguridad de la Información</Text>
          <Text style={styles.paragraph}>
            Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos contra pérdida, mal uso, alteración o acceso no autorizado. Las contraseñas están debidamente encriptadas y el acceso a la base de datos está restringido.
          </Text>


        
          <Text style={styles.heading}>6. Cambios a esta Política de Privacidad</Text>
          <Text style={styles.paragraph}>
            Podemos actualizar esta Política de Privacidad ocasionalmente para adaptarla a mejoras en la aplicación o nuevas disposiciones normativas. Cualquier cambio significativo te será informado oportunamente a través de la propia aplicación.
          </Text>

        
          {/* Consentimiento final */}
          <View style={styles.consentBox}>
            <Text style={styles.consentBoxText}>
              Al presionar «{onAccept ? acceptButtonText : 'Entendido'}», confirmas que has leído o recibido la explicación de este Aviso de Privacidad y otorgas tu consentimiento para el tratamiento de tus datos personales conforme a los términos aquí descritos.
            </Text>
          </View>

          {/* Botón principal al final del documento */}
          <View style={styles.bottomActionsArea}>
            {onAccept ? (
              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={onAccept}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryActionText}>
                  {loading ? 'Creando cuenta...' : acceptButtonText}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[styles.secondaryActionButton, !onAccept && styles.singleCloseBtn]}
              onPress={onClose}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={[styles.secondaryActionText, !onAccept && styles.singleCloseBtnText]}>
                {onAccept ? cancelButtonText : 'Cerrar documento'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>
            © Grupo de Educación Popular con Mujeres A.C. (GESMujer){'\n'}
            Red de Mujeres Cooperativistas por una Cultura de Paz
          </Text>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  navBar: {
    height: 54,
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },

  documentScrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  documentContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },

  docMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1c1c1e',
    lineHeight: 28,
    marginBottom: 8,
  },
  docSubtitle: {
    fontSize: 13,
    color: '#6c6c70',
    lineHeight: 18,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5ea',
    marginBottom: 20,
  },

  heading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c1c1e',
    marginTop: 18,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14.5,
    color: '#3a3a3c',
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14.5,
    color: '#3a3a3c',
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 6,
  },
  bold: {
    fontWeight: '700',
    color: '#1c1c1e',
  },

  consentBox: {
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  consentBoxText: {
    fontSize: 13.5,
    color: '#48484a',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  bottomActionsArea: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  primaryActionButton: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryActionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#d1d1d6',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    color: '#636366',
    fontSize: 15,
    fontWeight: '600',
  },
  singleCloseBtn: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  singleCloseBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  copyrightText: {
    fontSize: 12,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 17,
  },
});
