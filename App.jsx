echo 'import React, { useState } from "react"
import ParentForm from "./components/forms/ParentForm"

function App() {
  const [formData, setFormData] = useState({
    parent: {},
    child: {},
    assessment: {}
  })

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
        <h1 style={{ textAlign: "center", color: "#1976d2", marginBottom: "30px" }}>
          📊 Formulario TEA
        </h1>
        
        <ParentForm 
          data={formData.parent}
          updateData={(data) => updateFormData("parent", data)}
          nextStep={() => alert("Próximo paso: datos del niño")}
        />
      </div>
    </div>
  )
}

export default App' > src/App.jsx