import React, { useState } from "react"

const AssessmentForm = ({ data, updateData, prevStep, onSubmit }) => {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    updateData(newData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  const RatingScale = ({ label, value, onChange }) => (
    <div className="form-group">
      <label>{label} (1-5):</label>
      <div className="radio-group">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="radio-option">
            <input
              type="radio"
              name={label}
              value={num}
              checked={value === num}
              onChange={(e) => onChange(parseInt(e.target.value))}
            />
            <div className="radio-label">{num}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#666", marginTop: "5px" }}>
        <span>Bajo</span>
        <span>Alto</span>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{marginBottom: '2rem', color: '#1976d2'}}>Evaluación de Habilidades</h3>
      
      <RatingScale
        label="Comunicación"
        value={formData.communication}
        onChange={(value) => handleChange("communication", value)}
      />

      <RatingScale
        label="Interacción Social"
        value={formData.social}
        onChange={(value) => handleChange("social", value)}
      />

      <RatingScale
        label="Conductas Repetitivas"
        value={formData.repetitive}
        onChange={(value) => handleChange("repetitive", value)}
      />

      <RatingScale
        label="Procesamiento Sensorial"
        value={formData.sensory}
        onChange={(value) => handleChange("sensory", value)}
      />

      <div className="form-group">
        <label>¿Usa algún dispositivo de comunicación?</label>
        <select
          className="form-control"
          value={formData.usesAAC || ""}
          onChange={(e) => handleChange("usesAAC", e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
          <option value="a_veces">A veces</option>
        </select>
      </div>

      <div className="form-group">
        <label>Principales fortalezas:</label>
        <textarea
          className="form-control"
          value={formData.strengths || ""}
          onChange={(e) => handleChange("strengths", e.target.value)}
          rows="3"
          placeholder="Describa las principales fortalezas del niño/niña..."
        />
      </div>

      <div className="form-group">
        <label>Desafíos principales:</label>
        <textarea
          className="form-control"
          value={formData.challenges || ""}
          onChange={(e) => handleChange("challenges", e.target.value)}
          rows="3"
          placeholder="Describa los principales desafíos o dificultades..."
        />
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
          className="btn btn-success"
        >
          Enviar Formulario
        </button>
      </div>
    </form>
  )
}

export default AssessmentForm