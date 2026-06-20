import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  suffix?: string
  label: string
  icon: string
  duration?: number
}

export default function AnimatedCounter({ end, suffix = '', label, icon, duration = 2 }: Props) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [visible, end, duration])

  return (
    <div ref={ref} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow anim-fade-up">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-extrabold text-[var(--color-primary)]">{count}{suffix}</div>
      <div className="text-sm text-gray-500 mt-1 font-semibold">{label}</div>
    </div>
  )
}
