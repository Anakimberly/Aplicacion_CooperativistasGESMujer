import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Modal,
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
    titulo: 'El eco de una lucha',                          
    preview: '"Raíces que inspiran: Elvia en GESMujer"',      
    imagen: require('../assets/tarjeta1.jpg'),   
  },
  {
    id: '2',
    titulo: 'Motivación en acción',                          
    preview: '"Juntas construimos una economía justa"',  
    imagen: require('../assets/tarjeta2.jpg'),        
  },
  {
    id: '3',
    titulo: 'Lineas de Acción',                      
    preview: '"Mujeres que transforman su realidad"', 
    imagen: require('../assets/tarjeta3.jpg'),      
  },
  {
    id: '4',
    titulo: 'Mujer Indigena',                             
    preview: ' "Nuestra existencia es, en sí misma, un acto de resistencia colectiva"',             
    imagen: require('../assets/tarjeta4.1.jpg'),    
  },
];

function FlipCard({ item, onOpenModal }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      setIsFlipped(false);
    } else {
      // tiempo de la imagen para que se vea antes de abrir el modal
      if (onOpenModal) {
        onOpenModal(item);
      }
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 250,
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

        <View style={styles.frontPreviewContainer}>
          <Text style={styles.frontPreview}>{item.preview}</Text>
        </View>

        <View style={styles.flipHintContainer}>
          <Ionicons name="scan-outline" size={14} color={PURPLE} />
          <Text style={styles.flipHintText}>Toca para ampliar</Text>
        </View>
      </Animated.View>

      {/* ── Cara trasera parte chiquita de la imagen ── */}
      <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
        <Image source={item.imagen} style={styles.backImage} resizeMode='contain' />
        <Text style={styles.backHintText}>Toca para voltear</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function GESMujerScreen({ onNavigate }) {
  const [modalItem, setModalItem] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PURPLE} />

      {/* ── cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fuerza Cooperativa</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* ── Subtitulo ── */}
      <View style={styles.subtitleBox}>
        <Text style={styles.subtitle}>"De la Raíz a la Acción: El Legado Cooperativo" </Text>
        <Text style={styles.subtitleSub}>Toca cualquier tarjeta para conocer más</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {tarjetas.map((item) => (
            <FlipCard key={item.id} item={item} onOpenModal={(target) => setModalItem(target)} />
          ))}
        </View>
      </ScrollView>

      {/* ── Modal de imagen en grande con fondo desvanecido/oscuro ── */}
      <Modal
        visible={!!modalItem}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalItem(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackgroundDismiss}
            activeOpacity={1}
            onPress={() => setModalItem(null)}
          />

          <View style={styles.modalContent}>
            {/* Botón cerrar */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalItem(null)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>

            {modalItem && (
              <>
                <Text style={styles.modalTitle}>{modalItem.titulo}</Text>
                <View style={styles.modalImageContainer}>
                  <Image
                    source={modalItem.imagen}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.modalHint}>Toca en cualquier parte para cerrar</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    fontSize: 19,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
    marginTop: 4,
  },
  frontPreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  frontPreview: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
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

  // Modal de imagen en grande
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)', // Fondo desvanecido oscuro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalBackgroundDismiss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    padding: 6,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.65,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalHint: {
    marginTop: 14,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
  },
});