import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import StatsCards from '../components/dashboard/StatsCards'
import Charts from '../components/dashboard/Charts'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalChildren: 0,
    avgDiagnosisAge: 0,
    maleCount: 0,
    femaleCount: 0
  })
  const [chartData, setChartData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Obtener datos de niños
      const { data: children, error: childrenError } = await supabase
        .from('children')
        .select('*')

      if (childrenError) throw childrenError

      // Obtener datos de evaluaciones
      const { data: assessments, error: assessmentsError } = await supabase
        .from('assessments')
        .select('*')

      if (assessmentsError) throw assessmentsError

      // Obtener datos de padres para ciudades
      const { data: parents, error: parentsError } = await supabase
        .from('parents')
        .select('city')

      if (parentsError) throw parentsError

      if (children && children.length > 0) {
        const totalChildren = children.length
        const avgDiagnosisAge = Math.round(
          children.reduce((sum, child) => sum + (child.diagnosis_age_months || 0), 0) / totalChildren
        )
        const maleCount = children.filter(child => child.gender === 'masculino').length
        const femaleCount = children.filter(child => child.gender === 'femenino').length

        setStats({
          totalChildren,
          avgDiagnosisAge,
          maleCount,
          femaleCount
        })

        // Preparar datos para gráficos
        const teaLevelCount = {}
        children.forEach(child => {
          if (child.diagnosis_type && child.diagnosis_type.trim() !== '') {
            const level = child.diagnosis_type.trim()
            teaLevelCount[level] = (teaLevelCount[level] || 0) + 1
          }
        })

        const cityCount = {}
        parents.forEach(parent => {
          if (parent.city && parent.city.trim() !== '') {
            const city = parent.city.trim()
            cityCount[city] = (cityCount[city] || 0) + 1
          }
        })

        setChartData({
          teaLevelData: Object.entries(teaLevelCount).map(([nivel, cantidad]) => ({
            nivel: nivel.charAt(0).toUpperCase() + nivel.slice(1),
            cantidad
          })),
          citiesData: Object.entries(cityCount).map(([ciudad, cantidad]) => ({
            ciudad,
            cantidad
          })).sort((a, b) => b.cantidad - a.cantidad),
          assessmentsData: assessments || []
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-icon">📊</div>
        <p>Cargando datos del dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📈 Dashboard TEA - Datos Recopilados</h1>
        <p>Visualización de datos anónimos y agregados</p>
      </header>

      <main className="dashboard-main">
        <StatsCards stats={stats} />
        <Charts data={chartData} />
        
        <div className="data-info">
          <h3>📋 Resumen de Datos</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Total de registros:</strong> {stats.totalChildren}
            </div>
            <div className="info-item">
              <strong>Edad promedio al diagnóstico:</strong> {stats.avgDiagnosisAge} meses
            </div>
            <div className="info-item">
              <strong>Distribución por género:</strong> {stats.maleCount} niños, {stats.femaleCount} niñas
            </div>
            <div className="info-item">
              <strong>Datos actualizados:</strong> {new Date().toLocaleDateString('es-AR')}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage