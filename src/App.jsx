import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PdfGenerator from './components/PdfGenerator'
import PdfGenerator2 from './components/PdfGenerator2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PdfGenerator2/>
    </>
  )
}

export default App
