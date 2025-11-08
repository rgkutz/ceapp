cat > src/pages/FormPage.jsx << 'EOF'
import React, { useState } from 'react'

const FormPage = () => {
  const [step, setStep] = useState(1)

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Formulario TEA - Paso {step}</h1>
      <p>Aquí irá el formulario para recopilar datos</p>
    </div>
  )
}

export default FormPage
EOF