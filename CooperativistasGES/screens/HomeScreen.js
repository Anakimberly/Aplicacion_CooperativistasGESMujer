import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';

const slides = [
  { id: '4', image: require('../assets/carrusel4.jpg') },
  { id: '2', image: require('../assets/carrusel2.1.jpg') },
  { id: '1', image: require('../assets/carrusel1.jpg') },
  { id: '3', image: require('../assets/carrusel3.jpg') },
];

const categories = [
  { id: '1', name: 'Cooperativistas', icon: 'account-circle-outline', screen: 'Cooperativistas' },
  { id: '2', name: 'Costeo',          icon: 'cash-multiple',           screen: 'Costeo' },
  { id: '3', name: 'Guía de\nEconomía', icon: 'book-open-outline',    screen: 'GuiaEconomia' },
  { id: '4', name: 'GESMujer',        icon: 'gender-female',           screen: 'GESMujer' },
];

export default function HomeScreen({ onNavigate }) {
  const { width, height } = useWindowDimensions();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);

  const carouselItemWidth = width - 32;
  const isSmallScreen = height < 700;
  const carouselHeight = isSmallScreen ? 150 : Math.min(220, height * 0.26);

  // movimiento de carrusel automatico cada 3.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: nextIndex * carouselItemWidth,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [carouselItemWidth]);

  const handleScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / carouselItemWidth);
    if (index >= 0 && index < slides.length) {
      setActiveSlide(index);
    }
  };

  const handleCardPress = (screen) => {
    if (screen) onNavigate(screen);
  };

  const cardWidth = (width - 46) / 2;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Carrusel ── */}
        <View style={styles.carouselWrapper}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={carouselItemWidth}
            decelerationRate='fast'
          >
            {slides.map((slide) => (
              <View key={slide.id} style={[styles.slide, { width: carouselItemWidth }]}>
                <Image
                  source={slide.image}
                  style={[styles.slideImage, { height: carouselHeight }]}
                  resizeMode='cover'
                />
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
              style={[styles.card, { width: cardWidth }]}
              onPress={() => handleCardPress(cat.screen)}
              activeOpacity={cat.screen ? 0.7 : 1}
            >
              <MaterialCommunityIcons name={cat.icon} size={48} color={PURPLE} />
              <Text style={styles.cardLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollContent: {
    paddingBottom: 24,
  },

  // ESTILOS DEL CARRUSEL
  carouselWrapper: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },

  slide: {
    paddingRight: 16,
  },

  slideImage: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: PURPLE,
  },

  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  dotActive: { backgroundColor: PURPLE },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 14,
    alignContent: 'flex-start',
  },

  card: {
    backgroundColor: '#f3e5f5', 
    borderRadius: 16,
    paddingVertical: 24,
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
    color: PURPLE, 
    textAlign: 'center',
  },
});
