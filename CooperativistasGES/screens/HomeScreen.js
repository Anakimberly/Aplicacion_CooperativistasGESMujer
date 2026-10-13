import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const { width } = Dimensions.get('window');

const slides = [
  { id: '1', image: require('../assets/carrusel1.jpg') },
  { id: '2', image: require('../assets/carrusel2.1.jpg') },
  { id: '3', image: require('../assets/carrusel3.jpg') },
];

const categories = [
  { id: '1', name: 'Cooperativistas', icon: 'account-circle-outline', screen: 'Cooperativistas' },
  { id: '2', name: 'Costeo',          icon: 'cash-multiple',           screen: 'Costeo' },
  { id: '3', name: 'Guía de\nEconomía', icon: 'book-open-outline',    screen: 'GuiaEconomia' },
  { id: '4', name: 'GESMujer',        icon: 'gender-female',           screen: 'GESMujer' },
];

export default function HomeScreen({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  // movimiento de carrusel automatico cada 3.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: nextIndex * (width - 32),
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32));
    if (index >= 0 && index < slides.length) {
      setActiveSlide(index);
    }
  };

  const handleCardPress = (screen) => {
    if (screen) onNavigate(screen);
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
              <Image source={slide.image} style={styles.slideImage} resizeMode='cover' />
            </View>
          ))}
        </ScrollView>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeSlide && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* ── categorías ── */}
      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => handleCardPress(cat.screen)}
            activeOpacity={cat.screen ? 0.7 : 1}
          >
            <MaterialCommunityIcons name={cat.icon} size={52} color='#444' />
            <Text style={styles.cardLabel}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

//carrusel (tamaño de la pantalla )
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // ESTILOS DEL CARRUSEL
  //CONTENEDOR DEL CARRUSEL:
  carouselWrapper: {
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 16,
    overflow: 'hidden',
  },

  //cada tarjetita del carrusel
  slide: {
    width: width - 32,
    paddingRight: 16,
  },

  slideImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },

  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  dotActive: { backgroundColor: PURPLE },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 14,
    alignContent: 'flex-start',
  },
  //card de las categorias
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
  //label de las categorias
  cardLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  //boton del navbar  
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: PURPLE,
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { padding: 6 },
});