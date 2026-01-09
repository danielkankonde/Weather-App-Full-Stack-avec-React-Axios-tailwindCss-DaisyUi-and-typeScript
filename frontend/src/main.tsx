import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Forecast from './pages/Forecast.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<Forecast />} />
      </Routes>
  </BrowserRouter>
)
