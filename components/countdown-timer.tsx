"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
  size?: "sm" | "md" | "lg"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, size = "lg" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = +new Date(targetDate) - +new Date()
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const gapClass = size === "sm" ? "gap-1 sm:gap-2" : "gap-2 sm:gap-4"

  return (
    <div className={`flex ${gapClass} justify-center items-center select-none w-full max-w-full`}>
      <TimeUnit value={timeLeft.days} label={size === "sm" ? "" : "Days"} color="orange" size={size} />
      <TimeUnit value={timeLeft.hours} label={size === "sm" ? "" : "Hours"} color="green" size={size} />
      <TimeUnit value={timeLeft.minutes} label={size === "sm" ? "" : "Minutes"} color="red" size={size} />
      <TimeUnit value={timeLeft.seconds} label={size === "sm" ? "" : "Seconds"} color="purple" size={size} />
    </div>
  )
}

function TimeUnit({ value, label, color, size }: { value: number; label: string; color: string; size: string }) {
  const formattedValue = String(value).padStart(2, "0")
  const digits = formattedValue.split("")

  const colorClasses = {
    orange: "from-orange-500 to-orange-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  }

  const digitGap = size === "sm" ? "gap-0.5" : "gap-1"

  return (
    <div className="flex flex-col items-center gap-0.5 sm:gap-1 select-none">
      <div className={`flex ${digitGap}`}>
        <FlipDigit digit={digits[0]} color={colorClasses[color as keyof typeof colorClasses]} size={size} />
        <FlipDigit digit={digits[1]} color={colorClasses[color as keyof typeof colorClasses]} size={size} />
      </div>
      <span className={`font-sans select-none text-white/80 uppercase tracking-tighter font-bold 
        ${size === "sm" ? "text-[8px]" : "text-[10px] sm:text-xs"}`}>
        {label}
      </span>
    </div>
  )
}

function FlipDigit({ digit, color, size }: { digit: string; color: string; size: string }) {
  const [currentDigit, setCurrentDigit] = useState(digit)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (digit !== currentDigit) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setCurrentDigit(digit)
        setIsFlipping(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [digit, currentDigit])

  // Tamaños reducidos un 30% aproximadamente
  const sizeStyles = {
    sm: "w-[17px] h-[25px] sm:w-[25px] sm:h-[35px] text-1xl sm:text-xl",
    md: "w-[40px] h-[65px] sm:w-[70px] sm:h-[100px] text-4xl sm:text-6xl",
    lg: "w-[70px] h-[90px] sm:w-[90px] sm:h-[130px] text-4xl sm:text-7xl",
  }[size as "sm" | "md" | "lg"]

  return (
    <div className={`relative ${sizeStyles} transition-all duration-300`} style={{ perspective: "400px" }}>
      {/* Card Base */}
      <div className={`absolute inset-0 bg-gradient-to-b ${color} rounded sm:rounded-2xl shadow-md overflow-hidden`}>
        {/* Mitad Superior */}
        <div className="absolute inset-0 h-1/2 overflow-hidden bg-black/5">
          <div className="w-full h-[200%] flex items-center justify-center">
            <span className="font-bold text-white font-display leading-none">{currentDigit}</span>
          </div>
        </div>

        {/* Línea Divisoria */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30 z-10" />

        {/* Mitad Inferior */}
        <div className="absolute inset-0 top-1/2 h-1/2 overflow-hidden">
          <div className="w-full h-[200%] -translate-y-1/2 flex items-center justify-center">
            <span className="font-bold text-white font-display leading-none">{currentDigit}</span>
          </div>
        </div>
      </div>

      {/* Animación Flip */}
      {isFlipping && (
        <div
          className="absolute inset-0 h-1/2 overflow-hidden z-20 origin-bottom"
          style={{
            transformStyle: "preserve-3d",
            animation: "flipDown 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
        >
          <div className={`w-full h-full bg-gradient-to-b ${color} rounded-t-sm sm:rounded-t overflow-hidden border-b border-black/10`}>
            <div className="w-full h-[200%] flex items-center justify-center">
              <span className="font-bold text-white font-display leading-none">{currentDigit}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes flipDown {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(-90deg); }
        }
      `}</style>
    </div>
  )
}