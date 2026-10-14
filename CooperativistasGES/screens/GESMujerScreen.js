import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';
const CARD_BG = '#ffffff';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;
const CARD_HEIGHT = 280;

const tarjetas = [
  {
    id: '1',
    titulo: 'Historia',                          // ← cambia el título
    preview: 'Conoce cómo nació GESMujer',       // ← cambia el texto del frente
    imagen: require('../assets/tarjeta1.jpg'),   // ← imagen de la parte de atrás
  },
  {
    id: '2',
    titulo: 'Cooperativismo',                          // ← cambia el título
    preview: 'Juntas construimos una economía justa',  // ← cambia el texto del frente
    imagen: require('../assets/tarjeta2.jpg'),         // ← imagen de la parte de atrás
  },
  {
    id: '3',
    titulo: 'Empoderamiento',                       // ← cambia el título
    preview: 'Mujeres que transforman su realidad', // ← cambia el texto del frente
    imagen: require('../assets/tarjeta3.jpg'),      // ← imagen de la parte de atrás
  },
  {
    id: '4',
    titulo: 'Contacto',                             // ← cambia el título
    preview: 'Comunícate con nosotras',             // ← cambia el texto del frente
    imagen: require('../assets/tarjeta 4.jpg'),     // ← imagen de la parte de atrás
  },
];

function FlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 12,
        useNativeDriver: true,
      }).start();
      setIsFlipped(false);
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 12,
        useNativeDriver: true,
      }).start();
      setIsFlipped(true);
    }
  };

  // rotacion de las tarjetas
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  
  const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
    opacity: frontOpacity,
  };

  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
    opacity: backOpacity,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}            
      onPress={flipCard}
      style={styles.cardContainer}          
    >
      {/* ── Cara frontal: solo texto ── */}
      <Animated.View style={[styles.card, styles.frontCard, frontAnimatedStyle]}>
        <Text style={styles.frontTitle}>{item.titulo}</Text>
        <Text style={styles.frontPreview}>{item.preview}</Text>

        <View style={styles.flipHintContainer}>
          <Ionicons name="sync-outline" size={13} color={PURPLE} />
          <Text style={styles.flipHintText}>Toca para ver más</Text>
        </View>
      </Animated.View>

      {/* ── Cara trasera: imagen completa ── */}
      <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
        <Image source={item.imagen} style={styles.backImage} resizeMode='contain' />
        <Text style={styles.backHintText}>Toca para voltear</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function GESMujerScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PURPLE} />

      {/* ── cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GES Mujer</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Subtitulo ── */}
      <View style={styles.subtitleBox}>
        <Text style={styles.subtitle}>Género, Equidad y Salud</Text>
        <Text style={styles.subtitleSub}>Toca cualquier tarjeta para conocer más</Text>
      </View>

      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {tarjetas.map((item) => (
            <FlipCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // cabecera
  header: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  // Subtitulo
  subtitleBox: {
    backgroundColor: "#e0c8f0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c8f0',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: "#000000",
  },
  subtitleSub: {
    fontSize: 16,
    color: '#000000',
    marginTop: 2,
  },

  // Contenido y Grid 2x2
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },

  // Contenedor de la Tarjeta Flip
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
    padding: 14,
    backfaceVisibility: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Cara Frontal
  frontCard: {
    backgroundColor: CARD_BG,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#AF7AC5",
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: LIGHT_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  frontTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
    marginTop: 8,
  },
  frontPreview: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
    flex: 1,
  },
  flipHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 6,
  },
  flipHintText: {
    fontSize: 14,
    fontWeight: '600',
    color: PURPLE,
  },

  // Cara Trasera
  backCard: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AF7AC5',
    overflow: 'hidden',
    padding: 8,
  },
  backImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  backHintText: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    fontSize: 10,
    color: 'white',
    backgroundColor: 'rgba(91, 19, 120, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
});