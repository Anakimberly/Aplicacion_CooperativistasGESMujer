import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const PURPLE = '#5b1378';
const LIGHT_PURPLE = '#f3e8fb';
const GREEN = '#27ae60';
const LIGHT_GREEN = '#e8f8f5';

export default function CosteoScreen({ onNavigate }) {
  
  const [activeTab, setActiveTab] = useState('formulario');

  
  const [nombreProducto, setNombreProducto] = useState('');
  const [categoria, setCategoria] = useState('');

  const [materiales, setMateriales] = useState([
    { id: '1', nombre: '', costo: '' },
  ]);

  const [horasTrabajo, setHorasTrabajo] = useState('');
  const [costoHora, setCostoHora] = useState('50');
  const [gastosTransporte, setGastosTransporte] = useState('');
  const [margenGanancia, setMargenGanancia] = useState('30');

  // Lista de productos guardados (simulacion)
  const [productosGuardados, setProductosGuardados] = useState([
    {
      id: '1',
      nombre: 'Blusa bordada a mano',
      categoria: 'Textil',
      materialesCount: 3,
      totalMateriales: 120,
      horas: 4,
      costoHora: 50,
      totalManoObra: 200,
      transporte: 20,
      costoProduccion: 340,
      margen: 30,
      ganancia: 102,
      precioVenta: 442,
      fecha: '21/09/2026',
    },
    {
      id: '2',
      nombre: 'Mermelada artesanal de mango',
      categoria: 'Alimentos',
      materialesCount: 4,
      totalMateriales: 35,
      horas: 2,
      costoHora: 40,
      totalManoObra: 80,
      transporte: 10,
      costoProduccion: 125,
      margen: 40,
      ganancia: 50,
      precioVenta: 175,
      fecha: '20/09/2026',
    },
  ]);

  // Funciones para materiales
  const handleMaterialChange = (id, field, value) => {
    setMateriales((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAgregarMaterial = () => {
    setMateriales((prev) => [
      ...prev,
      { id: Date.now().toString(), nombre: '', costo: '' },
    ]);
  };

  const handleEliminarMaterial = (id) => {
    if (materiales.length === 1) {
      Alert.alert('Atención', 'Debes incluir al menos un material.');
      return;
    }
    setMateriales((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculos
  const totalMateriales = materiales.reduce((sum, item) => {
    const val = parseFloat(item.costo);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  const horas = parseFloat(horasTrabajo) || 0;
  const precioHora = parseFloat(costoHora) || 0;
  const totalManoObra = horas * precioHora;

  const transporte = parseFloat(gastosTransporte) || 0;
  const costoProduccionTotal = totalMateriales + totalManoObra + transporte;

  const porcentajeMargen = parseFloat(margenGanancia) || 0;
  const montoGanancia = costoProduccionTotal * (porcentajeMargen / 100);
  const precioVentaRecomendado = costoProduccionTotal + montoGanancia;

  // Guardar nuevo producto
  const handleGuardar = () => {
    if (!nombreProducto.trim()) {
      Alert.alert('Campo incompleto', 'Por favor ingresa el nombre del producto.');
      return;
    }
    if (costoProduccionTotal === 0) {
      Alert.alert('Faltan datos', 'Por favor ingresa los costos de materiales o tiempo de trabajo.');
      return;
    }

    const nuevoProd = {
      id: Date.now().toString(),
      nombre: nombreProducto,
      categoria: categoria || 'General',
      materialesCount: materiales.filter((m) => m.nombre).length || 1,
      totalMateriales,
      horas,
      costoHora: precioHora,
      totalManoObra,
      transporte,
      costoProduccion: costoProduccionTotal,
      margen: porcentajeMargen,
      ganancia: montoGanancia,
      precioVenta: precioVentaRecomendado,
      fecha: new Date().toLocaleDateString('es-MX'),
    };

    setProductosGuardados((prev) => [nuevoProd, ...prev]);

    Alert.alert(
      '¡Producto Guardado!',
      `El producto "${nombreProducto}" se guardó en tu lista de costeos con un precio sugerido de $${precioVentaRecomendado.toFixed(2)}.`,
      [
        {
          text: 'Ver Lista de Productos',
          onPress: () => {
            // Limpiar formulario y cambiar a pestaña de guardados
            setNombreProducto('');
            setCategoria('');
            setMateriales([{ id: '1', nombre: '', costo: '' }]);
            setHorasTrabajo('');
            setGastosTransporte('');
            setActiveTab('guardados');
          },
        },
      ]
    );
  };

  const handleEliminarProducto = (id, nombre) => {
    Alert.alert(
      'Eliminar Producto',
      `¿Estás segura de eliminar "${nombre}" de tu lista?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setProductosGuardados((prev) => prev.filter((p) => p.id !== id));
          },
        },
      ]
    );
  };

  const handleVerDetalle = (prod) => {
    Alert.alert(
      ` ${prod.nombre}`,
      `• Categoría: ${prod.categoria}\n` +
      `• Materiales: $${prod.totalMateriales.toFixed(2)}\n` +
      `• Mano de Obra (${prod.horas} hrs): $${prod.totalManoObra.toFixed(2)}\n` +
      `• Fletes / Empaque: $${prod.transporte.toFixed(2)}\n` +
      `-----------------------------\n` +
      `• Costo Producción: $${prod.costoProduccion.toFixed(2)}\n` +
      `• Ganancia (${prod.margen}%): +$${prod.ganancia.toFixed(2)}\n` +
      ` PRECIO FINAL: $${prod.precioVenta.toFixed(2)}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={PURPLE} />

      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')} style={styles.backBtn}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Costeo y Productos</Text>
        <View style={{ width: 36 }} />
      </View>

     
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'formulario' && styles.tabButtonActive]}
          onPress={() => setActiveTab('formulario')}
        >
          <Ionicons
            name='calculator-outline'
            size={18}
            color={activeTab === 'formulario' ? PURPLE : '#666'}
          />
          <Text style={[styles.tabText, activeTab === 'formulario' && styles.tabTextActive]}>
            Nuevo Costeo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'guardados' && styles.tabButtonActive]}
          onPress={() => setActiveTab('guardados')}
        >
          <Ionicons
            name='archive-outline'
            size={18}
            color={activeTab === 'guardados' ? PURPLE : '#666'}
          />
          <Text style={[styles.tabText, activeTab === 'guardados' && styles.tabTextActive]}>
            Guardados ({productosGuardados.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── CONTENIDO ── */}
      {activeTab === 'formulario' ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            {/* 1. Datos del Producto */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name='package-variant-closed' size={22} color={PURPLE} />
                <Text style={styles.sectionTitle}>1. Datos del Producto</Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Nombre del producto</Text>
                <TextInput
                  style={styles.input}
                  value={nombreProducto}
                  onChangeText={setNombreProducto}
                  placeholder='Ej: Blusa bordada tradicional'
                  placeholderTextColor='#bbb'
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Categoría / Tipo</Text>
                <TextInput
                  style={styles.input}
                  value={categoria}
                  onChangeText={setCategoria}
                  placeholder='Ej: Textil, Alimentos, Alfarería...'
                  placeholderTextColor='#bbb'
                />
              </View>
            </View>

            {/* 2. Materiales */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name='needle' size={22} color={PURPLE} />
                <Text style={styles.sectionTitle}>2. Materiales e Insumos</Text>
              </View>

              {materiales.map((item, index) => (
                <View key={item.id} style={styles.materialRow}>
                  <View style={{ flex: 2, marginRight: 8 }}>
                    <Text style={styles.subLabel}>Material {index + 1}</Text>
                    <TextInput
                      style={styles.input}
                      value={item.nombre}
                      onChangeText={(val) => handleMaterialChange(item.id, 'nombre', val)}
                      placeholder='Ej: Hilo, Tela...'
                      placeholderTextColor='#bbb'
                    />
                  </View>

                  <View style={{ flex: 1, marginRight: 6 }}>
                    <Text style={styles.subLabel}>Costo ($)</Text>
                    <TextInput
                      style={styles.input}
                      value={item.costo}
                      onChangeText={(val) => handleMaterialChange(item.id, 'costo', val)}
                      keyboardType='numeric'
                      placeholder='0.00'
                      placeholderTextColor='#bbb'
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={() => handleEliminarMaterial(item.id)}
                  >
                    <Ionicons name='trash-outline' size={20} color='#e74c3c' />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity style={styles.btnAgregar} onPress={handleAgregarMaterial}>
                <Ionicons name='add-circle-outline' size={18} color={PURPLE} />
                <Text style={styles.btnAgregarText}>Agregar otro material</Text>
              </TouchableOpacity>

              <View style={styles.subtotalBox}>
                <Text style={styles.subtotalText}>Subtotal Materiales:</Text>
                <Text style={styles.subtotalValue}>${totalMateriales.toFixed(2)}</Text>
              </View>
            </View>

            {/* 3. Mano de Obra */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name='time-outline' size={22} color={PURPLE} />
                <Text style={styles.sectionTitle}>3. Tiempo de Trabajo (Mano de obra)</Text>
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.label}>Horas trabajadas</Text>
                  <TextInput
                    style={styles.input}
                    value={horasTrabajo}
                    onChangeText={setHorasTrabajo}
                    keyboardType='numeric'
                    placeholder='Ej: 6'
                    placeholderTextColor='#bbb'
                  />
                </View>

                <View style={styles.col}>
                  <Text style={styles.label}>Pago x hora ($)</Text>
                  <TextInput
                    style={styles.input}
                    value={costoHora}
                    onChangeText={setCostoHora}
                    keyboardType='numeric'
                    placeholder='Ej: 50'
                    placeholderTextColor='#bbb'
                  />
                </View>
              </View>

              <View style={styles.subtotalBox}>
                <Text style={styles.subtotalText}>Subtotal Mano de Obra:</Text>
                <Text style={styles.subtotalValue}>${totalManoObra.toFixed(2)}</Text>
              </View>
            </View>

            {/* 4. Gastos Extra y Ganancia */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name='calculator' size={22} color={PURPLE} />
                <Text style={styles.sectionTitle}>4. Gastos Extra y Ganancia</Text>
              </View>

              <View style={styles.rowTwoCols}>
                <View style={styles.col}>
                  <Text style={styles.label}>Fletes / Empaque ($)</Text>
                  <TextInput
                    style={styles.input}
                    value={gastosTransporte}
                    onChangeText={setGastosTransporte}
                    keyboardType='numeric'
                    placeholder='Ej: 20'
                    placeholderTextColor='#bbb'
                  />
                </View>

                <View style={styles.col}>
                  <Text style={styles.label}>% Ganancia deseada</Text>
                  <TextInput
                    style={styles.input}
                    value={margenGanancia}
                    onChangeText={setMargenGanancia}
                    keyboardType='numeric'
                    placeholder='Ej: 30'
                    placeholderTextColor='#bbb'
                  />
                </View>
              </View>
            </View>

            {/* Resumen Final */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}> Resumen de Costeo</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Materiales:</Text>
                <Text style={styles.summaryVal}>${totalMateriales.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Mano de Obra:</Text>
                <Text style={styles.summaryVal}>${totalManoObra.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Gastos Varios:</Text>
                <Text style={styles.summaryVal}>${transporte.toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabelBold}>Costo Real de Producción:</Text>
                <Text style={styles.summaryValBold}>${costoProduccionTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabelBold}>Ganancia ({porcentajeMargen}%):</Text>
                <Text style={styles.summaryValBold}>+${montoGanancia.toFixed(2)}</Text>
              </View>

              <View style={styles.priceBanner}>
                <Text style={styles.priceBannerTitle}>PRECIO DE VENTA RECOMENDADO</Text>
                <Text style={styles.priceBannerAmount}>${precioVentaRecomendado.toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
                <Text style={styles.btnGuardarText}>Guardar Producto y Costeo</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        /* ── PESTAÑA: PRODUCTOS GUARDADOS ── */
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {productosGuardados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name='package-variant' size={60} color='#ccc' />
              <Text style={styles.emptyTitle}>Sin productos costeados aún</Text>
              <Text style={styles.emptySub}>
                Ingresa a la pestaña "Nuevo Costeo" para calcular el precio de tus productos.
              </Text>
              <TouchableOpacity
                style={styles.btnIrForm}
                onPress={() => setActiveTab('formulario')}
              >
                <Text style={styles.btnIrFormText}>+ Crear primer costeo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            productosGuardados.map((prod) => (
              <View key={prod.id} style={styles.prodCard}>
                <View style={styles.prodCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.prodNombre}>{prod.nombre}</Text>
                    <Text style={styles.prodMeta}>
                      {prod.categoria} • {prod.fecha}
                    </Text>
                  </View>

                  <View style={styles.priceBadge}>
                    <Text style={styles.priceBadgeLabel}>Venta</Text>
                    <Text style={styles.priceBadgeText}>
                      ${prod.precioVenta.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.prodMetrics}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Costo Prod.</Text>
                    <Text style={styles.metricValue}>
                      ${prod.costoProduccion.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.metricDivider} />

                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Mano de obra</Text>
                    <Text style={styles.metricValue}>{prod.horas} hrs</Text>
                  </View>

                  <View style={styles.metricDivider} />

                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Ganancia</Text>
                    <Text style={styles.metricValueGreen}>
                      +${prod.ganancia.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.prodActions}>
                  <TouchableOpacity
                    style={styles.btnDetalle}
                    onPress={() => handleVerDetalle(prod)}
                  >
                    <Ionicons name='eye-outline' size={16} color={PURPLE} />
                    <Text style={styles.btnDetalleText}>Ver Desglose</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnBorrarProd}
                    onPress={() => handleEliminarProducto(prod.id, prod.nombre)}
                  >
                    <Ionicons name='trash-outline' size={16} color='#e74c3c' />
                    <Text style={styles.btnBorrarProdText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
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

  // Pestañas
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  tabText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: PURPLE,
    fontWeight: '700',
  },

  scrollContent: { padding: 16, paddingBottom: 30 },

  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: PURPLE,
  },

  fieldGroup: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 5 },
  subLabel: { fontSize: 12, color: '#777', marginBottom: 4 },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14.5,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },

  materialRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  btnEliminar: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAgregar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  btnAgregarText: {
    color: PURPLE,
    fontWeight: '600',
    fontSize: 14,
  },

  subtotalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: LIGHT_PURPLE,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  subtotalText: { fontSize: 13.5, fontWeight: '600', color: PURPLE },
  subtotalValue: { fontSize: 15, fontWeight: '700', color: PURPLE },

  rowTwoCols: {
    flexDirection: 'row',
    gap: 12,
  },
  col: { flex: 1 },

  
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    borderWidth: 2,
    borderColor: PURPLE,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryVal: { fontSize: 14, fontWeight: '600', color: '#333' },
  summaryLabelBold: { fontSize: 14.5, fontWeight: '700', color: '#333' },
  summaryValBold: { fontSize: 14.5, fontWeight: '700', color: PURPLE },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  priceBanner: {
    backgroundColor: LIGHT_GREEN,
    borderWidth: 1.5,
    borderColor: GREEN,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 16,
  },
  priceBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: GREEN,
    letterSpacing: 0.5,
  },
  priceBannerAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: GREEN,
    marginTop: 2,
  },

  btnGuardar: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnGuardarText: { color: 'white', fontSize: 16, fontWeight: '700' },

  // Tarjetas de productos guardados
  prodCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: PURPLE,
  },
  prodCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  prodNombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  prodMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  priceBadge: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GREEN,
  },
  priceBadgeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: GREEN,
    textTransform: 'uppercase',
  },
  priceBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    color: GREEN,
  },

  prodMetrics: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#777',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  metricValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: GREEN,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#ddd',
  },

  prodActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btnDetalle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_PURPLE,
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
  },
  btnDetalleText: {
    fontSize: 13,
    fontWeight: '600',
    color: PURPLE,
  },
  btnBorrarProd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdf2f2',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 4,
  },
  btnBorrarProdText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e74c3c',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#555',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13.5,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  btnIrForm: {
    backgroundColor: PURPLE,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnIrFormText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});
