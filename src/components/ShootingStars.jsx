import { useEffect, useState } from 'react'

const ShootingStars = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const createShootingStar = () => {
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight * 0.3
      const length = Math.random() * 100 + 50
      const duration = Math.random() * 2000 + 1000
      const delay = Math.random() * 3000

      return {
        id: Date.now() + Math.random(),
        startX,
        startY,
        length,
        duration,
        delay,
        angle: Math.random() * Math.PI * 0.5 + Math.PI * 0.25
      }
    }

    const addStar = () => {
      setStars(prev => [...prev, createShootingStar()])
    }

    // 初始创建几颗流星
    for (let i = 0; i < 3; i++) {
      setTimeout(addStar, i * 2000)
    }

    // 定期创建新流星
    const interval = setInterval(addStar, 4000)

    return () => clearInterval(interval)
  }, [])

  const removeStar = (id) => {
    setStars(prev => prev.filter(star => star.id !== id))
  }

  return (
    <div className="shooting-stars">
      {stars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.startX}px`,
            top: `${star.startY}px`,
            width: `${star.length}px`,
            animationDuration: `${star.duration}ms`,
            animationDelay: `${star.delay}ms`,
            transform: `rotate(${star.angle}rad)`
          }}
          onAnimationEnd={() => removeStar(star.id)}
        />
      ))}
    </div>
  )
}

export default ShootingStars

