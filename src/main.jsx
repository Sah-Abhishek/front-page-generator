import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

{/* <input
                        value={session}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to appear below the image"
                        rows="4"
                        className="mb-4 p-2  min-w-[250px] border border-gray-300 rounded font-bold text-3xl text-center"
                        style={{ width: `${text.length + 1}ch` }}
                    /> */}


                    
              