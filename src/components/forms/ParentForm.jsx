import React, { useState } from "react"

const ParentForm = ({ data, updateData, nextStep }) => {
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
      <h3 style={{marginBottom: '2rem', color: '#1976d2'}}>Datos del Padre/Madre/Tutor</h3>
      
      <div className="form-group">
        <label>Nombre completo:</label>
        <input
          type="text"
          className="form-control"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          placeholder="Ingrese su nombre completo"
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="ejemplo@email.com"
        />
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input
          type="tel"
          className="form-control"
          value={formData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+54 9 11 1234-5678"
        />
      </div>

      <div className="form-group">
        <label>Ciudad:</label>
        <input
          type="text"
          className="form-control"
          value={formData.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Ciudad de residencia"
        />
      </div>

      <div className="button-group">
        <div></div> {/* Espacio vacío para alinear a la derecha */}
        <button type="submit" className="btn btn-primary">
          Siguiente →
        </button>
      </div>
    </form>
  )
}

export default ParentForm