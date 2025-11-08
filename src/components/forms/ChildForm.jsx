import React, { useState } from "react"

const ChildForm = ({ data, updateData, nextStep, prevStep }) => {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    updateData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{marginBottom: '2rem', color: '#1976d2'}}>Datos del Niño/Niña con TEA</h3>
      
      <div className="form-group">
        <label>Nombre del niño/niña:</label>
        <input
          type="text"
          className="form-control"
          value={formData.childName || ""}
          onChange={(e) => handleChange("childName", e.target.value)}
          required
          placeholder="Nombre completo del niño/niña"
        />
      </div>

      <div className="form-group">
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          className="form-control"
          value={formData.birthDate || ""}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Género:</label>
        <select
          className="form-control"
          value={formData.gender || ""}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div className="form-group">
        <label>Edad al diagnóstico (meses):</label>
        <input
          type="number"
          className="form-control"
          value={formData.diagnosisAge || ""}
          onChange={(e) => handleChange("diagnosisAge", e.target.value)}
          placeholder="Ej: 36"
          min="0"
          max="200"
        />
      </div>

      <div className="form-group">
        <label>Nivel de TEA:</label>
        <select
          className="form-control"
          value={formData.teaLavel || ""}
          onChange={(e) => handleChange("teaLavel", e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="nivel1">Nivel 1 (Necesita apoyo)</option>
          <option value="nivel2">Nivel 2 (Necesita apoyo sustancial)</option>
          <option value="nivel3">Nivel 3 (Necesita apoyo muy sustancial)</option>
        </select>
      </div>

      <div className="button-group">
        <button 
          type="button"
          onClick={prevStep}
          className="btn btn-secondary"
        >
          ← Anterior
        </button>
        
        <button 
          type="submit"
          className="btn btn-primary"
        >
          Siguiente →
        </button>
      </div>
    </form>
  )
}

export default ChildForm