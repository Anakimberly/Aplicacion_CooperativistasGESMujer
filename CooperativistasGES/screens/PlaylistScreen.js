import React, { useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
  ScrollView, TouchableOpacity, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';  
const LIGHT_PURPLE = '#f3e8fb';
const SPOTIFY_GREEN = '#1DB954';
const YOUTUBE_RED = '#E50914';

const CANCIONES_DATA = [
  {
    id: 's1',
    titulo: 'Canción sin Miedo',
    artista: 'Vivir Quintana',
    descripcion: 'Himno de unión, valentía y dignidad que nos recuerda la fuerza que tenemos cuando nos cuidamos y apoyamos entre mujeres.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/7jds03vWHsZTcCaI8VMfU6',
    youtubeUrl: 'https://www.youtube.com/watch?v=Sf8oI-NQ1Ag',
  },
  {
    id: 's2',
    titulo: 'Weightless',
    artista: 'Marconi Union',
    descripcion: 'Música suave y relajante con sonidos de calma profunda, pensada para disminuir el estrés, descansar y acompañar el bordado o tejido.',
    spotifyUrl: 'https://open.spotify.com/track/6kkwzB6hXLIONkEk9JciA6',
    youtubeUrl: 'https://www.youtube.com/watch?v=UfcAVejslrU',
  },
  {
    id: 's3',
    titulo: 'Creo en Mí',
    artista: 'Natalia Jiménez',
    descripcion: 'Canción de fuerza, superación y amor propio para recordarnos que somos capaces de salir adelante con nuestro propio trabajo.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/4fSar1liXyxCK3lOcWHUE1',
    youtubeUrl: 'https://www.youtube.com/watch?v=P2zOb0HGdxg',
  },
  {
    id: 's4',
    titulo: 'Mujeres',
    artista: 'Julieta Venegas',
    descripcion: 'Canción alegre y reflexiva sobre la presencia, la lucha cotidiana y la voz de las mujeres en las calles y comunidades.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/7vpQ7gJnwNy6e0jEWBEDHd',
    youtubeUrl: 'https://www.youtube.com/watch?v=4XynsU-ZS44',
  },
];

const PODCASTS_DATA = [
  {
    id: 'p1',
    titulo: 'Red de Mujeres Cooperativistas para una Cultura de Paz',
    artista: 'Soledad Venegas (GESMujer) — Pez en el Surco',
    descripcion: 'Plática especial con la maestra Soledad Venegas de GESMujer sobre la creación de la red, la economía feminista y la autonomía de las mujeres en Oaxaca.',
    spotifyUrl: 'https://open.spotify.com/episode/5nv1Wzill2Yw0eUdh2LTd3?si=WRrrhj1kTvOuuHjPpSt8gg',
    youtubeUrl: 'https://www.youtube.com/results?search_query=GESMujer+red+de+mujeres+cooperativistas+Soledad+Venegas',
  },
  {
    id: 'p2',
    titulo: 'Emprender en Femenino',
    artista: 'Erika De la Vega',
    descripcion: 'Charlas amenas y prácticas con expertas sobre cómo usar redes sociales, fortalecer la confianza personal y superar el miedo al iniciar un negocio.',
    spotifyUrl: 'https://open.spotify.com/show/5IHsRFSe7FwXLUrbeQN5vZ?si=26c3a996561d4580',
    youtubeUrl: 'https://youtube.com/playlist?list=PLgYgM3DDFAuiO3h5Op3mQUHeYFNd-61ar&si=52XYHg3V-plvIgNC',
  },
  {
    id: 'p3',
    titulo: 'Mujeres Emprendedoras',
    artista: 'Isabel Santiandreu (FEMWorking)',
    descripcion: 'Conversaciones sinceras con dueñas de pequeños negocios sobre capacitación, venta de productos, crecimiento y cómo resolver los retos del día a día.',
    spotifyUrl: 'https://open.spotify.com/show/1QaQZxYMyasJFL8VYRqIYy?si=d332caaaf0a246ad',
    youtubeUrl: 'https://music.youtube.com/watch?v=MSjT1QZqCik&si=PZSnsO7xnVDPmV7S&drli=1',
  },
];

export default function PlaylistScreen({ onNavigate }) {
  const [seccionActiva, setSeccionActiva] = useState('musica');

  const handleAbrirEnlace = async (url, nombreApp) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert(
        'Aviso',
        `No se pudo abrir ${nombreApp}. Asegúrate de tener conexión a internet.`,
        [{ text: 'Entendido' }]
      );
    }
  };

  const listaActual = seccionActiva === 'musica' ? CANCIONES_DATA : PODCASTS_DATA;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={PURPLE} />

      {/* Encabezado Grande y Claro */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate && onNavigate('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.headerTextCol}>
          <Text style={styles.headerTitle}>Música y Pláticas</Text>
          <Text style={styles.headerSubtitle}>Para acompañar nuestro trabajo</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cuadro de ayuda sencillo para las usuarias */}
        <View style={styles.ayudaCard}>
          <Ionicons name="information-circle" size={26} color={PURPLE} />
          <Text style={styles.ayudaTexto}>
            Toca el botón verde para escuchar en <Text style={styles.boldText}>Spotify</Text> o el botón rojo para escuchar en <Text style={styles.boldText}>YouTube</Text>.
          </Text>
        </View>

        {/* Botones Grandes para Cambiar de Sección */}
        <View style={styles.seccionesRow}>
          <TouchableOpacity
            style={[
              styles.seccionBtn,
              seccionActiva === 'musica' && styles.seccionBtnActivo,
            ]}
            onPress={() => setSeccionActiva('musica')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="music-circle"
              size={26}
              color={seccionActiva === 'musica' ? '#ffffff' : PURPLE}
            />
            <Text
              style={[
                styles.seccionBtnText,
                seccionActiva === 'musica' && styles.seccionBtnTextActivo,
              ]}
            >
              Música
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.seccionBtn,
              seccionActiva === 'podcasts' && styles.seccionBtnActivo,
            ]}
            onPress={() => setSeccionActiva('podcasts')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="microphone"
              size={26}
              color={seccionActiva === 'podcasts' ? '#ffffff' : PURPLE}
            />
            <Text
              style={[
                styles.seccionBtnText,
                seccionActiva === 'podcasts' && styles.seccionBtnTextActivo,
              ]}
            >
              Pláticas y Consejos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Título de la sección visible */}
        <Text style={styles.tituloSeccion}>
          {seccionActiva === 'musica'
            ? 'Canciones para escuchar'
            : 'Pláticas de emprendimiento'}
        </Text>

        {/* Tarjetas grandes y legibles */}
        {listaActual.map((item, index) => (
          <View key={item.id} style={styles.cardItem}>
            {/* Número y Título */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.numeroCirculo}>
                <Text style={styles.numeroTexto}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitulo}>{item.titulo}</Text>
                <Text style={styles.itemArtista}>{item.artista}</Text>
              </View>
            </View>

            {/* Explicación fácil de leer */}
            <Text style={styles.itemDescripcion}>{item.descripcion}</Text>

            {/* Botones de acción grandes */}
            <View style={styles.botonesAccionCol}>
              {item.spotifyUrl ? (
                <TouchableOpacity
                  style={styles.btnSpotify}
                  onPress={() => handleAbrirEnlace(item.spotifyUrl, 'Spotify')}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="spotify" size={26} color="#ffffff" />
                  <Text style={styles.btnTextoBlanco}>Escuchar en Spotify</Text>
                </TouchableOpacity>
              ) : null}

              {item.youtubeUrl ? (
                <TouchableOpacity
                  style={styles.btnYoutube}
                  onPress={() => handleAbrirEnlace(item.youtubeUrl, 'YouTube')}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="youtube" size={26} color="#ffffff" />
                  <Text style={styles.btnTextoBlanco}>Escuchar en YouTube</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#f3e5fa',
    fontSize: 14,
    marginTop: 2,
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#f7f4f9',
  },
  scrollContent: {
    padding: 16,
  },

  ayudaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: PURPLE,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  ayudaTexto: {
    flex: 1,
    fontSize: 14.5,
    color: '#333333',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
    color: PURPLE,
  },

  seccionesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  seccionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#e0d0eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  seccionBtnActivo: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  seccionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: PURPLE,
  },
  seccionBtnTextActivo: {
    color: '#ffffff',
  },

  tituloSeccion: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2a1236',
    marginBottom: 12,
    marginLeft: 2,
  },

  cardItem: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e8ddf0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  numeroCirculo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2cfef',
  },
  numeroTexto: {
    fontSize: 16,
    fontWeight: '800',
    color: PURPLE,
  },
  itemTitulo: {
    fontSize: 17.5,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  itemArtista: {
    fontSize: 14.5,
    fontWeight: '600',
    color: PURPLE,
    marginTop: 2,
  },
  itemDescripcion: {
    fontSize: 14.5,
    color: '#4a4a4a',
    lineHeight: 20,
    marginBottom: 14,
    marginTop: 4,
  },

  botonesAccionCol: {
    gap: 10,
  },
  btnSpotify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: SPOTIFY_GREEN,
    borderRadius: 12,
    paddingVertical: 13,
    elevation: 2,
  },
  btnYoutube: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: YOUTUBE_RED,
    borderRadius: 12,
    paddingVertical: 13,
    elevation: 2,
  },
  btnTextoBlanco: {
    color: '#ffffff',
    fontSize: 15.5,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
