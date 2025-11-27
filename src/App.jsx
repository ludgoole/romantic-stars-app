import { useState, useEffect } from 'react'
import StarrySky from './components/StarrySky'
import ShootingStars from './components/ShootingStars'
import RomanticText from './components/RomanticText'
import ClickEffect from './components/ClickEffect'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="app">
      <StarrySky />
      <ShootingStars />
      <RomanticText mousePosition={mousePosition} />
      <ClickEffect />
    </div>
  )
}

export default App

