import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
  ScrollView, TouchableOpacity, Modal, Dimensions, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';

const MODULOS_APRENDO = [
  {
    id: '1',
    titulo: 'El ABC de la Economía Feminista',
    icono: 'book-open-page-variant',
    descripcion: 'Autonomía, bienestar colectivo y el poder de organizarnos juntas.',
    slides: [
      {
        id: 's1',
        tag: 'A | Autonomía',
        titulo: 'Decidir con Dignidad y Libertad',
        icono: 'flower-tulip-outline',
        contenido: 'La autonomía no es sinónimo de hacer todo solas ni de aislamiento. Es tener la capacidad real y digna de tomar decisiones sobre nuestro cuerpo, nuestra vida, nuestros ingresos, vínculos y tiempos sin pedir permiso.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Antes dependía de mi esposo para todo. Hoy tengo mis ingresos, decido con mis compañeras y siento que mi voz vale.» — Rosario, Grupo SAE (Valles Centrales).',
      },
      {
        id: 's2',
        tag: 'B | Bienestar Colectivo',
        titulo: 'Cuidarnos También es Luchar',
        icono: 'heart-pulse',
        contenido: 'Durante mucho tiempo nos enseñaron que cuidar era una obligación silenciosa. La economía de las mujeres afirma que el cuidado sostiene la vida y debe ser compartido con justicia, con descanso y sin culpa.',
        datoTitulo: 'Dato Clave',
        datoClave: '«Queremos una economía donde valga la pena vivir, no solo sobrevivir: donde podamos cuidarnos sin sentir culpa, trabajar sin miedo y decidir con libertad.»',
      },
      {
        id: 's3',
        tag: 'C | Colectividad',
        titulo: 'Solitas Podemos, Juntas Más y Mejor',
        icono: 'account-group-outline',
        contenido: 'En un mundo que enseña a competir o desconfiar, decidir organizarnos entre mujeres es sanar y resistir. La colectividad es donde tejemos nuestras historias, la fuerza, el sentido y la alegría compartida.',
        datoTitulo: 'Sabiduría Colectiva',
        datoClave: 'Una ramita sola se rompe fácilmente; un manojo unido de ramitas es imposible de quebrar. ¡Juntas somos invencibles!',
      },
      {
        id: 's4',
        tag: 'Cuerpo y Territorio',
        titulo: 'Economía con Rostro de Mujer',
        icono: 'earth',
        contenido: 'Nuestro cuerpo es nuestro primer territorio. Desde la milpa, el bordado, el pan tradicional y la herbolaria en Oaxaca, transformamos la realidad organizándonos desde la cooperación mutua y no desde el despojo.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Con la economía feminista entendimos que no todo es dinero, sino cómo queremos vivir.» — Raíces Tejidas, Mixteca.',
      },
    ],
  },
  {
    id: '2',
    titulo: 'El camino hacia el emprendimiento colectivo',
    icono: 'account-group-outline',
    descripcion: 'De la idea al sueño compartido: ruta, acuerdos y comercialización justa.',
    slides: [
      {
        id: 's1',
        tag: 'Etapa 1: Soñar',
        titulo: 'El Árbol de los Sueños',
        icono: 'lightbulb-on-outline',
        contenido: 'Emprender en colectivo nace de la necesidad y del deseo común. En las raíces reconocemos saberes que ya tenemos; en el tronco lo que producimos hoy; y en las ramas y frutos, nuestros sueños a futuro.',
        datoTitulo: 'Principio Clave',
        datoClave: 'Si una sabe coser, otra vender y otra administrar, sumando talentos construimos una iniciativa más fuerte y duradera.',
      },
      {
        id: 's2',
        tag: 'Etapa 2: Formación',
        titulo: 'Aprender para Decidir Mejor',
        icono: 'school-outline',
        contenido: 'Emprender requiere saberes compartidos: cálculo de costos reales, finanzas básicas, toma de decisiones horizontales y herramientas digitales para visibilizar nuestro trabajo con orgullo.',
        datoTitulo: 'Dato Clave',
        datoClave: 'Aprender a costear y registrar nuestra marca colectiva protege el fruto de nuestras manos contra intermediarios y abusos.',
      },
      {
        id: 's3',
        tag: 'Etapa 3: Acuerdos',
        titulo: 'Reglamento Afirmativo',
        icono: 'handshake-outline',
        contenido: 'Formalizar no es perder el corazón. Creamos acuerdos claros en frases afirmativas: «Nos comprometemos a escucharnos, rotar tareas, tomar decisiones con la voz de todas y respetar los descansos».',
        datoTitulo: 'Tip Práctico',
        datoClave: 'Revisar el reglamento grupal cada 6 meses mantiene viva la confianza y permite adaptarnos con cariño si llegan nuevas compañeras.',
      },
      {
        id: 's4',
        tag: 'Etapa 4: Sentido',
        titulo: 'Comercializar con Identidad',
        icono: 'tag-heart-outline',
        contenido: 'Tener nombre, imagen y relato colectivo cuenta quiénes somos y cómo cuidamos lo que producimos. Cobramos precios justos que valoran las horas de vida, el amor y la técnica invertida.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Lo que vendemos es importante, pero más que lo hicimos juntas... aquí encontramos una familia, hermanas y amigas del corazón.»',
      },
    ],
  },
  {
    id: '3',
    titulo: 'Sostener la red y cuidar el proceso',
    icono: 'hand-heart-outline',
    descripcion: 'Resolver sin romper, cuidar los vínculos y florecer juntas como al maíz.',
    slides: [
      {
        id: 's1',
        tag: 'Resolver sin Romper',
        titulo: 'El Conflicto No es el Problema',
        icono: 'chat-processing-outline',
        contenido: 'El conflicto no es el problema; el silencio sí. Las diferencias de opinión son naturales. Hablamos desde el sentir («yo siento...» en lugar de acusar) para restaurar el vínculo y no para imponer o ganar.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Lo más difícil no es armar el grupo, es seguir juntas sin dejar de querernos. Ahora que tenemos alas, debemos aprender a volar juntas.»',
      },
      {
        id: 's2',
        tag: 'Cuidado Colectivo',
        titulo: 'Cuidar la Red como al Maíz',
        icono: 'sprout-outline',
        contenido: 'Lo que se siembra se cuida, y lo que se cuida florece. Sostener la red es no dejar solas a quienes bajan el ritmo, rotar coordinaciones para evitar sobrecargas y saber hacer pausas cuando hay cansancio.',
        datoTitulo: 'Sabiduría Colectiva',
        datoClave: '«Cuidar la red no es cargarla sola: es regarla entre todas con pausas, con amor, con paciencia y con memoria.»',
      },
      {
        id: 's3',
        tag: 'Memoria Viva',
        titulo: 'Lo Vivido También es Sabiduría',
        icono: 'book-heart-outline',
        contenido: 'Enfocarse solo en hacer cansa el espíritu. Parar a mirar el camino andado —lo que logramos, lo que dolió y lo que aprendimos— nos llena de fuerza, dignifica la experiencia y enseña a otras.',
        datoTitulo: 'Dato Clave',
        datoClave: 'A veces lo más revolucionario no es apresurarse a crecer rápido, sino no perder el sentido de por qué comenzamos juntas.',
      },
    ],
  },
  {
    id: '4',
    titulo: 'Herramientas prácticas para fortalecer grupos y emprendimientos',
    icono: 'toolbox-outline',
    descripcion: 'Árbol de los sueños, rueda del cuidado, plan económico y bitácora grupal.',
    slides: [
      {
        id: 's1',
        tag: 'Diagnóstico',
        titulo: 'El Árbol y Recursos Locales',
        icono: 'tree-outline',
        contenido: 'Dibujar en papel kraft lo que el grupo ya tiene (raíces), lo que hace hoy (tronco) y sus metas (frutos). Mapeamos personas aliadas y espacios de la comunidad sin depender de apoyos externos.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Estas herramientas nos ayudaron a organizarnos sin pelearnos, a planear sin agobiarnos tanto y a escucharnos mejor.» — Raíces Tejidas.',
      },
      {
        id: 's2',
        tag: 'Bienestar',
        titulo: 'La Rueda del Cuidado',
        icono: 'chart-donut',
        contenido: 'Un círculo dividido en 4 áreas: emocional, físico, organizativo y espiritual. Analizamos qué nos falta y redactamos una carta de compromisos mutuos para sostener el bienestar de todas en cada reunión.',
        datoTitulo: 'Tip Práctico',
        datoClave: 'Cuidado organizativo: turnar responsabilidades para que ninguna compañera termine agotada ni se sienta excluida.',
      },
      {
        id: 's3',
        tag: 'Finanzas Justas',
        titulo: 'Plan Económico Feminista',
        icono: 'calculator-variant-outline',
        contenido: 'Calculamos costos fijos y variables, sumamos el valor real de nuestro tiempo por hora y determinamos un precio digno. Incluimos una caja de ahorro grupal para emergencias e imprevistos.',
        datoTitulo: 'Justicia Económica',
        datoClave: 'Cobrar con dignidad nuestro tiempo no es egoísmo: es reconocer que nuestras horas de esfuerzo, historia y técnica valen.',
      },
      {
        id: 's4',
        tag: 'Memoria Colectiva',
        titulo: 'La Bitácora del Grupo',
        icono: 'notebook-edit-outline',
        contenido: 'Un cuaderno donde una compañera distinta cada reunión anota acuerdos de asamblea, aprendizajes y sentimientos. Es la memoria viva que consultamos en momentos de duda y aniversarios.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Nuestra bitácora es como un espejo de lo que fuimos y un mapa de lo que queremos ser.» — Grupo Mujeres Bordando Sueños (Costa).',
      },
    ],
  },
  {
    id: '5',
    titulo: 'El poder de las redes',
    icono: 'lan-connect',
    descripcion: 'Tejer alianzas, mapa con semáforo y pactos solidarios entre mujeres.',
    slides: [
      {
        id: 's1',
        tag: 'Alianzas',
        titulo: 'En Red Hacemos Más',
        icono: 'lan-connect',
        contenido: 'Desde hace siglos las mujeres tejen redes para resistir, cuidar y sanar. Las redes sostienen cuando una cae y amplifican las voces colectivas para no depender de un solo ingreso ni un solo camino.',
        datoTitulo: 'Principio Clave',
        datoClave: '«Solas podemos, pero con otras florecemos.» Una red no significa subordinación: significa intercambio horizontal y sororidad.',
      },
      {
        id: 's2',
        tag: 'Estrategia',
        titulo: 'El Semáforo de Aliadas',
        icono: 'traffic-light-outline',
        contenido: 'Identificamos colectivas y personas con un semáforo de colores: 🟢 Confiables y fraternas, 🟡 En observación, y 🔴 No recomendables por imponer condiciones abusivas o desvalorizar el trabajo.',
        datoTitulo: 'Tip Práctico',
        datoClave: 'Preguntarse siempre: ¿compartimos valores?, ¿nos tratan con respeto?, ¿podemos colaborar en igualdad y sin jerarquías?',
      },
      {
        id: 's3',
        tag: 'Pactos',
        titulo: 'Acuerdos para Alianzas Justas',
        icono: 'account-multiple-check-outline',
        contenido: 'Construimos acuerdos claros: escucharnos sin juzgar, no imponer condiciones externas, respetar tiempos comunitarios y visibilizar siempre el mérito y nombre de cada grupo.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Unidas con otras redes aprendimos a no repetir errores. A sumar sin criticarnos.» — Compañera de la Costa.',
      },
    ],
  },
  {
    id: '6',
    titulo: 'Evaluar, recordar, transformar',
    icono: 'refresh-circle',
    descripcion: 'Línea de vida emocional, preguntas espejo y semillas para el porvenir.',
    slides: [
      {
        id: 's1',
        tag: 'Cuidado',
        titulo: 'Evaluar desde la Ternura',
        icono: 'history',
        contenido: 'Evaluar no es una auditoría ni un regaño; es un acto de amor y cuidado mutuo para reconocer avances, sanar momentos difíciles y festejar los logros compartidos en asamblea.',
        datoTitulo: 'Voz de la Red',
        datoClave: '«Evaluar fue llorar, reír y abrazarnos. Pero también decidir que sí queremos seguir juntas: fue como sellar un pacto.»',
      },
      {
        id: 's2',
        tag: 'Metodología',
        titulo: 'Línea del Tiempo Emocional',
        icono: 'timeline-clock-outline',
        contenido: 'Trazamos una línea horizontal con 3 colores: 🟢 Momentos alegres o de logro, 🔴 Momentos difíciles, y 🔵 Momentos de cambio. Dibujamos cómo éramos antes, cómo somos hoy y qué soñamos para el futuro.',
        datoTitulo: 'Preguntas Espejo',
        datoClave: '¿Qué descubrí de mí misma hoy? ¿Qué me sorprendió del grupo? ¿Qué cambiaríamos si volviéramos a empezar?',
      },
      {
        id: 's3',
        tag: 'El Futuro',
        titulo: 'Mural de Semillas',
        icono: 'seed-outline',
        contenido: 'Cada integrante dibuja y escribe una semilla con lo que anhela ver germinar: mayor confianza, nuevos proyectos, salud, descanso y nuevas alianzas solidarias.',
        datoTitulo: 'Principio Clave',
        datoClave: '«Evaluar no es contar logros. Es aprender de lo vivido para caminar con más amor y claridad.»',
      },
      {
        id: 's4',
        tag: 'Epílogo de la Red',
        titulo: '¡El Hilo Sigue!',
        icono: 'needle',
        contenido: 'Todo tejido empieza con un nudo que une. Cada experiencia es un color y cada palabra tejida entre mujeres es resistencia. Donde haya mujeres organizándose, la economía feminista sigue viva.',
        datoTitulo: 'Grito Colectivo',
        datoClave: '«Nos cansamos, pero no nos rendimos. Nos caímos, pero nos levantamos juntas. ¡Solas nos quieren, pero juntas nos tienen!»',
      },
    ],
  },
];

export default function YoAprendoScreen({ onNavigate }) {
  const { width } = useWindowDimensions();
  const [moduloActivo, setModuloActivo] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);

  const cardSlideWidth = width - 48; // ancho de cada tarjeta estilo 

  const handleAbrirModulo = (modulo) => {
    setModuloActivo(modulo);
    setSlideIndex(0);
  };

  const handleCerrarModal = () => {
    setModuloActivo(null);
    setSlideIndex(0);
  };

  const handleScrollCarousel = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardSlideWidth);
    if (index >= 0 && moduloActivo && index < moduloActivo.slides.length) {
      setSlideIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      {/* ── Cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yo Aprendo</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Banner Informativo ── */}
        <View style={styles.heroBanner}>
          <MaterialCommunityIcons name='school' size={46} color={PURPLE} />
          <Text style={styles.heroTitle}>Módulos de Formación</Text>
          <Text style={styles.heroSubtitle}>
           "La economía feminista no es teoría; es nuestra vida, nuestro tiempo y nuestra resistencia organizada."
          </Text>
        </View>

        {/* ── Lista de Tarjetas ── */}
        <Text style={styles.sectionHeader}>Temas Disponibles ({MODULOS_APRENDO.length})</Text>

        {MODULOS_APRENDO.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.fichaCard}
            onPress={() => handleAbrirModulo(item)}
            activeOpacity={0.7}
          >
            <View style={styles.numeroBadge}>
              <Text style={styles.numeroText}>{index + 1}</Text>
            </View>

            <View style={styles.iconBox}>
              <MaterialCommunityIcons name={item.icono} size={30} color={PURPLE} />
            </View>

            <View style={styles.fichaContent}>
              <Text style={styles.fichaTitle}>{item.titulo}</Text>
              <Text style={styles.fichaDesc} numberOfLines={2}>
                {item.descripcion}
              </Text>
            </View>

            <Ionicons name='chevron-forward' size={20} color='#aaa' style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* ── carrusel modal ── */}
      <Modal
        visible={!!moduloActivo}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCerrarModal}
      >
        <View style={styles.modalOverlay}>
          {/* Fondo para cerrar al tocar fuera */}
          <TouchableOpacity
            style={styles.modalDismissArea}
            activeOpacity={1}
            onPress={handleCerrarModal}
          />

          <View style={styles.modalContainer}>
            {/* Cabecera del modal */}
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.modalCategoryLabel}>Módulo de Formación</Text>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  {moduloActivo?.titulo}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={handleCerrarModal}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Carrusel Deslizable */}
            {moduloActivo && (
              <View style={styles.carouselContainer}>
                <ScrollView
                  ref={carouselRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScrollCarousel}
                  scrollEventThrottle={16}
                  snapToInterval={cardSlideWidth}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingHorizontal: 0 }}
                >
                  {moduloActivo.slides.map((slide, sIdx) => (
                    <View
                      key={slide.id}
                      style={[styles.slideCard, { width: cardSlideWidth }]}
                    >
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.slideCardScrollContent}
                      >
                        {/* Etiqueta del contador */}
                        <View style={styles.slideTagBox}>
                          <Text style={styles.slideTagText}>{slide.tag}</Text>
                          <Text style={styles.slideCounterText}>
                            {sIdx + 1} / {moduloActivo.slides.length}
                          </Text>
                        </View>

                        
                        <View style={styles.slideIconCircle}>
                          <MaterialCommunityIcons
                            name={slide.icono}
                            size={38}
                            color={PURPLE}
                          />
                        </View>

                        {/* Título de la diapositiva */}
                        <Text style={styles.slideTitle}>{slide.titulo}</Text>

                        {/* Texto principal explicativo */}
                        <Text style={styles.slideContent}>{slide.contenido}</Text>

                        {/* Caja de Dato Clave / Voz de la Red */}
                        {slide.datoClave ? (
                          <View style={styles.datoClaveBox}>
                            <View style={styles.datoClaveHeader}>
                              <Ionicons name="sparkles" size={16} color={PURPLE} />
                              <Text style={styles.datoClaveTitle}>
                                {slide.datoTitulo || 'Dato Clave / Voz de la Red'}
                              </Text>
                            </View>
                            <Text style={styles.datoClaveText}>{slide.datoClave}</Text>
                          </View>
                        ) : null}
                      </ScrollView>
                    </View>
                  ))}
                </ScrollView>

                {/* Puntitos de navegacion */}
                <View style={styles.dotsRow}>
                  {moduloActivo.slides.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.instagramDot,
                        i === slideIndex && styles.instagramDotActive,
                      ]}
                    />
                  ))}
                </View>

                {/* Indicador de ayuda */}
                <Text style={styles.swipeHintText}>
                  Desliza horizontalmente para ver más fichas →
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PURPLE },

  header: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  scrollContent: {
    backgroundColor: '#F5F5F5',
    padding: 18,
    paddingBottom: 30,
    flexGrow: 1,
  },

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

  // Ficha Card
  fichaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  numeroBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numeroText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fichaContent: {
    flex: 1,
  },
  fichaTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#333',
    marginBottom: 3,
    lineHeight: 19,
  },
  fichaDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },

  // ── Estilos del carrusel modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  modalDismissArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '92%',
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCategoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: PURPLE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalHeaderTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#222',
    marginTop: 2,
  },
  modalCloseBtn: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 6,
  },

  // Carrusel
  carouselContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  slideCard: {
    backgroundColor: '#faf7fc',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#e8daf0',
    padding: 14,
    marginHorizontal: 0,
    minHeight: 380,
    maxHeight: 480,
  },
  slideCardScrollContent: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  slideTagBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slideTagText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: PURPLE,
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  slideCounterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  slideIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  
  slideTitle: {
    fontSize: 18,              // TAMAÑO DEL TÍTULO DE LA FICHA
    fontWeight: '800',
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  slideContent: {
    fontSize: 15.5,            // TAMAÑO DEL TEXTO PRINCIPAL / EXPLICACIÓN
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  datoClaveBox: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3.5,
    borderLeftColor: PURPLE,
    marginTop: 4,
  },
  datoClaveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  datoClaveTitle: {
    fontSize: 12.5,            // TAMAÑO DEL TÍTULO "DATO CLAVE / VOZ DE LA RED"
    fontWeight: '700',
    color: PURPLE,
    textTransform: 'uppercase',
  },
  datoClaveText: {
    fontSize: 13.5,            // TAMAÑO DEL TEXTO DEL DATO / TESTIMONIO
    color: '#444',
    lineHeight: 19,
    fontStyle: 'italic',
  },

  // Estilos de los puntitos de navegacion
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  instagramDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#ddd',
  },
  instagramDotActive: {
    width: 20,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: PURPLE,
  },
  swipeHintText: {
    fontSize: 11.5,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
});
