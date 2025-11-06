import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  DollarSign,
  Bell,
  Activity
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

// Datos de ejemplo para el dashboard
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

const stockData = [
  { categoria: 'Electrónica', cantidad: 245, optimo: 300 },
  { categoria: 'Ropa', cantidad: 580, optimo: 500 },
  { categoria: 'Calzado', cantidad: 320, optimo: 400 },
  { categoria: 'Accesorios', cantidad: 180, optimo: 250 },
  { categoria: 'Hogar', cantidad: 410, optimo: 350 },
];

const productosData = [
  { id: 1, nombre: 'iPhone 15 Pro', categoria: 'Electrónica', stock: 12, minimo: 20, prediccion: 35, estado: 'critical', accion: 'Ordenar 25 unidades' },
  { id: 2, nombre: 'Samsung Galaxy S24', categoria: 'Electrónica', stock: 25, minimo: 20, prediccion: 28, estado: 'warning', accion: 'Ordenar 15 unidades' },
  { id: 3, nombre: 'Zapatillas Nike Air', categoria: 'Calzado', stock: 45, minimo: 30, prediccion: 42, estado: 'good', accion: 'Stock óptimo' },
  { id: 4, nombre: 'Laptop Dell XPS', categoria: 'Electrónica', stock: 8, minimo: 15, prediccion: 22, estado: 'critical', accion: 'Ordenar 20 unidades' },
  { id: 5, nombre: 'Camisa Polo Ralph', categoria: 'Ropa', stock: 65, minimo: 40, prediccion: 55, estado: 'good', accion: 'Stock óptimo' },
  { id: 6, nombre: 'Reloj Apple Watch', categoria: 'Accesorios', stock: 18, minimo: 25, prediccion: 30, estado: 'warning', accion: 'Ordenar 15 unidades' },
];

const ordenesData = [
  { id: 1, producto: 'iPhone 15 Pro', proveedor: 'Apple Inc.', cantidad: 25, costo: 25000, entrega: '2024-11-10', estado: 'Pendiente' },
  { id: 2, producto: 'Laptop Dell XPS', proveedor: 'Dell Technologies', cantidad: 20, costo: 30000, entrega: '2024-11-12', estado: 'Procesando' },
  { id: 3, producto: 'Samsung Galaxy S24', proveedor: 'Samsung Electronics', cantidad: 15, costo: 15000, entrega: '2024-11-15', estado: 'Pendiente' },
];

function App() {
  const [activeTab, setActiveTab] = useState('todos');

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: colors.darkerBg,
      color: colors.textWhite,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: colors.darkBg,
      padding: '1.5rem 2rem',
      borderBottom: `3px solid ${colors.primaryOrange}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logo: {
      fontSize: '2rem',
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
      fontSize: '0.9rem',
      marginLeft: '1rem'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    liveIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: colors.cardBg,
      padding: '0.5rem 1rem',
      borderRadius: '20px'
    },
    liveDot: {
      width: '8px',
      height: '8px',
      backgroundColor: colors.successGreen,
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    container: {
      padding: '2rem',
      maxWidth: '1600px',
      margin: '0 auto'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    metricCard: {
      backgroundColor: colors.cardBg,
      padding: '1.5rem',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`,
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    metricHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    metricLabel: {
      color: colors.textGray,
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    metricIcon: {
      color: colors.primaryOrange
    },
    metricValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    metricChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      fontSize: '0.85rem'
    },
    positive: {
      color: colors.successGreen
    },
    negative: {
      color: colors.dangerRed
    },
    chartsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    chartCard: {
      backgroundColor: colors.cardBg,
      padding: '1.5rem',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`
    },
    chartHeader: {
      marginBottom: '1.5rem'
    },
    chartTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    chartSubtitle: {
      color: colors.textGray,
      fontSize: '0.85rem'
    },
    tableSection: {
      backgroundColor: colors.cardBg,
      padding: '1.5rem',
      borderRadius: '12px',
      border: `1px solid ${colors.borderColor}`,
      marginBottom: '2rem'
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
      fontSize: '1.3rem',
      fontWeight: '600'
    },
    filterTabs: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    filterTab: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: colors.darkerBg,
      color: colors.textGray,
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '0.9rem'
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
      minWidth: '800px'
    },
    th: {
      textAlign: 'left',
      padding: '1rem',
      color: colors.textGray,
      fontWeight: '600',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      backgroundColor: colors.darkerBg
    },
    td: {
      padding: '1rem',
      borderTop: `1px solid ${colors.borderColor}`
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
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
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: colors.primaryOrange,
      color: colors.textWhite,
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontWeight: '600',
      fontSize: '0.85rem'
    }
  };

  const filteredProducts = productosData.filter(p => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'critico') return p.estado === 'critical';
    if (activeTab === 'alerta') return p.estado === 'warning';
    return false;
  });

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>
            <Package size={32} />
            STOCK<span style={styles.logoAI}>AI</span>
          </div>
          <span style={styles.headerSubtitle}>Gestión Inteligente de Inventario para Retail</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.liveIndicator}>
            <div style={styles.liveDot}></div>
            <span>Dashboard en tiempo real</span>
          </div>
          <Bell size={24} color={colors.primaryOrange} style={{cursor: 'pointer'}} />
        </div>
      </header>

      <div style={styles.container}>
        {/* Métricas principales */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Inventario Total</span>
              <Package style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>1,735</div>
            <div style={{...styles.metricChange, ...styles.positive}}>
              <TrendingUp size={16} />
              <span>+8.2% vs mes anterior</span>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Alertas Críticas</span>
              <AlertTriangle style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>8</div>
            <div style={{...styles.metricChange, ...styles.negative}}>
              <TrendingDown size={16} />
              <span>Requieren acción inmediata</span>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricLabel}>Órdenes Automáticas</span>
              <ShoppingCart style={styles.metricIcon} size={24} />
            </div>
            <div style={styles.metricValue}>12</div>
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
            <div style={styles.metricValue}>$45,200</div>
            <div style={{...styles.metricChange, ...styles.positive}}>
              <TrendingUp size={16} />
              <span>+15.3% en rentabilidad</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div style={styles.chartsSection}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Predicción de Demanda con IA</h3>
              <p style={styles.chartSubtitle}>Comparación entre demanda real, predicha y ventas</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.borderColor} />
                <XAxis dataKey="mes" stroke={colors.textGray} />
                <YAxis stroke={colors.textGray} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '8px',
                    color: colors.textWhite
                  }}
                />
                <Legend />
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
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.borderColor} />
                <XAxis dataKey="categoria" stroke={colors.textGray} />
                <YAxis stroke={colors.textGray} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.borderColor}`,
                    borderRadius: '8px',
                    color: colors.textWhite
                  }}
                />
                <Legend />
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
                Todos ({productosData.length})
              </button>
              <button 
                style={{...styles.filterTab, ...(activeTab === 'critico' ? styles.filterTabActive : {})}}
                onClick={() => setActiveTab('critico')}
              >
                Crítico ({productosData.filter(p => p.estado === 'critical').length})
              </button>
              <button 
                style={{...styles.filterTab, ...(activeTab === 'alerta' ? styles.filterTabActive : {})}}
                onClick={() => setActiveTab('alerta')}
              >
                Advertencia ({productosData.filter(p => p.estado === 'warning').length})
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
                  <th style={styles.th}>Acción Recomendada</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(producto => (
                  <tr key={producto.id}>
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
                        {producto.estado === 'critical' ? 'CRÍTICO' : 
                         producto.estado === 'warning' ? 'ALERTA' : 'ÓPTIMO'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {producto.estado !== 'good' && (
                        <button style={styles.actionButton}>
                          {producto.accion}
                        </button>
                      )}
                      {producto.estado === 'good' && (
                        <span style={{color: colors.successGreen}}>✓ {producto.accion}</span>
                      )}
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
            <button style={styles.actionButton}>+ Nueva Orden Manual</button>
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
                </tr>
              </thead>
              <tbody>
                {ordenesData.map(orden => (
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
                        ...(orden.estado === 'Procesando' ? styles.statusWarning : styles.statusGood)
                      }}>
                        {orden.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
