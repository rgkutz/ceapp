import React from 'react'

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{stats.totalChildren}</div>
        <div className="stat-label">Niños Registrados</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.avgDiagnosisAge}</div>
        <div className="stat-label">Edad Promedio Diagnóstico (meses)</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.maleCount}</div>
        <div className="stat-label">Niños</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.femaleCount}</div>
        <div className="stat-label">Niñas</div>
      </div>
    </div>
  )
}

export default StatsCards
