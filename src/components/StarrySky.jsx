import { useEffect, useRef } from 'react'

const StarrySky = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 创建星星数组
    const stars = []
    const numStars = 200

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speed = Math.random() * 0.5
        this.opacity = Math.random()
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        this.opacity += this.twinkleSpeed
        if (this.opacity > 1 || this.opacity < 0.3) {
          this.twinkleSpeed = -this.twinkleSpeed
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
        
        // 添加光晕效果
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // 初始化星星
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star())
    }

    // 绘制星座连线
    const drawConstellation = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      
      for (let i = 0; i < stars.length; i += 5) {
        if (i + 1 < stars.length) {
          const star1 = stars[i]
          const star2 = stars[i + 1]
          const distance = Math.sqrt(
            Math.pow(star2.x - star1.x, 2) + Math.pow(star2.y - star1.y, 2)
          )
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(star1.x, star1.y)
            ctx.lineTo(star2.x, star2.y)
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 绘制深色渐变背景
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a0e27')
      gradient.addColorStop(1, '#1a1a2e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制星星
      stars.forEach(star => {
        star.update()
        star.draw()
      })

      // 绘制星座连线
      drawConstellation()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="starry-sky" />
}

export default StarrySky

