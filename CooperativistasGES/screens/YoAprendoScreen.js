import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
  ScrollView, TouchableOpacity, Modal, useWindowDimensions,
  Alert, Share, Linking,
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
        contenido: 'Identificamos colectivas y personas con un semáforo de colores:  Confiables y fraternas,  En observación, y  No recomendables por imponer condiciones abusivas o desvalorizar el trabajo.',
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
        contenido: 'Trazamos una línea horizontal con 3 colores: Momentos alegres o de logro,  Momentos difíciles, y  Momentos de cambio. Dibujamos cómo éramos antes, cómo somos hoy y qué soñamos para el futuro.',
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
  {
    id: '7',
    titulo: 'Herramientas, consejos, IA',
    icono: 'robot-outline',
    descripcion: 'Plan de negocios, costeo y precio, marketing y comercialización, IA.',
    esSubMenu: true,
  },
];

/**
 * 4 Cuadraditos del Módulo 7: Herramientas, consejos, IA
 */
const SUBSECCIONES_HERRAMIENTAS = [
  {
    id: 'plan_negocios',
    titulo: 'Plan de negocios',
    icono: 'clipboard-text-outline',
    subtitulo: 'Estructura y visión',
  },
  {
    id: 'costeo_precio',
    titulo: 'Costeo y precio',
    icono: 'calculator-variant-outline',
    subtitulo: 'Costos y precio justo',
  },
  {
    id: 'marketing_comercializacion',
    titulo: 'Marketing y comercialización',
    icono: 'bullhorn-outline',
    subtitulo: 'Fotos, anti-regateo y venta',
  },
  {
    id: 'ia',
    titulo: 'IA',
    icono: 'robot-outline',
    subtitulo: 'Guía y prompts prácticos',
  },
];

/**
 * Sub-Módulo 1: Plan de Negocios (Carrusel tipo Instagram)
 */
const PLAN_NEGOCIOS_MODULO = {
  id: 'sub_plan_negocios',
  titulo: 'Plan de Negocios Colectivo',
  slides: [
    {
      id: 'pn1',
      tag: 'Concepto Clave',
      titulo: '¿Qué es un Plan de Negocios?',
      icono: 'clipboard-text-outline',
      contenido: 'Es una hoja de ruta escrita entre todas que explica qué produce la cooperativa, a quién le vende, cómo se organizan las tareas y cómo aseguran que el proyecto sea duradero, solidario y justo.',
      datoTitulo: '¿Para qué nos sirve?',
      datoClave: 'Evita confusiones, previene que una sola compañera se sobrecargue y ayuda a no perder dinero comprando material a ciegas.',
    },
    {
      id: 'pn2',
      tag: '4 Pilares',
      titulo: 'Las 4 Preguntas Esenciales',
      icono: 'cube-outline',
      contenido: '1. ¿Qué ofrecemos y qué nos hace únicas?\n2. ¿Quiénes son nuestras compradoras y aliadas?\n3. ¿Cómo producimos y cómo nos turnamos los roles?\n4. ¿Cuánto dinero entra, cuánto gastamos y qué ganamos?',
      datoTitulo: 'Dato Clave',
      datoClave: 'No tiene que ser un documento complicado: en una cartulina grande en asamblea se responden estas preguntas con dibujos y acuerdos.',
    },
    {
      id: 'pn3',
      tag: 'Metodología',
      titulo: 'El Árbol de los Sueños',
      icono: 'tree-outline',
      contenido: 'En las raíces dibujamos lo que ya sabemos hacer y los recursos de nuestra comunidad. En el tronco, lo que producimos hoy. Y en las ramas y frutos, nuestras metas compartidas a 6 meses y un año.',
      datoTitulo: 'Voz de la Red',
      datoClave: '«Tener nuestro plan nos dio orden y seguridad: cada socia sabe qué le toca hacer y a dónde queremos llegar.»',
    },
    {
      id: 'pn4',
      tag: 'Valores',
      titulo: 'Poner la Vida en el Centro',
      icono: 'heart-cog-outline',
      contenido: 'Un plan con enfoque feminista no solo mide dinero; mide bienestar, tiempos de descanso, acuerdos de apoyo ante enfermedades y cuidado colectivo de la tierra.',
      datoTitulo: 'Principio de Oro',
      datoClave: '«Si el negocio da dinero pero terminamos agotadas o enfermas, no funciona. El verdadero éxito es florecer juntas.»',
    },
  ],
};

/**
 * Sub-Módulo 2: Costeo y Precio (Carrusel tipo Instagram con botón de Excel)
 */
const COSTEO_PRECIO_MODULO = {
  id: 'sub_costeo_precio',
  titulo: 'Costeo y Precio Justo',
  slides: [
    {
      id: 'cp1',
      tag: 'Diferencia Clave',
      titulo: '¿Costeo y Precio son lo mismo?',
      icono: 'scale-balance',
      contenido: '¡No son lo mismo! El COSTEO es la suma exacta de todo lo que te costó hacer la pieza (materiales + tu tiempo). El PRECIO es la cantidad en pesos que pagará la clienta al comprarlo.',
      datoTitulo: 'Atención',
      datoClave: 'Si no sabes tu COSTO exacto, corres el riesgo de fijar un PRECIO donde termines perdiendo dinero o regalando tu esfuerzo.',
    },
    {
      id: 'cp2',
      tag: 'Elementos',
      titulo: '¿Qué debe incluir el Costeo?',
      icono: 'calculator-variant-outline',
      contenido: '1. Costos Directos: Telas, hilos, harina, frascos, etiquetas.\n2. Costos Indirectos: Pasajes, luz, gas, empaques.\n3. TU TIEMPO: Las horas dedicadas multiplicadas por un pago digno por hora.',
      datoTitulo: 'Justicia Económica',
      datoClave: '¡Tu tiempo no es gratis! Nunca pongas $0 pesos en tu mano de obra al hacer cuentas.',
    },
    {
      id: 'cp3',
      tag: 'Ejemplo Real',
      titulo: 'Ejemplo: Blusa Bordada',
      icono: 'tshirt-crew-outline',
      contenido: '• Materiales (manta e hilos finos): $180\n• Indirectos (pasaje a comprar hilo y empaque): $40\n• Mano de obra (10 horas de bordado a $50/h): $500\n• COSTO TOTAL: $720\n• Aporte al fondo colectivo (20%): $144\n→ PRECIO FINAL JUSTO: $864 pesos.',
      datoTitulo: 'Fondo de la Red',
      datoClave: 'El margen colectivo permite comprar material por mayoreo o tener una caja de ahorro para emergencias de salud de las socias.',
    },
    {
      id: 'cp4',
      tag: 'Herramienta Práctica',
      titulo: 'Plantilla de Ayuda en Excel',
      icono: 'file-excel-box',
     
      datoTitulo: 'Descarga de Ayuda',
      datoClave: 'Presiona el botón verde de abajo para descargar la plantilla de apoyo.',
      tieneBotonExcel: true,
    },
  ],
};


 
const TABS_MARKETING = [
  { id: 'simulador', label: 'Anti-Regateo', icono: 'chat-processing-outline' },
  { id: 'checklist_foto', label: 'Foto con Celular', icono: 'camera-outline' },
  { id: 'etiquetas', label: 'Etiquetas con Alma', icono: 'tag-heart-outline' },
  { id: 'ruta_ventas', label: 'Canales de Venta', icono: 'storefront-outline' },
];

//simulador de objeciones y regateo
 
const OBJECIONES_REGATEO = [
  {
    id: 0,
    icono: 'cash-remove',
    clienteDice: '«¿Por qué tan caro si es una blusita o pieza pequeña?»',
    tituloRespuesta: 'Valorar el Tiempo de Vida',
    respuesta: '«Agradecemos mucho que te guste la pieza. No es solo una blusa: son más de 12 días de bordado minucioso con técnicas tradicionales de nuestra comunidad. Este precio reconoce con dignidad las horas de vida, dedicación y cuidado que invertimos.»',
    porQueFunciona: 'Educa a la clienta con cariño sin ponerte a la defensiva, haciéndola consciente de que está comprando días de vida y no una prenda maquilada.',
    tipAccion: 'Muestra de cerca una puntada para que admire el detalle hecho a mano.',
  },
  {
    id: 1,
    icono: 'store-outline',
    clienteDice: '«En el mercado del centro lo vi a la mitad de precio...»',
    tituloRespuesta: 'Diferenciar Arte vs. Maquila',
    respuesta: '«Es muy comprensible que haya opciones más baratas; muchas de ellas se elaboran en masa con máquinas industriales o hilos sintéticos. Nuestras piezas son 100% artesanales y hechas a mano, y tu pago va directamente a las familias de las mujeres creadoras, sin intermediarios.»',
    porQueFunciona: 'Explica con respeto la diferencia entre producción en serie y artesanía con identidad comunitaria.',
    tipAccion: 'Invítale a tocar la tela y sentir la textura natural de tu producto.',
  },
  {
    id: 2,
    icono: 'tag-multiple-outline',
    clienteDice: '«Si me llevo dos o tres piezas, ¿en cuánto me las dejas?»',
    tituloRespuesta: 'Cuidar el Trabajo Colectivo',
    respuesta: '«¡Nos alegra muchísimo que quieras llevarte más de una! En nuestra cooperativa cada pieza requiere exactamente el mismo tiempo y amor de una compañera, por lo que el precio por pieza es fijo. Pero con mucho gusto te obsequiamos una bolsa de tela ecológica o una postal con la historia de nuestro grupo.»',
    porQueFunciona: 'Ofrece un gesto de cortesía y agradecimiento sin castigar los ingresos de tus socias.',
    tipAccion: 'Tener a la mano regalitos de bajo costo (como una postal o sticker) resuelve la venta con una sonrisa.',
  },
  {
    id: 3,
    icono: 'wallet-outline',
    clienteDice: '«Solo traigo $300 pesos, ¿no me lo puedes dejar en eso?»',
    tituloRespuesta: 'Ofrecer Alternativas sin Perder',
    respuesta: '«Entendemos totalmente tu presupuesto. Esta pieza grande no podemos rebajarla para proteger el sustento de la compañera que la elaboró, pero con mucho gusto te muestro estos aretes, monederos o piezas pequeñas que están justo dentro de tu presupuesto y son igual de hermosas.»',
    porQueFunciona: 'No rechazas a la clienta; la acompañas a encontrar una pieza que sí pueda pagar sin que tú pierdas dinero.',
    tipAccion: 'Tener siempre productos de diferentes precios ($50, $150, $400, $900) permite que nadie se vaya con las manos vacías.',
  },
];

//iteracion de checklist de fotos para celular
const CHECKLIST_FOTO_ITEMS = [
  {
    id: 'c1',
    icono: 'white-balance-sunny',
    titulo: 'Luz Natural de Día (Sin Flash)',
    descripcion: 'Tomada cerca de una ventana o en patio techado (de 9am a 11am o de 4pm a 6pm). El flash directo quema los colores y aplana las texturas.',
  },
  {
    id: 'c2',
    icono: 'camera-iris',
    titulo: 'Lente de la Cámara Limpio',
    descripcion: '¿Limpiaste el lente de tu celular con una tela suave o tu blusa antes de disparar? La grasa de los dedos hace que las fotos se vean borrosas o sin brillo.',
  },
  {
    id: 'c3',
    icono: 'view-compact-outline',
    titulo: 'Fondo Neutro y Despejado',
    descripcion: 'Pusiste tu pieza sobre manta lisa, madera o un petate limpio. Cero ropa doblada, cables o trastes alrededor que distraigan la mirada.',
  },
  {
    id: 'c4',
    icono: 'magnify-plus-outline',
    titulo: 'Foto de Detalle de Cerca',
    descripcion: 'Una toma a pocos centímetros donde se aprecie la textura, el bordado fino, los acabados y la calidad de los materiales.',
  },
  {
    id: 'c5',
    icono: 'hand-heart',
    titulo: 'Las Manos Creadoras en Acción',
    descripcion: 'Una toma donde se vean las manos de la artesana bordando, amasando o tejiendo. Las fotos de procesos generan 3 veces más confianza.',
  },
  {
    id: 'c6',
    icono: 'palette-outline',
    titulo: 'Sin Filtros que Alteren los Colores',
    descripcion: 'Los tonos que se ven en la pantalla deben ser idénticos a los hilos e ingredientes reales, para evitar reclamos de clientas.',
  },
];

//etiquetaaas
const EJEMPLOS_ETIQUETAS = [
  {
    id: 'bordado',
    nombreTab: ' Blusa',
    producto: 'Blusa en Telar de Cintura',
    artesana: 'Rosario Hernández',
    comunidad: 'San Antonino Castillo Velasco, Oaxaca',
    tiempoElaboracion: '14 días de trabajo a mano',
    tecnica: 'Bordado tradicional de deshilado y aguja con hilos de algodón puro.',
    mensajeHistoria: '«Al vestir esta prenda portas saberes ancestrales y sostienes la independencia económica de una familia cooperativista.»',
    precioSugerido: '$850 MXN',
    colorFondo: '#fff1f2',
    colorBorde: '#f43f5e',
    colorTitulo: '#9f1239',
    colorTexto: '#881337',
    colorBotonPrecio: '#881337',
    colorBadgeActivo: '#e11d48',
    colorCitaFondo: '#ffe4e6',
    colorDetalleIcono: '#be123c',
  },
  {
    id: 'miel',
    nombreTab: ' Miel',
    producto: 'Miel Pura de Flor de Café',
    artesana: 'Cooperativa Flor de Montaña',
    comunidad: 'Sierra Sur, Oaxaca',
    tiempoElaboracion: 'Cosecha estacional agroecológica',
    tecnica: 'Apicultura sin pesticidas, cuidando las abejas nativas y el bosque.',
    mensajeHistoria: '«Esta miel conserva el aroma de las montañas oaxaqueñas y protege las fuentes de agua de nuestra comunidad.»',
    precioSugerido: '$160 MXN (500g)',
    colorFondo: '#fffbeb',
    colorBorde: '#f59e0b',
    colorTitulo: '#b45309',
    colorTexto: '#78350f',
    colorBotonPrecio: '#92400e',
    colorBadgeActivo: '#d97706',
    colorCitaFondo: '#fef3c7',
    colorDetalleIcono: '#b45309',
  },
  {
    id: 'pan',
    nombreTab: 'Pan',
    producto: 'Pan Tradicional en Horno de Leña',
    artesana: 'Doña Teresa y Familia',
    comunidad: 'Valles Centrales, Oaxaca',
    tiempoElaboracion: 'Elaboración fresca cada madrugada',
    tecnica: 'Receta familiar heredada de abuelas, fermentación natural y canela pura.',
    mensajeHistoria: '«Un bocado de memoria y tradición elaborado con ingredientes locales sin conservadores artificiales.»',
    precioSugerido: '$25 MXN c/u',
    colorFondo: '#faf4ee',
    colorBorde: '#c2410c',
    colorTitulo: '#9a3412',
    colorTexto: '#6c2e12',
    colorBotonPrecio: '#7c2d12',
    colorBadgeActivo: '#c2410c',
    colorCitaFondo: '#ffedd5',
    colorDetalleIcono: '#9a3412',
  },
  {
    id: 'herbolaria',
    nombreTab: ' Herbolaria',
    producto: 'Bálsamo Calmante de Árnica y Ruda',
    artesana: 'Colectiva Raíces Vivas',
    comunidad: 'Costa de Oaxaca',
    tiempoElaboracion: 'Maceración solar de 21 días',
    tecnica: 'Cosecha respetuosa de plantas medicinales según el ciclo lunar.',
    mensajeHistoria: '«Medicina tradicional para sanar el cuerpo y aliviar el cansancio con el poder curativo de las abuelas.»',
    precioSugerido: '$120 MXN',
    colorFondo: '#f0fdf4',
    colorBorde: '#10b981',
    colorTitulo: '#065f46',
    colorTexto: '#064e3b',
    colorBotonPrecio: '#064e3b',
    colorBadgeActivo: '#059669',
    colorCitaFondo: '#dcfce7',
    colorDetalleIcono: '#047857',
  },
];


const RUTAS_VENTA = [
  {
    id: 'whatsapp',
    icono: 'whatsapp',
    titulo: 'Ventas por WhatsApp Business',
    dificultad: 'Fácil y Gratis',
    subtitulo: 'Tu catálogo en el bolsillo de tus clientas',
    pasos: [
      'Descarga gratis WhatsApp Business en tu celular.',
      'En «Herramientas para la empresa», sube las fotos de tus piezas con precio fijo y medidas.',
      'Comparte el enlace de tu catálogo a tus clientas y grupos comunitarios para pedidos directos sin comisiones.',
    ],
    secreto: 'Crea estados de WhatsApp con fotos del proceso de bordado o preparación: ¡los estados generan ventas inmediatas!',
  },
  {
    id: 'mercaditas',
    icono: 'storefront-outline',
    titulo: 'Mercaditas y Ferias Solidarias',
    dificultad: 'Venta Presencial',
    subtitulo: 'Espacios seguros y sin intermediarios',
    pasos: [
      'Viste tu mesa con un mantel liso que contraste con tus productos (ej. manta clara o morado).',
      'Usa huacales o cajitas de madera para dar diferentes alturas y que todo luzca ordenado.',
      'Coloca un cartel visible con el nombre de tu cooperativa y precios claros para que la gente no sienta pena de preguntar.',
    ],
    secreto: 'Ofrece siempre degustación (si es comida) o permite que la gente toque los bordados para enamorarse de la textura.',
  },
  {
    id: 'alianzas',
    icono: 'handshake-outline',
    titulo: 'Alianzas con Locales y Cafeterías',
    dificultad: 'Intermedia',
    subtitulo: 'Tus productos en vitrinas aliadas',
    pasos: [
      'Identifica cafeterías, hoteles boutique o librerías en Oaxaca que compartan valores comunitarios.',
      'Pacta una comisión justa (lo ideal es 15% a 20%, nunca aceptes 40% o 50% de abusos).',
      'Firma una hoja de consignación con fecha, número de piezas y valor a pagar al venderse.',
    ],
    secreto: 'Deja junto a tus piezas tarjetitas con tu teléfono y redes para que quienes las vean se comuniquen directamente.',
  },
];


const PROMPTS_IA = [
  {
    id: 'p1',
    icono: 'bullhorn-outline',
    categoria: 'Publicidad y Volantes',
    titulo: ' Texto para Flyer o Volante de Venta',
    objetivo: 'Generar el texto completo para un volante impreso o imagen de WhatsApp.',
    textoPrompt: 'Actúa como una experta en mercadotecnia comunitaria y economía solidaria. Escribe el texto para un volante o flyer de venta para nuestra cooperativa de [Escribe aquí tu producto: ej. miel, bordados, mermeladas, panadería] en [Escribe tu comunidad o municipio en Oaxaca].\n\nNecesito:\n1. Un título llamativo y cálido.\n2. 3 motivos breves de por qué comprar local apoya a mujeres organizadas.\n3. Espacio para fecha, horario y punto de entrega.\n4. Nuestros teléfonos y redes sociales: [Escribe tus datos de contacto].\n5. Una frase final emotiva que resalte la riqueza de Oaxaca.',
    consejo: 'Copia el texto, pégalo en ChatGPT o Gemini, cambia lo que está entre corchetes [...] por tus datos reales y envíalo.',
  },
  {
    id: 'p2',
    icono: 'whatsapp',
    categoria: 'Redes y WhatsApp',
    titulo: ' Publicación para Facebook y Estados de WhatsApp',
    objetivo: 'Crear mensajes atractivos con emojis para anunciar productos o pedidos.',
    textoPrompt: 'Escribe 3 propuestas de mensajes cortos, alegres y con emojis bonitos para publicar en Facebook y en estados de WhatsApp anunciando que nuestra cooperativa de mujeres tiene disponible [Nombre del producto o colección].\n\nEl mensaje debe transmitir que es un producto 100% artesanal, hecho con amor, libre de intermediarios, y que cada compra sostiene la economía familiar de las socias. Incluye una invitación clara a enviar mensaje para hacer pedidos.',
    consejo: 'Pídele a la IA que use un tono cálido, familiar y respetuoso.',
  },
  {
    id: 'p3',
    icono: 'card-text-outline',
    categoria: 'Historia y Empaque',
    titulo: ' Historia Emotiva para la Etiqueta del Producto',
    objetivo: 'Contar quién elaboró la pieza para que la clienta valore el proceso artesanal.',
    textoPrompt: 'Ayúdame a redactar un texto breve y muy emotivo (máximo 40 palabras) para imprimir en una tarjetita que irá colgada a nuestro producto [Escribe qué es: ej. blusa de telar, chocolate de metate, pomada de hierbas].\n\nDebe contar que fue elaborado a mano por mujeres de la Red de Mujeres Cooperativistas de Oaxaca, preservando la memoria ancestral y sembrando paz y autonomía.',
    consejo: 'Este texto lo puedes imprimir en papel kraft para colgarlo en cada pieza que vendas.',
  },
  {
    id: 'p4',
    icono: 'shield-heart-outline',
    categoria: 'Atención a Clientas',
    titulo: ' Respuesta Respetuosa y Firme contra el Regateo',
    objetivo: 'Defender el precio justo de forma educada y sin perder a la clienta.',
    textoPrompt: 'Escribe 2 opciones de respuestas muy amables, comprensivas pero firmes para responder por WhatsApp a una persona que me está pidiendo descuento o rebaja en una artesanía de [Nombre del producto] que cuesta $[Precio].\n\nExplícale de manera cariñosa y clara que el precio es fijo porque representa [número de días o semanas] de trabajo minucioso, insumos de primera calidad y el pago digno por hora que merecen las artesanas para sustentar a sus familias.',
    consejo: 'Tener estas respuestas preparadas te dará seguridad y evitará que regales tu trabajo.',
  },
  {
    id: 'p5',
    icono: 'lightbulb-on-outline',
    categoria: 'Ideas de Temporada',
    titulo: ' Ideas de Paquetes para Fechas Especiales',
    objetivo: 'Armar promociones atractivas para Día de Madres, Navidad o Fiestas.',
    textoPrompt: 'Somos una cooperativa de mujeres que elabora [Lista de 2 o 3 productos que hacen, ej. jabones de hierbas y toallas bordadas].\n\nDame 4 ideas de paquetes de regalo o canastas económicas para [Elegir temporada: Día de las Madres, Navidad o Regalo de Graduación] que podamos armar combinando nuestros productos con una presentación bonita y accesible, pero que nos deje una ganancia justa.',
    consejo: 'Pídele a la IA que te sugiera nombres bonitos para cada paquete de regalo.',
  },
];

export default function YoAprendoScreen({ onNavigate }) {
  const { width } = useWindowDimensions();
  const [vistaActual, setVistaActual] = useState('lista'); 
  const [subVistaHerramientas, setSubVistaHerramientas] = useState(null); 
  const [moduloActivo, setModuloActivo] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // Estados interactivos para Marketing
  const [tabMkt, setTabMkt] = useState('simulador'); 
  const [objecionActiva, setObjecionActiva] = useState(0);
  const [checklistFotos, setChecklistFotos] = useState({
    c1: false, c2: false, c3: false, c4: false, c5: false, c6: false,
  });
  const [etiquetaActiva, setEtiquetaActiva] = useState('bordado');
  const [acordeonVentas, setAcordeonVentas] = useState('whatsapp');

  const carouselRef = useRef(null);
  const cardSlideWidth = width - 48; // ancho de cada tarjeta 

  // Navegación principal de módulos
  const handleAbrirModulo = (modulo) => {
    if (modulo.id === '7' || modulo.esSubMenu) {
      setVistaActual('herramientas_ia');
      setSubVistaHerramientas(null);
      return;
    }
    setModuloActivo(modulo);
    setSlideIndex(0);
  };

  // Abrir una de las 4 subsecciones de Herramientas
  const handleAbrirSubseccion = (item) => {
    if (item.id === 'plan_negocios') {
      setModuloActivo(PLAN_NEGOCIOS_MODULO);
      setSlideIndex(0);
    } else if (item.id === 'costeo_precio') {
      setModuloActivo(COSTEO_PRECIO_MODULO);
      setSlideIndex(0);
    } else if (item.id === 'marketing_comercializacion') {
      setSubVistaHerramientas('marketing');
    } else if (item.id === 'ia') {
      setSubVistaHerramientas('ia');
    }
  };

  // Botón de retroceso general
  const handleBackPress = () => {
    if (subVistaHerramientas) {
      setSubVistaHerramientas(null);
    } else if (vistaActual === 'herramientas_ia') {
      setVistaActual('lista');
    } else {
      onNavigate('Home');
    }
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

  const handleDescargarExcel = () => {
    const downloadUrl = 'https://docs.google.com/spreadsheets/d/18_TCNglMSHMsKskSbJmBKRlvTDsrq6Xs/export?format=xlsx';
    const viewUrl = 'https://docs.google.com/spreadsheets/d/18_TCNglMSHMsKskSbJmBKRlvTDsrq6Xs/edit?usp=sharing';

    Alert.alert(
      'Plantilla de Costeo y Precio Justo',
      '¿Cómo deseas acceder a la plantilla?',
      [
        {
          text: 'Descargar archivo (.xlsx)',
          onPress: async () => {
            try {
              await Linking.openURL(downloadUrl);
            } catch (error) {
              Alert.alert('Error', 'No se pudo iniciar la descarga. Intenta abrirla en Google Drive.');
            }
          },
        },
        {
          text: 'Abrir en Google Drive',
          onPress: async () => {
            try {
              await Linking.openURL(viewUrl);
            } catch (error) {
              Alert.alert('Error', 'No se pudo abrir el enlace.');
            }
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  // Copiar o compartir un prompt de IA
  const handleCompartirPrompt = async (prompt) => {
    try {
      await Share.share({
        message: prompt.textoPrompt,
        title: prompt.titulo,
      });
    } catch (error) {
      Alert.alert(prompt.titulo, prompt.textoPrompt);
    }
  };

  // Copiar respuesta del simulador anti-regateo
  const handleCopiarRespuestaRegateo = async (objecion) => {
    try {
      await Share.share({
        message: objecion.respuesta,
        title: objecion.tituloRespuesta,
      });
    } catch (e) {
      Alert.alert(objecion.tituloRespuesta, objecion.respuesta);
    }
  };

  // Toggle de casillas en el checklist de fotos
  const toggleChecklistFoto = (id) => {
    setChecklistFotos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReiniciarChecklist = () => {
    setChecklistFotos({
      c1: false, c2: false, c3: false, c4: false, c5: false, c6: false,
    });
  };

  const totalChecklist = Object.values(checklistFotos).filter(Boolean).length;

  // Título dinámico de la cabecera
  const getHeaderTitle = () => {
    if (subVistaHerramientas === 'marketing') return 'Marketing Interactivo';
    if (subVistaHerramientas === 'ia') return 'Guía de IA y Prompts';
    if (vistaActual === 'herramientas_ia') return 'Herramientas, consejos, IA';
    return 'Yo Aprendo';
  };

  // Datos de la etiqueta activa seleccionada
  const etiquetaSeleccionada = EJEMPLOS_ETIQUETAS.find(e => e.id === etiquetaActiva) || EJEMPLOS_ETIQUETAS[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      {/* ── Cabecera ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {getHeaderTitle()}
        </Text>
        <View style={{ width: 36 }} />
      </View>

    
      {vistaActual === 'lista' && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Banner Informativo */}
          <View style={styles.heroBanner}>
            <MaterialCommunityIcons name='school' size={46} color={PURPLE} />
            <Text style={styles.heroTitle}>Módulos de Formación</Text>
            <Text style={styles.heroSubtitle}>
              "La economía feminista no es teoría; es nuestra vida, nuestro tiempo y nuestra resistencia organizada."
            </Text>
          </View>

          {/* Lista de Tarjetas */}
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
      )}

     
      {vistaActual === 'herramientas_ia' && !subVistaHerramientas && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Banner Informativo de Herramientas */}
          <View style={styles.heroBanner}>
            <MaterialCommunityIcons name='robot-outline' size={46} color={PURPLE} />
            <Text style={styles.heroTitle}>Herramientas, Consejos e IA</Text>
            <Text style={styles.heroSubtitle}>
              Selecciona una categoría para explorar recursos prácticos, consejos de venta e inteligencia artificial para tu cooperativa:
            </Text>
          </View>

          <Text style={styles.sectionHeader}>Áreas Disponibles (4)</Text>

          {/* Cuadrícula de 4 cuadraditos */}
          <View style={styles.cuadraditosGrid}>
            {SUBSECCIONES_HERRAMIENTAS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.cuadraditoCard}
                onPress={() => handleAbrirSubseccion(item)}
                activeOpacity={0.75}
              >
                <View style={styles.cuadraditoIconCircle}>
                  <MaterialCommunityIcons name={item.icono} size={28} color={PURPLE} />
                </View>
                <Text style={styles.cuadraditoTitle}>{item.titulo}</Text>
                <Text style={styles.cuadraditoDesc}>{item.subtitulo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      
      {subVistaHerramientas === 'marketing' && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Selector de pestañas interactivas */}
          <View style={styles.mktTabsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mktTabsRow}
            >
              {TABS_MARKETING.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.mktTabBtn,
                    tabMkt === tab.id && styles.mktTabBtnActivo,
                  ]}
                  onPress={() => setTabMkt(tab.id)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name={tab.icono}
                    size={18}
                    color={tabMkt === tab.id ? '#ffffff' : PURPLE}
                  />
                  <Text
                    style={[
                      styles.mktTabBtnText,
                      tabMkt === tab.id && styles.mktTabBtnTextActivo,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* ── INTERACCIÓN 1: SIMULADOR ANTI-REGATEO ── */}
          {tabMkt === 'simulador' && (
            <View>
              <View style={styles.interactiveHeaderCard}>
                <View style={styles.interactiveHeaderIconBox}>
                  <MaterialCommunityIcons name="chat-question-outline" size={26} color={PURPLE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.interactiveCardTitle}>Simulador Anti-Regateo</Text>
                  <Text style={styles.interactiveCardDesc}>
                    Toca una frase común para descubrir la respuesta amorosa y digna que defiende tu trabajo:
                  </Text>
                </View>
              </View>

              {/* Botones de Objeciones */}
              <View style={styles.objecionesList}>
                {OBJECIONES_REGATEO.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.objecionBtn,
                      objecionActiva === item.id && styles.objecionBtnActivo,
                    ]}
                    onPress={() => setObjecionActiva(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.objecionIconCircle}>
                      <MaterialCommunityIcons
                        name={item.icono}
                        size={18}
                        color={objecionActiva === item.id ? '#ffffff' : PURPLE}
                      />
                    </View>
                    <Text
                      style={[
                        styles.objecionBtnText,
                        objecionActiva === item.id && styles.objecionBtnTextActivo,
                      ]}
                      numberOfLines={2}
                    >
                      {item.clienteDice}
                    </Text>
                    <Ionicons
                      name={objecionActiva === item.id ? "radio-button-on" : "radio-button-off"}
                      size={18}
                      color={objecionActiva === item.id ? PURPLE : '#aaa'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Tarjeta de Respuesta Digna Revelada */}
              {OBJECIONES_REGATEO[objecionActiva] && (
                <View style={styles.respuestaDignaCard}>
                  <View style={styles.respuestaHeader}>
                    <View style={styles.respuestaTagBadge}>
                      <Ionicons name="sparkles" size={14} color={PURPLE} />
                      <Text style={styles.respuestaTagText}>
                        {OBJECIONES_REGATEO[objecionActiva].tituloRespuesta}
                      </Text>
                    </View>
                    <Text style={styles.respuestaGuiaLabel}>Respuesta Sugerida</Text>
                  </View>

                  {/* Globo de Diálogo de la Respuesta */}
                  <View style={styles.speechBubble}>
                    <MaterialCommunityIcons
                      name="format-quote-open"
                      size={24}
                      color="#baa2cc"
                      style={{ marginBottom: 4 }}
                    />
                    <Text style={styles.speechBubbleText}>
                      {OBJECIONES_REGATEO[objecionActiva].respuesta}
                    </Text>
                  </View>

                  {/* Botón para compartir/copiar la respuesta */}
                  <TouchableOpacity
                    style={styles.copiarRespuestaBtn}
                    onPress={() => handleCopiarRespuestaRegateo(OBJECIONES_REGATEO[objecionActiva])}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="copy-outline" size={16} color="#ffffff" />
                    <Text style={styles.copiarRespuestaBtnText}>Copiar / Enviar por WhatsApp</Text>
                  </TouchableOpacity>

                  {/* Por qué funciona y Tip en acción */}
                  <View style={styles.explicacionBox}>
                    <Text style={styles.explicacionTitle}> ¿Por qué funciona?</Text>
                    <Text style={styles.explicacionText}>
                      {OBJECIONES_REGATEO[objecionActiva].porQueFunciona}
                    </Text>

                    <Text style={[styles.explicacionTitle, { marginTop: 8 }]}> Tip en acción:</Text>
                    <Text style={styles.explicacionText}>
                      {OBJECIONES_REGATEO[objecionActiva].tipAccion}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

        
          {tabMkt === 'checklist_foto' && (
            <View>
              <View style={styles.interactiveHeaderCard}>
                <View style={styles.interactiveHeaderIconBox}>
                  <MaterialCommunityIcons name="camera-metering-center" size={26} color={PURPLE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.interactiveCardTitle}>Consejo para la Foto Perfecta</Text>
                  <Text style={styles.interactiveCardDesc}>
                    Toca cada punto que cumpla tu foto. ¡Consigue 6 de 6 para fotos de nivel profesional!
                  </Text>
                </View>
              </View>

              {/* Barra de Progreso y Marcador */}
              <View style={styles.scoreBarCard}>
                <View style={styles.scoreBarHeader}>
                  <Text style={styles.scoreNumberText}>{totalChecklist} de 6</Text>
                  <View style={styles.scoreStatusPill}>
                    <Text style={styles.scoreStatusText}>
                      {totalChecklist === 6
                        ? ' ¡FOTO PERFECTA!'
                        : totalChecklist >= 4
                        ? ' ¡Casi lista!'
                        : ' En preparación'}
                    </Text>
                  </View>
                </View>

                {/* Línea de progreso */}
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${(totalChecklist / 6) * 100}%` },
                    ]}
                  />
                </View>

                {totalChecklist === 6 && (
                  <Text style={styles.felicitacionText}>
                     ¡Tu foto tiene iluminación, nitidez y respeto a los detalles! Lista para publicar en WhatsApp y redes.
                  </Text>
                )}
              </View>

              {/* Lista interactiva de casillas tocables */}
              {CHECKLIST_FOTO_ITEMS.map((item) => {
                const isChecked = !!checklistFotos[item.id];
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.checkItemCard,
                      isChecked && styles.checkItemCardActive,
                    ]}
                    onPress={() => toggleChecklistFoto(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkboxBox,
                      isChecked && styles.checkboxBoxActive,
                    ]}>
                      {isChecked ? (
                        <Ionicons name="checkmark" size={18} color="#ffffff" />
                      ) : (
                        <MaterialCommunityIcons name={item.icono} size={18} color="#888" />
                      )}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={[
                        styles.checkItemTitle,
                        isChecked && styles.checkItemTitleActive,
                      ]}>
                        {item.titulo}
                      </Text>
                      <Text style={styles.checkItemDesc}>{item.descripcion}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Botón para reiniciar checklist */}
              {totalChecklist > 0 && (
                <TouchableOpacity
                  style={styles.reiniciarBtn}
                  onPress={handleReiniciarChecklist}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh" size={16} color="#666" />
                  <Text style={styles.reiniciarBtnText}>Reiniciar Checklist</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

         
          {tabMkt === 'etiquetas' && (
            <View>
              <View style={styles.interactiveHeaderCard}>
                <View style={styles.interactiveHeaderIconBox}>
                  <MaterialCommunityIcons name="tag-heart" size={26} color={PURPLE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.interactiveCardTitle}>Etiquetas con Alma</Text>
                  <Text style={styles.interactiveCardDesc}>
                    Una etiqueta no es solo un precio: cuenta quién eres y cuánto amor invertiste. Selecciona un producto:
                  </Text>
                </View>
              </View>

              {/* Selector de Producto */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.etiquetasPillsRow}
              >
                {EJEMPLOS_ETIQUETAS.map((ej) => {
                  const isActive = etiquetaActiva === ej.id;
                  return (
                    <TouchableOpacity
                      key={ej.id}
                      style={[
                        styles.etiquetaPill,
                        isActive && {
                          backgroundColor: ej.colorBadgeActivo,
                          borderColor: ej.colorBorde,
                        },
                      ]}
                      onPress={() => setEtiquetaActiva(ej.id)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.etiquetaPillText,
                          isActive && styles.etiquetaPillTextActivo,
                        ]}
                      >
                        {ej.nombreTab}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Simulación Gráfica de Etiqueta con Colores Temáticos */}
              <View
                style={[
                  styles.kraftTagContainer,
                  {
                    backgroundColor: etiquetaSeleccionada.colorFondo,
                    borderColor: etiquetaSeleccionada.colorBorde,
                  },
                ]}
              >
                {/* Agujero y cuerda simulada */}
                <View
                  style={[
                    styles.kraftHole,
                    {
                      borderColor: etiquetaSeleccionada.colorBorde,
                      backgroundColor: etiquetaSeleccionada.colorCitaFondo,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.kraftStitchLine,
                    { borderBottomColor: etiquetaSeleccionada.colorBorde },
                  ]}
                />

                <Text style={[styles.kraftCoopTitle, { color: etiquetaSeleccionada.colorTitulo }]}>
                  RED DE MUJERES COOPERATIVISTAS
                </Text>
                <Text style={[styles.kraftProductTitle, { color: etiquetaSeleccionada.colorTexto }]}>
                  {etiquetaSeleccionada.producto}
                </Text>

                <View
                  style={[
                    styles.kraftDivider,
                    { backgroundColor: etiquetaSeleccionada.colorBorde + '40' },
                  ]}
                />

                <View style={styles.kraftRow}>
                  <Text style={[styles.kraftDataText, { color: etiquetaSeleccionada.colorTexto }]}>
                    <Text style={{ fontWeight: '700' }}>Creadora: </Text>
                    {etiquetaSeleccionada.artesana}
                  </Text>
                </View>

                <View style={styles.kraftRow}>
                  <Text style={[styles.kraftDataText, { color: etiquetaSeleccionada.colorTexto }]}>
                    <Text style={{ fontWeight: '700' }}>Origen: </Text>
                    {etiquetaSeleccionada.comunidad}
                  </Text>
                </View>

                <View style={styles.kraftRow}>
                  <Text style={[styles.kraftDataText, { color: etiquetaSeleccionada.colorTexto }]}>
                    <Text style={{ fontWeight: '700' }}>Dedicación: </Text>
                    {etiquetaSeleccionada.tiempoElaboracion}
                  </Text>
                </View>

                <View style={styles.kraftRow}>
                  <Text style={[styles.kraftDataText, { color: etiquetaSeleccionada.colorTexto }]}>
                    <Text style={{ fontWeight: '700' }}>Técnica: </Text>
                    {etiquetaSeleccionada.tecnica}
                  </Text>
                </View>

                {/* Mensaje de historia y valor */}
                <View
                  style={[
                    styles.kraftQuoteBox,
                    {
                      backgroundColor: etiquetaSeleccionada.colorCitaFondo,
                      borderLeftColor: etiquetaSeleccionada.colorTitulo,
                    },
                  ]}
                >
                  <Text style={[styles.kraftQuoteText, { color: etiquetaSeleccionada.colorTexto }]}>
                    {etiquetaSeleccionada.mensajeHistoria}
                  </Text>
                </View>

                {/* Precio Digno */}
                <View
                  style={[
                    styles.kraftPriceBox,
                    { backgroundColor: etiquetaSeleccionada.colorBotonPrecio },
                  ]}
                >
                  <Text style={styles.kraftPriceLabel}>Precio Justo Sugerido:</Text>
                  <Text style={styles.kraftPriceValue}>{etiquetaSeleccionada.precioSugerido}</Text>
                </View>
              </View>

              {/* Comparativo de Impacto */}
              <View style={styles.comparativaCard}>
                <Text style={styles.comparativaMainTitle}>El Poder de Contar tu Historia</Text>
                <View style={styles.comparativaRow}>
                  <View style={[styles.comparativaBox, { backgroundColor: '#fef2f2', borderColor: '#fca5a5' }]}>
                    <Text style={[styles.comparativaBoxTitle, { color: '#991b1b' }]}> Sin Historia</Text>
                    <Text style={styles.comparativaBoxText}>
                      Solo dice «$850». La clienta cree que es caro y pide descuento porque desconoce las horas de vida invertidas.
                    </Text>
                  </View>

                  <View style={[styles.comparativaBox, { backgroundColor: '#f0fdf4', borderColor: '#86efac' }]}>
                    <Text style={[styles.comparativaBoxTitle, { color: '#166534' }]}> Con Historia</Text>
                    <Text style={styles.comparativaBoxText}>
                      Ve 14 días de paciencia y saberes ancestrales de Oaxaca. Paga con orgullo y recomienda tu cooperativa.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {tabMkt === 'ruta_ventas' && (
            <View>
              <View style={styles.interactiveHeaderCard}>
                <View style={styles.interactiveHeaderIconBox}>
                  <MaterialCommunityIcons name="map-marker-path" size={26} color={PURPLE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.interactiveCardTitle}>Canales de Venta Directa</Text>
                  <Text style={styles.interactiveCardDesc}>
                    Toca cada canal para ver el paso a paso y los secretos para vender sin intermediarios:
                  </Text>
                </View>
              </View>

              {/* Acordeón de Canales de Venta */}
              {RUTAS_VENTA.map((ruta) => {
                const isOpen = acordeonVentas === ruta.id;
                return (
                  <View key={ruta.id} style={styles.rutaCard}>
                    <TouchableOpacity
                      style={styles.rutaHeaderBtn}
                      onPress={() => setAcordeonVentas(isOpen ? null : ruta.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.rutaIconCircle}>
                        <MaterialCommunityIcons name={ruta.icono} size={22} color={PURPLE} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.rutaTitle}>{ruta.titulo}</Text>
                        <Text style={styles.rutaSub}>{ruta.subtitulo}</Text>
                      </View>
                      <View style={styles.dificultadBadge}>
                        <Text style={styles.dificultadBadgeText}>{ruta.dificultad}</Text>
                      </View>
                      <Ionicons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={PURPLE}
                        style={{ marginLeft: 6 }}
                      />
                    </TouchableOpacity>

                    {/* Contenido desplegable */}
                    {isOpen && (
                      <View style={styles.rutaExpandedContent}>
                        <Text style={styles.pasosHeaderTitle}>Paso a paso para empezar:</Text>
                        {ruta.pasos.map((paso, pIdx) => (
                          <View key={pIdx} style={styles.pasoItem}>
                            <View style={styles.pasoNumberCircle}>
                              <Text style={styles.pasoNumberText}>{pIdx + 1}</Text>
                            </View>
                            <Text style={styles.pasoItemText}>{paso}</Text>
                          </View>
                        ))}

                        {/* Secreto de la Red */}
                        <View style={styles.secretoRedBox}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                            <Ionicons name="sparkles" size={15} color="#b45309" />
                            <Text style={styles.secretoRedTitle}>Secreto de la Red</Text>
                          </View>
                          <Text style={styles.secretoRedText}>{ruta.secreto}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

        </ScrollView>
      )}

      
      {subVistaHerramientas === 'ia' && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero IA */}
          <View style={styles.heroBanner}>
            <MaterialCommunityIcons name='robot-outline' size={46} color={PURPLE} />
            <Text style={styles.heroTitle}>Inteligencia Artificial para la Red</Text>
            <Text style={styles.heroSubtitle}>
              Aprende a usar la IA gratuita (ChatGPT o Gemini) como tu asistente personal para crear volantes, redactar textos y hacer crecer tu cooperativa.
            </Text>
          </View>

          
          <View style={styles.iaGuideCard}>
            <View style={styles.iaGuideHeader}>
              <MaterialCommunityIcons name="lightbulb-on" size={24} color={PURPLE} />
              <Text style={styles.iaGuideTitle}>3 Reglas de Oro para usar la IA</Text>
            </View>

            <View style={styles.reglaItem}>
              <Text style={styles.reglaNumero}>1</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.reglaTitulo}>Dale contexto sobre ti</Text>
                <Text style={styles.reglaDesc}>Dile a la IA: «Somos una cooperativa de mujeres oaxaqueñas que elabora...»</Text>
              </View>
            </View>

            <View style={styles.reglaItem}>
              <Text style={styles.reglaNumero}>2</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.reglaTitulo}>Sé muy clara con lo que pides</Text>
                <Text style={styles.reglaDesc}>Pídele exactamente: «Escribe un volante para WhatsApp» o «Dame 3 opciones de mensajes».</Text>
              </View>
            </View>

            <View style={styles.reglaItem}>
              <Text style={styles.reglaNumero}>3</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.reglaTitulo}>Ponle tu toque humano</Text>
                <Text style={styles.reglaDesc}>Revisa siempre el resultado y adáptalo con tus propias palabras y el cariño de tu grupo.</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeader}>
            Banco de Prompts Listos para Copiar ({PROMPTS_IA.length})
          </Text>
          <Text style={styles.sectionSubinfo}>
            Toca el botón morado para copiar o compartir el prompt directamente en WhatsApp o tu aplicación de IA:
          </Text>

          {/* Lista de Prompts Copiables */}
          {PROMPTS_IA.map((prompt) => (
            <View key={prompt.id} style={styles.promptCard}>
              <View style={styles.promptHeader}>
                <View style={styles.promptIconBox}>
                  <MaterialCommunityIcons name={prompt.icono} size={22} color={PURPLE} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.promptCatLabel}>{prompt.categoria}</Text>
                  <Text style={styles.promptTitle}>{prompt.titulo}</Text>
                </View>
              </View>

              <Text style={styles.promptObjetivo}>{prompt.objetivo}</Text>

              {/* Caja con el texto del prompt */}
              <View style={styles.promptTextBox}>
                <Text style={styles.promptContentText}>{prompt.textoPrompt}</Text>
              </View>

              {/* Botón de Copiar / Compartir */}
              <TouchableOpacity
                style={styles.copiarPromptBtn}
                onPress={() => handleCompartirPrompt(prompt)}
                activeOpacity={0.8}
              >
                <Ionicons name="copy-outline" size={18} color="#ffffff" />
                <Text style={styles.copiarPromptBtnText}>Copiar / Compartir Prompt</Text>
              </TouchableOpacity>

              {/* Consejo de uso */}
              <Text style={styles.promptConsejoText}> {prompt.consejo}</Text>
            </View>
          ))}
        </ScrollView>
      )}

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
            {moduloActivo && moduloActivo.slides && (
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
                        {/* Etiqueta / Tag superior con contador */}
                        <View style={styles.slideTagBox}>
                          <Text style={styles.slideTagText}>{slide.tag}</Text>
                          <Text style={styles.slideCounterText}>
                            {sIdx + 1} / {moduloActivo.slides.length}
                          </Text>
                        </View>

                        {/* Icono central temático */}
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

                        {/* Botón especial para descargar Excel (Slide 4 de Costeo y Precio) */}
                        {slide.tieneBotonExcel && (
                          <TouchableOpacity
                            style={styles.descargarExcelBtn}
                            onPress={handleDescargarExcel}
                            activeOpacity={0.8}
                          >
                            <MaterialCommunityIcons name="file-excel-box" size={24} color="#ffffff" />
                            <Text style={styles.descargarExcelBtnText}>
                              Descargar Plantilla de Excel
                            </Text>
                          </TouchableOpacity>
                        )}
                      </ScrollView>
                    </View>
                  ))}
                </ScrollView>

               
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
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },

  scrollContent: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingBottom: 36,
    flexGrow: 1,
  },

  // Hero Banner
  heroBanner: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
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
    marginBottom: 10,
    marginTop: 4,
  },
  sectionSubinfo: {
    fontSize: 12.5,
    color: '#666',
    marginBottom: 12,
    lineHeight: 17,
  },

  // Ficha Card (Lista Principal)
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

 
  cuadraditosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginTop: 4,
  },
  cuadraditoCard: {
    width: '48%',
    minHeight: 145,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#e8daf0',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  cuadraditoIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cuadraditoTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: PURPLE,
    textAlign: 'center',
    lineHeight: 18,
  },
  cuadraditoDesc: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
  },

  //estilos de la sección de Marketing y Promoción
  mktTabsWrapper: {
    height: 48,
    marginBottom: 14,
  },
  mktTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 2,
    height: 46,
  },
  mktTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#e2d3ed',
    height: 40,
    elevation: 2,
  },
  mktTabBtnActivo: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  mktTabBtnText: {
    // Tamaño de letra: Botones de las pestañas superiores (Anti-Regateo, Foto con Celular, etc.)
    fontSize: 14,
    fontWeight: '700',
    color: PURPLE,
  },
  mktTabBtnTextActivo: {
    color: '#ffffff',
  },

  interactiveHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: PURPLE,
    elevation: 2,
  },
  interactiveHeaderIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactiveCardTitle: {
    // Tamaño de letra: Título de la tarjeta informativa morada
    fontSize: 15,
    fontWeight: '800',
    color: PURPLE,
    marginBottom: 2,
  },
  interactiveCardDesc: {
    // Tamaño de letra: Descripción de la tarjeta informativa morada
    fontSize: 14.5,
    color: '#666',
    lineHeight: 16,
  },

  // Simulador Anti-Regateo
  objecionesList: {
    gap: 8,
    marginBottom: 14,
  },
  objecionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#eee',
    elevation: 1,
  },
  objecionBtnActivo: {
    borderColor: PURPLE,
    backgroundColor: '#fbf7fc',
  },
  objecionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objecionBtnText: {
    flex: 1,
    // Tamaño de letra: Frases y preguntas del cliente en Anti-Regateo
    fontSize: 14,
    color: '#444',
    lineHeight: 17,
  },
  objecionBtnTextActivo: {
    fontWeight: '700',
    color: PURPLE,
  },

  respuestaDignaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#e8daf0',
  },
  respuestaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  respuestaTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  respuestaTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: PURPLE,
  },
  respuestaGuiaLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  speechBubble: {
    backgroundColor: '#faf6fd',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e3d2f0',
    padding: 14,
    marginBottom: 12,
  },
  speechBubbleText: {
    // Tamaño de letra: Respuesta sugerida dentro de la burbuja morada
    fontSize: 14.5,
    color: '#2d1338',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  copiarRespuestaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  copiarRespuestaBtnText: {
    color: '#ffffff',
    // Tamaño de letra: Botón "Copiar respuesta"
    fontSize: 13,
    fontWeight: '700',
  },
  explicacionBox: {
    backgroundColor: '#fffdfa',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fae8b4',
  },
  explicacionTitle: {
    // Tamaño de letra: Título "¿Por qué funciona?" o tip
    fontSize: 13,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 2,
  },
  explicacionText: {
    // Tamaño de letra: Texto de explicación del tip
    fontSize: 14,
    color: '#78350f',
    lineHeight: 17,
  },

  // Checklist de la foto
  scoreBarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  scoreBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreNumberText: {
    // Tamaño de letra: Número del contador 
    fontSize: 16,
    fontWeight: '800',
    color: PURPLE,
  },
  scoreStatusPill: {
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreStatusText: {
    // Tamaño de letra: Etiqueta de estado 
    fontSize: 12.5,
    fontWeight: '700',
    color: PURPLE,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#ede3f3',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: PURPLE,
    borderRadius: 5,
  },
  felicitacionText: {
    // Tamaño de letra: Mensaje verde de éxito al completar el checklist
    fontSize: 14,
    color: '#166534',
    fontWeight: '700',
    marginTop: 8,
    lineHeight: 16,
  },
  checkItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#eee',
    elevation: 1,
  },
  checkItemCardActive: {
    borderColor: '#a855f7',
    backgroundColor: '#fbf7fd',
  },
  checkboxBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: PURPLE,
  },
  checkItemTitle: {
    // Tamaño de letra: Título de cada requisito para la foto
    fontSize: 14.5,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  checkItemTitleActive: {
    color: PURPLE,
  },
  checkItemDesc: {
    // Tamaño de letra: Explicación de cada requisito para la foto
    fontSize: 14,
    color: '#666',
    lineHeight: 16,
  },
  reiniciarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 4,
  },
  reiniciarBtnText: {
    // Tamaño de letra: Botón "Reiniciar checklist"
    fontSize: 13.5,
    color: '#666',
    fontWeight: '600',
  },

  // Etiquetas con historia
  etiquetasPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    height: 44,
  },
  etiquetaPill: {
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  etiquetaPillActiva: {
    backgroundColor: '#8d6e63',
    borderColor: '#6d4c41',
  },
  etiquetaPillText: {
    // Tamaño de letra: Botones de selección de producto (Blusa, Miel, Pan, etc.)
    fontSize: 13.5,
    fontWeight: '700',
    color: '#666',
  },
  etiquetaPillTextActivo: {
    color: '#ffffff',
  },

  kraftTagContainer: {
    backgroundColor: '#f5edd9',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: '#cbb085',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  kraftHole: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e6dac0',
    borderWidth: 2,
    borderColor: '#a38456',
    alignSelf: 'center',
    marginBottom: 10,
  },
  kraftStitchLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbb085',
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  kraftCoopTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8d6e63',
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  kraftProductTitle: {
    // Tamaño de letra: Nombre del producto en la etiqueta de cartón/kraft
    fontSize: 16.5,
    fontWeight: '800',
    color: '#4e342e',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  kraftDivider: {
    height: 1,
    backgroundColor: '#ded0b8',
    marginBottom: 10,
  },
  kraftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  kraftDataText: {
    // Tamaño de letra: Textos de Creadora, Origen, Dedicación y Técnica
    fontSize: 13.5,
    color: '#5d4037',
    flex: 1,
  },
  kraftQuoteBox: {
    backgroundColor: '#ede2c7',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#8d6e63',
  },
  kraftQuoteText: {
    // Tamaño de letra: Frase o historia del producto en la etiqueta
    fontSize: 13.5,
    color: '#4e342e',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  kraftPriceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4e342e',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  kraftPriceLabel: {
    color: '#f5edd9',
    fontSize: 13.5,
    fontWeight: '600',
  },
  kraftPriceValue: {
    color: '#ffffff',
    // Tamaño de letra: Precio sugerido en la etiqueta
    fontSize: 15.5,
    fontWeight: '800',
  },

  comparativaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  comparativaMainTitle: {
    // Tamaño de letra: Título "Etiqueta Común vs Etiqueta con Alma"
    fontSize: 16.5,
    fontWeight: '800',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  comparativaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  comparativaBox: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  comparativaBoxTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    marginBottom: 4,
  },
  comparativaBoxText: {
    // Tamaño de letra: Texto de los ejemplos en la comparativa
    fontSize: 13.5,
    color: '#444',
    lineHeight: 15,
  },

  // Rutas de venta
  rutaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  rutaHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  rutaIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rutaTitle: {
    // Tamaño de letra: Título de los Canales de Venta (WhatsApp, Ferias, etc.)
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  rutaSub: {
    // Tamaño de letra: Subtítulo de cada canal de venta
    fontSize: 15.5,
    color: '#666',
    marginTop: 1,
  },
  dificultadBadge: {
    backgroundColor: '#f3e8fb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  dificultadBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: PURPLE,
  },
  rutaExpandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#faf8fc',
  },
  pasosHeaderTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: PURPLE,
    marginTop: 10,
    marginBottom: 8,
  },
  pasoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  pasoNumberCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  pasoNumberText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  pasoItemText: {
    flex: 1,
    // Tamaño de letra: Texto de los pasos 1, 2 y 3 en la ruta de venta
    fontSize: 15,
    color: '#444',
    lineHeight: 17,
  },
  secretoRedBox: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  secretoRedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b45309', 
  },
  secretoRedText: {
    // Tamaño de letra: Texto del "Secreto de la Red"
    fontSize: 13.5,
    color: '#78350f',
    lineHeight: 16,
  },

  // estilos del apartado de la ia 
  iaGuideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1.5,
    borderColor: '#e8daf0',
  },
  iaGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  iaGuideTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: PURPLE,
  },
  reglaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  reglaNumero: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: PURPLE,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  reglaTitulo: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#222',
  },
  reglaDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 16,
    marginTop: 2,
  },
  promptCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#e8daf0',
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  promptIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LIGHT_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptCatLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: PURPLE,
    textTransform: 'uppercase',
  },
  promptTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#222',
  },
  promptObjetivo: {
    fontSize: 13.5,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  promptTextBox: {
    backgroundColor: '#faf7fc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1bee7',
    padding: 12,
    marginBottom: 12,
  },
  promptContentText: {
    fontSize: 13.5,
    color: '#333',
    lineHeight: 18,
  },
  copiarPromptBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: PURPLE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  copiarPromptBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  promptConsejoText: {
    fontSize: 11.5,
    color: '#777',
    lineHeight: 16,
  },

  // Botón Descargar Excel 
  descargarExcelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1b7a42', 
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  descargarExcelBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
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
    fontSize: 15.5,            //  TAMAÑO DEL TEXTO PRINCIPAL / EXPLICACIÓN
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
    fontSize: 13.5,            //TAMAÑO DEL TEXTO DEL DATO / TESTIMONIO
    color: '#444',
    lineHeight: 19,
    fontStyle: 'italic',
  },

  // Estilos de los puntitos de navegación 
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
