import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  ScrollView, TouchableOpacity, Alert, Linking,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';

const GUIAS_EJEMPLO = [
  {
    id: '1',
    titulo: 'Guía Práctica de Economía Feminista',
    descripcion: 'Materiales educativos sobre economía feminista para el empoderamiento económico de las mujeres.',
    categoria: 'Economía Feminista',
    pdfUrl: 'https://drive.google.com/file/d/1vxv1QFNW3o44mGit2F11NcJhFkkLwiak/view?usp=sharing', 
  },
 
];

export default function GuiaEconomiaScreen({ onNavigate }) {

  const handleAbrirGuia = (guia) => {    
    Alert.alert( 
      `${guia.titulo}`,
      `¿Deseas abrir la guía en formato PDF?\n\nTamaño: ${guia.tamano}`,                                            
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abrir PDF',
          onPress: () => {
            Linking.openURL(guia.pdfUrl).catch(() => {
              Alert.alert('PDF', `Abriendo documento: ${guia.titulo}`);
            });
          },
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
        <Text style={styles.headerTitle}>Guía de Economía</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Banner Informativo ── */}
        <View style={styles.heroBanner}>
          <MaterialCommunityIcons name='book-open-page-variant' size={48} color={PURPLE} />
          <Text style={styles.heroTitle}>Biblioteca de Guías y Recursos</Text>
          <Text style={styles.heroSubtitle}>
            Materiales educativos en PDF sobre cooperativismo, costeo justo y autonomía económica.
          </Text>
        </View>

        {/* ── Lista de Guías ── */}
        <Text style={styles.sectionHeader}>Guías Disponibles ({GUIAS_EJEMPLO.length})</Text>

        {GUIAS_EJEMPLO.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.guiaCard}
            onPress={() => handleAbrirGuia(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name='file-pdf-box' size={38} color='#e74c3c' />
            </View>

            <View style={styles.guiaContent}>
              <View style={styles.guiaCategoryBadge}>
                <Text style={styles.guiaCategoryText}>{item.categoria}</Text>
              </View>

              <Text style={styles.guiaTitle}>{item.titulo}</Text>
              <Text style={styles.guiaDesc} numberOfLines={2}>
                {item.descripcion}
              </Text>

              <View style={styles.guiaFooter}>
                <Ionicons name='document-text-outline' size={14} color='#777' />
                <Text style={styles.guiaMetaText}>PDF • Google Drive</Text>
              </View>
            </View>

            <Ionicons name='chevron-forward' size={20} color='#aaa' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        ))}

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

  // Hero Banner
  heroBanner: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: PURPLE,
    marginTop: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },

  // Guia Card
  guiaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fdf2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  guiaContent: {
    flex: 1,
  },
  guiaCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  guiaCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: PURPLE,
  },
  guiaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  guiaDesc: {
    fontSize: 12.5,
    color: '#666',
    lineHeight: 17,
    marginBottom: 8,
  },
  guiaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guiaMetaText: {
    fontSize: 11.5,
    color: '#777',
    fontWeight: '500',
  },
});
