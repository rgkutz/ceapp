import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import ParentForm from "./components/forms/ParentForm"
import ChildForm from "./components/forms/ChildForm"
import AssessmentForm from "./components/forms/AssessmentForm"
import { supabase } from "./lib/supabase"

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <div className="header-content">
            <h1>TEA Data Collection</h1>
            <p>Sistema de recopilación de datos para familias con TEA</p>
            <nav className="main-nav">
              <Link to="/" className="nav-link">📝 Formulario</Link>
              <Link to="/dashboard" className="nav-link">📈 Dashboard</Link>
            </nav>
          </div>
        </header>

        <main className="main-container">
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 TEA Data Collection. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  )
}

// Componente FormPage (renombrado para evitar conflicto)
function FormPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    parent: {},
    child: {},
    assessment: {}
  })
  const [loading, setLoading] = useState(false)

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // 1. Insertar datos del padre
      const { data: parentData, error: parentError } = await supabase
        .from('parents')
        .insert({
          parent_name: formData.parent.name,
          parent_email: formData.parent.email,
          parent_phone: formData.parent.phone,
          city: formData.parent.city,
          country: 'Argentina'
        })
        .select()

      if (parentError) throw parentError

      const parentId = parentData[0].id

      // 2. Insertar datos del niño
      const { data: childData, error: childError } = await supabase
        .from('children')
        .insert({
          parent_id: parentId,
          child_name: formData.child.childName,
          birth_date: formData.child.birthDate,
          gender: formData.child.gender,
          diagnosis_age_months: parseInt(formData.child.diagnosisAge) || null,
          diagnosis_type: formData.child.teaLavel,
          verbal_communication: formData.assessment.usesAAC === 'no',
          uses_aac_device: formData.assessment.usesAAC === 'si'
        })
        .select()

      if (childError) throw childError

      const childId = childData[0].id

      // 3. Insertar evaluación
      const { error: assessmentError } = await supabase
        .from('assessments')
        .insert({
          child_id: childId,
          communication_skills: formData.assessment.communication,
          social_interaction: formData.assessment.social,
          repetitive_behaviors: formData.assessment.repetitive,
          sensory_processing: formData.assessment.sensory,
          strengths: formData.assessment.strengths,
          challenges: formData.assessment.challenges
        })

      if (assessmentError) throw assessmentError

      setStep(4) // Mostrar pantalla de éxito
      
    } catch (error) {
      console.error('Error guardando datos:', error)
      alert('Error al guardar los datos: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      {/* Barra de progreso */}
      <div className="progress-bar">
        <div className="step-indicator">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-label ${step >= 1 ? 'active' : ''}`}>Padres</div>
        </div>
        <div className="step-indicator">
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-label ${step >= 2 ? 'active' : ''}`}>Niño/a</div>
        </div>
        <div className="step-indicator">
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className={`step-label ${step >= 3 ? 'active' : ''}`}>Evaluación</div>
        </div>
      </div>

      <div className="form-content">
        <h2 className="form-title">📊 Formulario TEA</h2>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-icon">⏳</div>
            <p>Guardando datos en la base de datos...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <ParentForm 
                data={formData.parent}
                updateData={(data) => updateFormData("parent", data)}
                nextStep={nextStep}
              />
            )}

            {step === 2 && (
              <ChildForm 
                data={formData.child}
                updateData={(data) => updateFormData("child", data)}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}

            {step === 3 && (
              <AssessmentForm 
                data={formData.assessment}
                updateData={(data) => updateFormData("assessment", data)}
                prevStep={prevStep}
                onSubmit={handleSubmit}
              />
            )}

            {step === 4 && (
              <div className="success-container">
                <div className="success-icon">✅</div>
                <h2>¡Formulario Completado!</h2>
                <p>Los datos se han guardado correctamente en la base de datos.</p>
                <div className="success-actions">
                  <button 
                    onClick={() => {
                      setStep(1)
                      setFormData({ parent: {}, child: {}, assessment: {} })
                    }}
                    className="btn btn-primary"
                  >
                    Enviar otro formulario
                  </button>
                  <Link to="/dashboard" className="btn btn-secondary">
                    Ver Dashboard
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App