import React, { useRef, useState, useEffect } from 'react';
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
  { id: '3', title: 'Empoderamiento\nEconómico', sub: '¡Cambiando vidas!' },
];

const categories = [
  { id: '1', name: 'Cooperativistas', icon: 'account-circle-outline', screen: 'Cooperativistas' },
  { id: '2', name: 'Costeo',          icon: 'cash-multiple',           screen: 'Costeo' },
  { id: '3', name: 'Guía de\nEconomía', icon: 'book-open-outline',    screen: null },
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
  //  MARGEN LATERAL DEL CARRUSEL (Espacio a la izquierda y derecha de la pantalla):
  carouselWrapper: { marginHorizontal: 16, marginTop: 20, marginBottom: 16 },

  // ANCHO DE CADA TARJETA DEL CARRUSEL 
  slide: { width: width - 33 }, 

  //  DISEÑO Y ALTO DE LA TARJETA DEL CARRUSEL
  slideBanner: {
    backgroundColor: PURPLE,
    borderRadius: 16,
    padding: 20,
    height: 130, 
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  

  //icono de la mujer en el carrusel y el tamaño de la letra
  slideIcon: { position: 'absolute', right: 16, top: 10 },
  slideTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', lineHeight: 26 },
  slideSub:   { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 6 },
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