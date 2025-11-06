import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  DollarSign,
  Bell,
  Activity,
  Play,
  RotateCcw,
  Check,
  Trash2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

const colors = {
  primaryOrange: '#FF5733',
  darkBg: '#1a1a1a',
  darkerBg: '#0f0f0f',
  cardBg: '#242424',
  textWhite: '#ffffff',
  textGray: '#a0a0a0',
  borderColor: '#333333',
  successGreen: '#4ade80',
  warningYellow: '#fbbf24',
  dangerRed: '#ef4444'
};

// Datos iniciales
const demandData = [
  { mes: 'Ene', real: 4500, predicho: 4300, ventas: 4200 },
  { mes: 'Feb', real: 5200, predicho: 5100, ventas: 5000 },
  { mes: 'Mar', real: 4800, predicho: 4900, ventas: 4750 },
  { mes: 'Abr', real: 6100, predicho: 6000, ventas: 5900 },
  { mes: 'May', real: 7200, predicho: 7300, ventas: 7100 },
  { mes: 'Jun', real: 8500, predicho: 8400, ventas: 8300 },
  { mes: 'Jul', real: null, predicho: 9200, ventas: null },
  { mes: 'Ago', real: null, predicho: 8800, ventas: null },
];

const stockDataByCategory = {
  'Todas': [
    { categoria: 'Electrónica', cantidad: 245, optimo: 300 },
    { categoria: 'Ropa', cantidad: 580, optimo: 500 },
    { categoria: 'Calzado', cantidad: 320, optimo: 400 },
    { categoria: 'Accesorios', cantidad: 180, optimo: 250 },
    { categoria: 'Hogar', cantidad: 410, optimo: 350 },
  ],
  'Electrónica': [
    { subcategoria: 'Smartphones', cantidad: 120, optimo: 150 },
    { subcategoria: 'Laptops', cantidad: 85, optimo: 100 },
    { subcategoria: 'Tablets', cantidad: 40, optimo: 50 },
  ],
  'Ropa': [
    { subcategoria: 'Camisas', cantidad: 250, optimo: 200 },
    { subcategoria: 'Pantalones', cantidad: 180, optimo: 180 },
    { subcategoria: 'Vestidos', cantidad: 150, optimo: 120 },
  ],
  'Calzado': [
    { subcategoria: 'Deportivo', cantidad: 180, optimo: 220 },
    { subcategoria: 'Formal', cantidad: 90, optimo: 100 },
    { subcategoria: 'Casual', cantidad: 50, optimo: 80 },
  ]
};

const productosDataInitial = [
  { id: 1, nombre: 'iPhone 15 Pro', categoria: 'Electrónica', stock: 12, minimo: 20, prediccion: 35, estado: 'critical', accion: 'Ordenar 25 unidades', ordenGenerada: false, proveedor: 'Apple Inc.', costoUnitario: 1000 },
  { id: 2, nombre: 'Samsung Galaxy S24', categoria: 'Electrónica', stock: 25, minimo: 20, prediccion: 28, estado: 'warning', accion: 'Ordenar 15 unidades', ordenGenerada: false, proveedor: 'Samsung Electronics', costoUnitario: 900 },
  { id: 3, nombre: 'Zapatillas Nike Air', categoria: 'Calzado', stock: 45, minimo: 30, prediccion: 42, estado: 'good', accion: 'Stock óptimo', ordenGenerada: false, proveedor: 'Nike Distribution', costoUnitario: 150 },
  { id: 4, nombre: 'Laptop Dell XPS', categoria: 'Electrónica', stock: 8, minimo: 15, prediccion: 22, estado: 'critical', accion: 'Ordenar 20 unidades', ordenGenerada: false, proveedor: 'Dell Technologies', costoUnitario: 1500 },
  { id: 5, nombre: 'Camisa Polo Ralph', categoria: 'Ropa', stock: 65, minimo: 40, prediccion: 55, estado: 'good', accion: 'Stock óptimo', ordenGenerada: false, proveedor: 'Ralph Lauren Corp', costoUnitario: 80 },
  { id: 6, nombre: 'Reloj Apple Watch', categoria: 'Accesorios', stock: 18, minimo: 25, prediccion: 30, estado: 'warning', accion: 'Ordenar 15 unidades', ordenGenerada: false, proveedor: 'Apple Inc.', costoUnitario: 450 },
];

const ordenesDataInitial = [
  { id: 1, producto: 'iPhone 15 Pro', proveedor: 'Apple Inc.', cantidad: 25, costo: 25000, entrega: '2024-11-10', estado: 'Pendiente', fecha: '2024-11-03' },
  { id: 2, producto: 'Laptop Dell XPS', proveedor: 'Dell Technologies', cantidad: 20, costo: 30000, entrega: '2024-11-12', estado: 'Procesando', fecha: '2024-11-04' },
  { id: 3, producto: 'Samsung Galaxy S24', proveedor: 'Samsung Electronics', cantidad: 15, costo: 15000, entrega: '2024-11-15', estado: 'Pendiente', fecha: '2024-11-05' },
];

function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [demoMode, setDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  // Estados con datos iniciales
  const [productos, setProductos] = useState(productosDataInitial);
  const [ordenes, setOrdenes] = useState(ordenesDataInitial);
  const [inventarioTotal, setInventarioTotal] = useState(1735);
  const [alertasCriticas, setAlertasCriticas] = useState(2);
  const [ordenesAutomaticas, setOrdenesAutomaticas] = useState(12);
  const [ahorro, setAhorro] = useState(45200);

  // Agregar notificación
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Iniciar modo demo
  const startDemo = () => {
    setDemoMode(true);
    setDemoStep(1);
    addNotification('🎬 Modo Demo Iniciado - Stock AI en Acción', 'success');
    
    setTimeout(() => {
      addNotification('⚠️ ALERTA: Stock crítico detectado en productos!', 'warning');
    }, 2000);

    setTimeout(() => {
      addNotification('🤖 IA analizando demanda histórica y tendencias...', 'info');
      setDemoStep(2);
    }, 4000);

    setTimeout(() => {
      addNotification('📊 Predicciones completadas - Recomendaciones listas', 'info');
      setDemoStep(3);
    }, 6000);
  };

  // Generar orden automáticamente
  const generarOrdenAutomatica = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.estado === 'good') return;

    const cantidadOrdenar = Math.max(producto.prediccion - producto.stock, producto.minimo - producto.stock);
    
    const nuevaOrden = {
      id: ordenes.length + 1,
      producto: producto.nombre,
      proveedor: producto.proveedor,
      cantidad: cantidadOrdenar,
      costo: cantidadOrdenar * producto.costoUnitario,
      entrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR'),
      estado: 'Generando...',
      fecha: new Date().toLocaleDateString('es-AR')
    };

    setOrdenes(prev => [nuevaOrden, ...prev]);
    addNotification(`🔄 Generando orden para ${producto.nombre}...`, 'info');

    setTimeout(() => {
      setProductos(prev => prev.map(p => 
        p.id === productoId ? { ...p, ordenGenerada: true, estado: 'good', stock: p.stock + cantidadOrdenar } : p
      ));

      setOrdenes(prev => prev.map(o => 
        o.id === nuevaOrden.id ? { ...o, estado: 'Pendiente' } : o
      ));

      setOrdenesAutomaticas(prev => prev + 1);
      setAlertasCriticas(prev => Math.max(0, prev - 1));
      setInventarioTotal(prev => prev + cantidadOrdenar);
      setAhorro(prev => prev + Math.floor(cantidadOrdenar * 150));

      addNotification(`✅ Orden generada: ${cantidadOrdenar} unidades de ${producto.nombre}`, 'success');
    }, 2000);
  };

  // Simular venta
  const simularVenta = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.stock <= 0) return;

    const cantidadVendida = Math.floor(Math.random() * 5 + 3);
    const nuevoStock = Math.max(0, producto.stock - cantidadVendida);
    const nuevoEstado = nuevoStock < producto.minimo * 0.6 ? 'critical' : 
                       nuevoStock < producto.minimo ? 'warning' : 'good';

    setProductos(prev => prev.map(p => 
      p.id === productoId ? { ...p, stock: nuevoStock, estado: nuevoEstado, ordenGenerada: false } : p
    ));

    setInventarioTotal(prev => prev - cantidadVendida);

    if (nuevoEstado === 'critical' || nuevoEstado === 'warning') {
      addNotification(`⚠️ ${producto.nombre}: Stock bajo (${nuevoStock} unidades)`, 'warning');
      setAlertasCriticas(prev => prev + 1);
    }
    
    addNotification(`🛍️ Venta registrada: ${cantidadVendida} unidades de ${producto.nombre}`, 'info');
  };

  // Eliminar producto
  const eliminarProducto = (productoId) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    setProductos(prev => prev.filter(p => p.id !== productoId));
    addNotification('🗑️ Producto eliminado del inventario', 'info');
  };

  // Eliminar orden
  const eliminarOrden = (ordenId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta orden?')) return;
    setOrdenes(prev => prev.filter(o => o.id !== ordenId));
    addNotification('🗑️ Orden eliminada', 'info');
  };

  // Reset demo
  const resetDemo = () => {
    setDemoMode(false);
    setDemoStep(0);
    setProductos(productosDataInitial);
    setOrdenes(ordenesDataInitial);
    setInventarioTotal(1735);
    setAlertasCriticas(2);
    setOrdenesAutomaticas(12);
    setAhorro(45200);
    addNotification('🔄 Dashboard reiniciado', 'info');
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: colors.darkerBg,
      color: colors.textWhite,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    },
    header: {
      backgroundColor: colors.darkBg,
      padding: 'clamp(0.75rem, 2vw, 1.5rem)',
      borderBottom: `3px solid ${colors.primaryOrange}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      flex: '1 1 auto'
    },
    logo: {
      fontSize: 'clamp(1.5rem, 5vw, 2rem)',
      fontWeight: 'bold',
      color: colors.textWhite,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logoAI: {
      color: colors.primaryOrange
    },
    headerSubtitle: {
      color: colors.textGray,
      fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
      display: 'block'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    demoControls: {
      display: 'flex',
      gap: '0.5rem'
    },
    demoButton: {
      padding: 'clamp(0.4rem, 2vw, 0.6rem) clamp(0.8rem, 3vw, 1.2rem)',
      border: 'none',
      backgroundColor: colors.primaryOrange,
      color: colors.textWhite,
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap'
    },
    liveIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: colors.cardBg,
      padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 2vw, 1rem)',
      borderRadius: '20px',
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)'
    },
    liveDot: {
      width: '8px',
      height: '8px',
      backgroundColor: colors.successGreen,
      borderRadius: '50%',
      animation: 'pulse 2s infinite',
      flexShrink: 0
    },
    container: {
      padding: 'clamp(1rem, 3vw, 2rem)',
      maxWidth: '1600px',
      margin: '0 auto'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
      gap: 'clamp(1rem, 2vw, 1.5rem)',
      marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
    },
    metricCard: {
      backgroundColor: colors.cardBg,
      padding: 'clamp(1rem, 2.5vw, 1.5rem)',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    metricCardHighlight: {
      boxShadow: `0 0 20px ${colors.primaryOrange}`,
      transform: 'scale(1.02)'
    },
    metricHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    metricLabel: {
      color: colors.textGray,
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    metricIcon: {
      color: colors.primaryOrange,
      flexShrink: 0
    },
    metricValue: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    metricChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
      flexWrap: 'wrap'
    },
    positive: {
      color: colors.successGreen
    },
    negative: {
      color: colors.dangerRed
    },
    chartsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
      gap: 'clamp(1rem, 2vw, 1.5rem)',
      marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
    },
    chartCard: {
      backgroundColor: colors.cardBg,
      padding: 'clamp(1rem, 2.5vw, 1.5rem)',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`
    },
    chartCardHighlight: {
      border: `2px solid ${colors.primaryOrange}`
    },
    chartHeader: {
      marginBottom: '1.5rem'
    },
    chartTitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    chartSubtitle: {
      color: colors.textGray,
      fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)'
    },
    categoryButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
      flexWrap: 'wrap'
    },
    categoryButton: {
      padding: '0.4rem 0.8rem',
      border: `1px solid ${colors.borderColor}`,
      backgroundColor: colors.darkerBg,
      color: colors.textGray,
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
      transition: 'all 0.2s'
    },
    categoryButtonActive: {
      backgroundColor: colors.primaryOrange,
      color: colors.textWhite,
      borderColor: colors.primaryOrange
    },
    tableSection: {
      backgroundColor: colors.cardBg,
      padding: 'clamp(1rem, 2.5vw, 1.5rem)',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`,
      marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    sectionTitle: {
      fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
      fontWeight: '600'
    },
    filterTabs: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    filterTab: {
      padding: 'clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.8rem, 2vw, 1rem)',
      border: 'none',
      backgroundColor: colors.darkerBg,
      color: colors.textGray,
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)'
    },
    filterTabActive: {
      backgroundColor: colors.primaryOrange,
      color: colors.textWhite
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '600px'
    },
    th: {
      textAlign: 'left',
      padding: 'clamp(0.6rem, 1.5vw, 1rem)',
      color: colors.textGray,
      fontWeight: '600',
      fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: colors.darkerBg
    },
    td: {
      padding: 'clamp(0.6rem, 1.5vw, 1rem)',
      borderTop: `1px solid ${colors.borderColor}`,
      transition: 'all 0.3s',
      fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)'
    },
    trHighlight: {
      backgroundColor: colors.darkerBg,
      boxShadow: `inset 4px 0 0 ${colors.primaryOrange}`
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      borderRadius: '12px',
      fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
      fontWeight: '600',
      whiteSpace: 'nowrap'
    },
    statusCritical: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: colors.dangerRed
    },
    statusWarning: {
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      color: colors.warningYellow
    },
    statusGood: {
      backgroundColor: 'rgba(74, 222, 128, 0.2)',
      color: colors.successGreen
    },
    actionButton: {
      padding: 'clamp(0.4rem, 1.2vw, 0.5rem) clamp(0.6rem, 1.8vw, 1rem)',
      border: 'none',
      backgroundColor: colors.primaryOrange,
      color: colors.textWhite,
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontWeight: '600',
      fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)',
      marginRight: '0.5rem',
      marginBottom: '0.5rem',
      display: 'inline-block'
    },
    actionButtonSecondary: {
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.primaryOrange}`,
      color: colors.primaryOrange
    },
    actionButtonDanger: {
      backgroundColor: 'transparent',
      border: `1px solid ${colors.dangerRed}`,
      color: colors.dangerRed
    },
    notificationContainer: {
      position: 'fixed',
      top: '100px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: 'min(400px, calc(100vw - 40px))'
    },
    notification: {
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'slideIn 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
    },
    notificationSuccess: {
      borderLeft: `4px solid ${colors.successGreen}`
    },
    notificationWarning: {
      borderLeft: `4px solid ${colors.warningYellow}`
    },
    notificationInfo: {
      borderLeft: `4px solid ${colors.primaryOrange}`
    },
    demoStepIndicator: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: colors.cardBg,
      border: `2px solid ${colors.primaryOrange}`,
      borderRadius: '30px',
      padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 3vw, 2rem)',
      display: demoMode ? 'flex' : 'none',
      alignItems: 'center',
      gap: '1rem',
      zIndex: 1000,
      boxShadow: '0 8px 24px rgba(255, 87, 51, 0.4)',
      maxWidth: 'calc(100vw - 40px)',
      fontSize: 'clamp(0.8rem, 2vw, 1rem)'
    }
  };

  const filteredProducts = productos.filter(p => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'critico') return p.estado === 'critical';
    if (activeTab === 'alerta') return p.estado === 'warning';
    return false;
  });

  const currentStockData = stockDataByCategory[selectedCategory] || stockDataByCategory['Todas'];
  const dataKey = selectedCategory === 'Todas' ? 'categoria' : 'subcategoria';

  return (
    <div style={styles.app}>
      {/* Notificaciones */}
      <div style={styles.notificationContainer}>
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            style={{
              ...styles.notification,
              ...(notif.type === 'success' ? styles.notificationSuccess : 
                  notif.type === 'warning' ? styles.notificationWarning : 
                  styles.notificationInfo)
            }}
          >
            <Bell size={20} color={colors.primaryOrange} />
            <span>{notif.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>
            <Package size={32} />
            STOCK<span style={styles.logoAI}>AI</span>
          </div>
          <span style={styles.headerSubtitle}>Gestión Inteligente de Inventario para Retail</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.demoControls}>
            {!demoMode ? (
              <button style={styles.demoButton} onClick={startDemo}>
                <Play size={16} />
                <span>Iniciar Demo</span>
              </button>
            ) : (
              <button 
                style={{...styles.demoButton, backgroundColor: colors.cardBg, border: `1px solid ${colors.primaryOrange}`}} 
                onClick={resetDemo}
              >
                <RotateCcw size={16} />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
          <div style={styles.liveIndicator}>
            <div style={styles.liveDot}></div>
            <span>En tiempo real</span>
          </div>
          <Bell size={24} color={colors.primaryOrange} style={{cursor: 'pointer', flexShrink: 0}} />
        </div>
      </header>

      <div style={styles.container}>
        {/* Métricas principales */}
        <div style={styles.metricsGrid}>
          <div style={{...styles.metricCard, ...(demoStep === 1 ? styles.metricCardHighlight : {})}}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Inventario Total</span>
              <Package style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>{inventarioTotal.toLocaleString()}</div>
            <div style={{...styles.metricChange, ...styles.positive}}>
              <TrendingUp size={16} />
              <span>+8.2% vs mes anterior</span>
            </div>
          </div>

          <div style={{...styles.metricCard, ...(demoStep === 1 ? styles.metricCardHighlight : {})}}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Alertas Críticas</span>
              <AlertTriangle style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>{alertasCriticas}</div>
            <div style={{...styles.metricChange, ...styles.negative}}>
              <TrendingDown size={16} />
              <span>Requieren acción inmediata</span>
            </div>
          </div>

          <div style={{...styles.metricCard, ...(demoStep === 3 ? styles.metricCardHighlight : {})}}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Órdenes Automáticas</span>
              <ShoppingCart style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>{ordenesAutomaticas}</div>
            <div style={{...styles.metricChange, ...styles.positive}}>
              <Activity size={16} />
              <span>Generadas por IA esta semana</span>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Ahorro Estimado</span>
              <DollarSign style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>${ahorro.toLocaleString()}</div>
            <div style={{...styles.metricChange, ...styles.positive}}>
              <TrendingUp size={16} />
              <span>+15.3% en rentabilidad</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div style={styles.chartsSection}>
          <div style={{...styles.chartCard, ...(demoStep === 2 ? styles.chartCardHighlight : {})}}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Predicción de Demanda con IA</h3>
              <p style={styles.chartSubtitle}>Comparación entre demanda real, predicha y ventas</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.borderColor} />
                <XAxis dataKey="mes" stroke={colors.textGray} style={{fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'}} />
                <YAxis stroke={colors.textGray} style={{fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'}} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '8px',
                    color: colors.textWhite
                  }}
                />
                <Legend wrapperStyle={{fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)'}} />
                <Line type="monotone" dataKey="real" stroke={colors.primaryOrange} strokeWidth={2} name="Demanda Real" />
                <Line type="monotone" dataKey="predicho" stroke={colors.successGreen} strokeWidth={2} strokeDasharray="5 5" name="IA Predicción" />
                <Line type="monotone" dataKey="ventas" stroke={colors.textGray} strokeWidth={2} name="Ventas" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Nivel de Stock por Categoría</h3>
              <p style={styles.chartSubtitle}>Comparación entre stock actual y nivel óptimo</p>
              {/* Botones de categoría - Sugerencia del compañero */}
              <div style={styles.categoryButtons}>
                {Object.keys(stockDataByCategory).map(cat => (
                  <button
                    key={cat}
                    style={{
                      ...styles.categoryButton,
                      ...(selectedCategory === cat ? styles.categoryButtonActive : {})
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentStockData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.borderColor} />
                <XAxis dataKey={dataKey} stroke={colors.textGray} style={{fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'}} />
                <YAxis stroke={colors.textGray} style={{fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'}} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '8px',
                    color: colors.textWhite
                  }}
                />
                <Legend wrapperStyle={{fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)'}} />
                <Bar dataKey="cantidad" fill={colors.primaryOrange} name="Stock Actual" />
                <Bar dataKey="optimo" fill={colors.successGreen} name="Stock Óptimo" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla de productos con alertas */}
        <div style={styles.tableSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Alertas Inteligentes de Reposición</h2>
            <div style={styles.filterTabs}>
              <button 
                style={{...styles.filterTab, ...(activeTab === 'todos' ? styles.filterTabActive : {})}}
                onClick={() => setActiveTab('todos')}
              >
                Todos ({productos.length})
              </button>
              <button 
                style={{...styles.filterTab, ...(activeTab === 'critico' ? styles.filterTabActive : {})}}
                onClick={() => setActiveTab('critico')}
              >
                Crítico ({productos.filter(p => p.estado === 'critical').length})
              </button>
              <button 
                style={{...styles.filterTab, ...(activeTab === 'alerta' ? styles.filterTabActive : {})}}
                onClick={() => setActiveTab('alerta')}
              >
                Advertencia ({productos.filter(p => p.estado === 'warning').length})
              </button>
            </div>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Producto</th>
                  <th style={styles.th}>Categoría</th>
                  <th style={styles.th}>Stock Actual</th>
                  <th style={styles.th}>Stock Mínimo</th>
                  <th style={styles.th}>Predicción IA</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(producto => (
                  <tr key={producto.id} style={producto.ordenGenerada ? styles.trHighlight : {}}>
                    <td style={styles.td}><strong>{producto.nombre}</strong></td>
                    <td style={styles.td}>{producto.categoria}</td>
                    <td style={styles.td}><strong>{producto.stock}</strong></td>
                    <td style={styles.td}>{producto.minimo}</td>
                    <td style={styles.td}><strong>{producto.prediccion}</strong> unidades</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(producto.estado === 'critical' ? styles.statusCritical : 
                            producto.estado === 'warning' ? styles.statusWarning : 
                            styles.statusGood)
                      }}>
                        {producto.ordenGenerada ? '✓ ORDEN GENERADA' :
                         producto.estado === 'critical' ? 'CRÍTICO' : 
                         producto.estado === 'warning' ? 'ALERTA' : 'ÓPTIMO'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {producto.estado !== 'good' && !producto.ordenGenerada && (
                        <>
                          <button 
                            style={styles.actionButton}
                            onClick={() => generarOrdenAutomatica(producto.id)}
                          >
                            {producto.accion}
                          </button>
                          <button 
                            style={{...styles.actionButton, ...styles.actionButtonSecondary}}
                            onClick={() => simularVenta(producto.id)}
                          >
                            Simular Venta
                          </button>
                        </>
                      )}
                      {producto.ordenGenerada && (
                        <span style={{color: colors.successGreen, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <Check size={20} /> Orden procesada
                        </span>
                      )}
                      {producto.estado === 'good' && !producto.ordenGenerada && (
                        <>
                          <span style={{color: colors.successGreen}}>✓ {producto.accion}</span>
                          <button 
                            style={{...styles.actionButton, ...styles.actionButtonSecondary}}
                            onClick={() => simularVenta(producto.id)}
                          >
                            Simular Venta
                          </button>
                        </>
                      )}
                      <button 
                        style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={() => eliminarProducto(producto.id)}
                        title="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Órdenes de compra automatizadas */}
        <div style={styles.tableSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Órdenes de Compra Automatizadas</h2>
            <button style={styles.actionButton} onClick={() => addNotification('➕ Nueva orden manual creada', 'success')}>
              + Nueva Orden Manual
            </button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Producto</th>
                  <th style={styles.th}>Proveedor</th>
                  <th style={styles.th}>Cantidad</th>
                  <th style={styles.th}>Costo Total</th>
                  <th style={styles.th}>Entrega Estimada</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map(orden => (
                  <tr key={orden.id}>
                    <td style={styles.td}>#{orden.id.toString().padStart(4, '0')}</td>
                    <td style={styles.td}><strong>{orden.producto}</strong></td>
                    <td style={styles.td}>{orden.proveedor}</td>
                    <td style={styles.td}><strong>{orden.cantidad}</strong> unidades</td>
                    <td style={styles.td}><strong>${orden.costo.toLocaleString()}</strong></td>
                    <td style={styles.td}>{orden.entrega}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(orden.estado === 'Generando...' ? styles.statusWarning :
                            orden.estado === 'Procesando' ? styles.statusWarning : 
                            styles.statusGood)
                      }}>
                        {orden.estado}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button 
                        style={{...styles.actionButton, ...styles.actionButtonDanger}}
                        onClick={() => eliminarOrden(orden.id)}
                        title="Eliminar orden"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Indicador de pasos del demo */}
      <div style={styles.demoStepIndicator}>
        <Activity size={20} color={colors.primaryOrange} style={{flexShrink: 0}} />
        <span style={{fontWeight: '600'}}>
          {demoStep === 0 && 'Presioná "Iniciar Demo" para comenzar'}
          {demoStep === 1 && '📍 Paso 1: Detección de Stock Crítico'}
          {demoStep === 2 && '📍 Paso 2: IA Analizando Demanda'}
          {demoStep === 3 && '📍 Paso 3: Recomendaciones Listas - ¡Generá órdenes!'}
        </span>
      </div>

      {/* Estilos y animaciones */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* Hover effects - solo en desktop */
        @media (hover: hover) and (pointer: fine) {
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 87, 51, 0.3);
          }
          table tr:hover {
            background-color: ${colors.darkerBg};
          }
        }

        /* Scrollbar personalizado */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${colors.darkerBg};
        }
        ::-webkit-scrollbar-thumb {
          background: ${colors.primaryOrange};
          border-radius: 4px;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          ${styles.headerSubtitle.display = 'none'}
        }
      `}</style>
    </div>
  );
}

export default App;
