import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  end: number
  suffix?: string
  label: string
  icon: string
  duration?: number
}

export default function AnimatedCounter({ end, suffix = '', label, icon, duration = 2 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-extrabold text-[var(--color-primary)]">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1 font-semibold">{label}</div>
    </motion.div>
  )
}
