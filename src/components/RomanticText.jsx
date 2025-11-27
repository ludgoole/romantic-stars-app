import { useState, useEffect } from 'react'

const RomanticText = ({ mousePosition }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const romanticTexts = [
    '在星空下，我想起了你 ✨',
    '每一颗星星，都是我对你的思念',
    '愿我们的爱情如星空般永恒',
    '你是我生命中最亮的那颗星',
    '在这片星空下，我只想和你在一起',
    '星星为你闪烁，月亮为你明亮',
    '愿我们的故事，如银河般美丽'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % romanticTexts.length)
        setIsVisible(true)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 计算鼠标跟随效果
  const mouseX = mousePosition.x / window.innerWidth
  const mouseY = mousePosition.y / window.innerHeight
  const translateX = (mouseX - 0.5) * 20
  const translateY = (mouseY - 0.5) * 20

  return (
    <div className="romantic-text-container">
      <div
        className={`romantic-text ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`
        }}
      >
        <h1 className="main-text">{romanticTexts[currentTextIndex]}</h1>
        <p className="sub-text">点击屏幕任意位置，让星星为你闪烁</p>
      </div>
      
      <div className="floating-hearts">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}>
            ❤️
          </span>
        ))}
      </div>
    </div>
  )
}

export default RomanticText

