import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Image, Linking, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';
const GOLD = '#f39c12';

export default function InformacionScreen({ onNavigate }) {

  const handleAbrirEnlace = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Enlace', `Visita: ${url}`);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      {/* ── Cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información y Créditos</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Banner de Presentación de la App ── */}
        <View style={styles.heroCard}>
          <Image
            source={require('../assets/logoges45.png')}
            style={styles.logoImage}
            resizeMode='contain'
          />
          <Text style={styles.appTitle}>Aplicación Cooperativistas</Text>
          <Text style={styles.appSubtitle}>GESMujer Oaxaca</Text>
          {/* apartado de la version */}
          <View style={styles.versionBadge}>
            <Image
              source={require('../assets/logoges45.png')} 
              style={styles.versionIcon}
              resizeMode='contain'
            />
            <Text style={styles.versionText}>Versión 1.0.0</Text>
          </View>
        </View>

        {/* ── creditos a ges ── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name='business-outline' size={22} color={PURPLE} />
            <Text style={styles.cardTitle}>Acerca de GESMujer</Text>
          </View>

          <Text style={styles.cardDescription}>
            El <Text style={styles.boldText}>Grupo de Educación Popular con Mujeres A.C. (GESMujer)</Text> es una organización pionera en Oaxaca, dedicada desde 1977 a impulsar la equidad de género, la salud, la prevención de la violencia y el fortalecimiento de la autonomía económica de las mujeres.
          </Text>

          <View style={styles.bulletItem}>
            <Ionicons name='heart-circle-outline' size={18} color={PURPLE} />
            <Text style={styles.bulletText}>Fundada en 1977 en Oaxaca, México.</Text>
          </View>

          <View style={styles.bulletItem}>
            <Ionicons name='people-outline' size={18} color={PURPLE} />
            <Text style={styles.bulletText}>Acompañamiento a cooperativas y proyectos productivos.</Text>
          </View>
        </View>

        {/* ── creditos a la desarrolladora ── */}
        <View style={[styles.card, styles.developerCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name='code-slash-outline' size={22} color={PURPLE} />
            <Text style={styles.cardTitle}>Desarrollo del Proyecto</Text>
          </View>

          <View style={styles.devBadgeBox}>
            <MaterialCommunityIcons name='laptop' size={28} color={PURPLE} />
            <View style={{ flex: 1 }}>
              <Text style={styles.devRoleTitle}>Diseño y Desarrollo de Software</Text>
              <Text style={styles.devName}>Creado por la Ingeniera Ana Kimberly Hernández Pérez</Text>
            </View>
          </View>

          <Text style={styles.cardDescription}>
            Esta aplicación fue diseñada con mucho cariño como una herramienta práctica e intuitiva para apoyar a las mujeres artesanas
             y emprendedoras en el cálculo justo de sus productos y la administración de sus datos.
          </Text>
        </View>

        {/* ── contactos y canales de ges── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name='call-outline' size={22} color={PURPLE} />
            <Text style={styles.cardTitle}>Contacto Oficial</Text>
          </View>

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => handleAbrirEnlace('https://www.gesmujer.org')}
            activeOpacity={0.7}
          >
            <Ionicons name='globe-outline' size={20} color={PURPLE} />
            <Text style={styles.contactText}>www.gesmujer.org</Text>
            <Ionicons name='open-outline' size={16} color='#888' />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => handleAbrirEnlace('mailto:contacto@gesmujer.org')}
            activeOpacity={0.7}
          >
            <Ionicons name='mail-outline' size={20} color={PURPLE} />
            <Text style={styles.contactText}>contacto@gesmujer.org</Text>
            <Ionicons name='open-outline' size={16} color='#888' />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.contactRow}>
            <Ionicons name='logo-facebook' size={20} color='#1877F2' />
            <Text style={styles.contactText}>GESMujer Oaxaca</Text>
          </View>
        </View>

        {/* ── mensaje de cierre ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Juntas construyendo autonomía e igualdad 
          </Text>
        </View>

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
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  scrollContent: { padding: 18, paddingBottom: 30 },

  
  heroCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: '700',
    marginTop: 2,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },
  versionIcon: {
    width: 18,
    height: 18,
  },
  versionText: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },

  // Cards
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE,
  },
  cardDescription: {
    fontSize: 13.5,
    color: '#555',
    lineHeight: 20,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: '700',
    color: '#333',
  },

  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  bulletText: {
    fontSize: 13,
    color: '#444',
  },

  // Desarrolladora
  developerCard: {
    borderLeftWidth: 4,
    borderLeftColor: PURPLE,
  },
  devBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: LIGHT_PURPLE,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  devRoleTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: PURPLE,
  },
  devName: {
    fontSize: 12,
    color: '#666',
    marginTop: 1,
  },

  // Contactos
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
  },

  //mensaje de cierre
  footer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
  },
});
