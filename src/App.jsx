import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PdfGenerator from './components/PdfGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PdfGenerator/>
    </>
  )
}

export default App
