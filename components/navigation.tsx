"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Home, Sparkles, Mail } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { Event } from "@/lib/types"

type Theme = "light" | "dark"

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "contact", label: "Contact", icon: Mail },
]

interface NavigationProps {
   currentEvent: Event | null
    nextEvent: Event | null
}

export function Navigation({currentEvent, nextEvent } : NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[data-theme]")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.dataset?.theme as Theme
            setTheme(theme)
          }
        })
      },
      {
        threshold: 0.7,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const isDark = theme === "dark"

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden transition-all duration-300 ease-out ${
          isDark ? "text-white" : "text-neutral-900"
        }`}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">
          {/* Countdown en mobile (izquierda) */}
          <div
            className={`md:hidden transition-all duration-500 ${
              isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
          >
            <CountdownTimer targetDate={nextEvent?.date as string} size="sm" />
          </div>

          {/* Logo - visible en desktop, oculto en mobile */}
          <button
            onClick={() => scrollToSection("home")}
            className={`text-3xl md:text-4xl font-display transition-colors cursor-pointer hidden md:block ${
              isDark ? "text-white hover:text-yellow-300" : "text-neutral-900 hover:text-purple-600"
            }`}
          >
            Zumba MEU
          </button>

          {/* Spacer para mobile cuando no hay scroll */}
          {!isScrolled && <div className="md:hidden" />}

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {/* Countdown en desktop (antes del menú) */}
            <div
              className={`transition-all duration-500 mr-4 ${
                isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              <CountdownTimer targetDate={nextEvent?.date as string} size="sm"/>
            </div>

            {menuItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`font-semibold text-lg transition-colors ${
                  isDark
                    ? "text-white hover:text-yellow-300"
                    : "text-neutral-900 hover:text-purple-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all z-[60] relative ${
              isDark ? "text-white hover:bg-white/20" : "text-neutral-900 hover:bg-black/10"
            } ${isMobileMenuOpen ? "text-neutral-900" : ""}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        data-theme='light'
      >
        <div className="h-full w-full flex flex-col items-center justify-center px-6">
          <div
            className={`mb-12 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <h2 className="text-5xl font-display text-black">Zumba MEU</h2>
          </div>

          <div className="w-full max-w-sm space-y-3">
            {menuItems.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full group transition-all duration-300 ease-out transform active:scale-95 ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${100 + index * 80}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-4 p-5 rounded-xl bg-neutral-50 hover:bg-purple-50 border-2 border-transparent hover:border-purple-200 transition-all">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shrink-0">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xl font-semibold text-neutral-900">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}