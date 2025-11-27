import { useState, useEffect } from 'react'

const ClickEffect = () => {
  const [clicks, setClicks] = useState([])

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      setClicks(prev => [...prev, newClick])
      
      // 3秒后移除效果
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id))
      }, 3000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="click-effects">
      {clicks.map(click => (
        <div
          key={click.id}
          className="click-effect"
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`
          }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * Math.PI / 180
            const distance = 100
            const x = Math.cos(angle) * distance
            const y = Math.sin(angle) * distance
            return (
              <div
                key={i}
                className="sparkle"
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ClickEffect

