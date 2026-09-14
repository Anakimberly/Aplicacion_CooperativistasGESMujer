import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const { width } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Las mujeres\nmovemos al mundo', sub: '¡Nuestra soberanía es económica!' },
  { id: '2', title: 'Cooperativa\nGES Mujer', sub: 'Juntas somos más fuertes' },
];

const categories = [
  { id: '1', name: 'Cooperativistas', icon: 'account-circle-outline' },
  { id: '2', name: 'Costeo',          icon: 'cash-multiple'           },
  { id: '3', name: 'Guía de\nEconomía', icon: 'book-open-outline'    },
  { id: '4', name: 'GESMujer',        icon: 'gender-female'           },
];

export default function HomeScreen({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
    setActiveSlide(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />

      {/* ── Carrusel ── */}
      <View style={styles.carouselWrapper}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={width - 32}
          decelerationRate='fast'
        >
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <View style={styles.slideBanner}>
                <MaterialCommunityIcons
                  name='gender-female'
                  size={50}
                  color='rgba(255,255,255,0.3)'
                  style={styles.slideIcon}
                />
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSub}>{slide.sub}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* ──  categorías ── */}
      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.card}>
            <MaterialCommunityIcons name={cat.icon} size={52} color='#444' />
            <Text style={styles.cardLabel}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Boton Nav ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name='home' size={28} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name='person-outline' size={28} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name='settings-outline' size={28} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Carousel
  carouselWrapper: { marginHorizontal: 16, marginTop: 16, marginBottom: 4 },
  slide: { width: width - 32 },
  slideBanner: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    padding: 20,
    height: 130,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slideIcon: { position: 'absolute', right: 16, top: 10 },
  slideTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', lineHeight: 26 },
  slideSub:   { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 6 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  dotActive: { backgroundColor: PURPLE },

  // Grid
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
    alignContent: 'flex-start',
  },
  card: {
    width: (width - 46) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: PURPLE,
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { padding: 6 },
});