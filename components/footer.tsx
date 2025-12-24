"use client"

import { Instagram, Mail, Phone } from "lucide-react"
import { useEffect, useRef } from "react"

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 300

    const particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      alpha: number
    }> = []

    const colors = ["#a855f7", "#ec4899", "#eab308", "#f97316"]

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(23, 23, 23, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = 300
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <footer className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Wave shape top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-12">
        {/* Main content */}
        <div className="text-center mb-12">
          <h3 className="text-6xl md:text-7xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse">
            Zumba MEU
          </h3>
          <p className="text-xl text-neutral-300 mb-8 font-light">
            Dance · Play · Celebrate
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </div>
            </a>
            <a
              href="mailto:info@zumbameu.com"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
            </a>
            <a
              href="tel:+1234567890"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
            </a>
          </div>

          {/* Quick links */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <button
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
              className="text-neutral-300 hover:text-white transition-colors font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="text-neutral-300 hover:text-white transition-colors font-semibold"
            >
              Services
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-neutral-300 hover:text-white transition-colors font-semibold"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8 taext-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Zumba MEU · Creating unforgettable moments, one dance at a time ✨
          </p>
        </div>
      </div>
    </footer>
  )
}