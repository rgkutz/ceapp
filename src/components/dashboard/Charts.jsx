import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const Charts = ({ data }) => {
  // Si no hay datos reales, mostrar mensaje
  if (!data.teaLevelData || data.teaLevelData.length === 0) {
    return (
      <div className="charts-container">
        <div className="chart-card">
          <h3>📊 Datos Insuficientes</h3>
          <div className="chart-placeholder">
            <p>Se necesitan más registros para mostrar gráficos estadísticos.</p>
            <p>Actualmente hay {data.assessmentsData?.length || 0} evaluaciones registradas.</p>
          </div>
        </div>
      </div>
    )
  }

  // Calcular promedios de habilidades desde datos reales
  const calculateSkillsData = (assessments) => {
    if (!assessments || assessments.length === 0) {
      return [
        { subject: 'Comunicación', A: 0, fullMark: 5 },
        { subject: 'Social', A: 0, fullMark: 5 },
        { subject: 'Sensorial', A: 0, fullMark: 5 },
        { subject: 'Conductas', A: 0, fullMark: 5 }
      ]
    }

    const sums = assessments.reduce((acc, assessment) => ({
      communication: acc.communication + (assessment.communication_skills || 0),
      social: acc.social + (assessment.social_interaction || 0),
      sensory: acc.sensory + (assessment.sensory_processing || 0),
      repetitive: acc.repetitive + (assessment.repetitive_behaviors || 0)
    }), { communication: 0, social: 0, sensory: 0, repetitive: 0 })

    const count = assessments.length
    return [
      { subject: 'Comunicación', A: (sums.communication / count).toFixed(1), fullMark: 5 },
      { subject: 'Social', A: (sums.social / count).toFixed(1), fullMark: 5 },
      { subject: 'Sensorial', A: (sums.sensory / count).toFixed(1), fullMark: 5 },
      { subject: 'Conductas', A: (sums.repetitive / count).toFixed(1), fullMark: 5 }
    ]
  }

  const skillsData = calculateSkillsData(data.assessmentsData)
  const teaLevelData = data.teaLevelData || []
  const citiesData = data.citiesData || []

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>Distribución por Nivel de TEA</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teaLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nivel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#1976d2" name="Niños registrados" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-card">
        <h3>Habilidades por Área (Promedio)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Habilidades" dataKey="A" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-card">
        <h3>Distribución Geográfica</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citiesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="ciudad" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" name="Registros por ciudad" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Charts