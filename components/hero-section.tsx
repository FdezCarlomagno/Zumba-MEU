"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { VideoBackground } from "@/components/video-background"
import { Instagram, Calendar, Sparkles, ArrowRight } from "lucide-react"
import type { Event } from "@/lib/types"
import SplitText from '@/components/SplitText'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  currentEvent: Event | null
  nextEvent: Event | null
}

export function HeroSection({ currentEvent, nextEvent }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  // Estado para el tamaño del contador
  const [timerSize, setTimerSize] = useState<"md" | "lg">("md")

  useEffect(() => {
    if (!heroRef.current || !contentRef.current || !backgroundRef.current) return

    // Función para actualizar el tamaño según el ancho de pantalla
    const handleResize = () => {
      if (window.innerWidth >= 640) { // 640px es el breakpoint 'sm' de Tailwind
        setTimerSize("lg")
      } else {
        setTimerSize("md")
      }
    }

    // Ejecutar al montar y en cada resize
    handleResize()
    window.addEventListener("resize", handleResize)

    // PIN DEL HERO
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "+=100%",
    })

    // CORRECCIÓN: Animación de salida (fade out) para que el texto no se vaya a y:700
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", 
        end: "+=100%",
        scrub: 0.5,
      },
      y: 700,      // Sube un poco en lugar de bajar 700px   // Escala sutilmente hacia abajo
      opacity: 0,   // Desaparece al scrollear
      ease: "none",
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  // Case A: Upcoming event
  if (nextEvent && nextEvent.status === "upcoming") {
    return (
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-20"
        data-theme="dark"
      >
           
          {/* VIDEO */}
          <div className="absolute inset-0 z-0">
            <VideoBackground />
          </div>

          {/* OVERLAY */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 z-10 pointer-events-none animate-gradient"
          />

          {/* CONTENT */}
          <div
            ref={contentRef}
            className="relative z-20 container mx-auto px-4 text-center text-white max-w-6xl"
          >
          
          <SplitText
            text="Next Zumba Party Starts In..."
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-display mb-4 text-balance drop-shadow-2xl leading-tight"
            delay={50}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />

          <div className="mb-5 flex justify-center">
            <CountdownTimer targetDate={nextEvent.date} size={timerSize}/>
          </div>

          <SplitText
            text={nextEvent.name}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-balance font-display drop-shadow-lg"
            delay={100}
            duration={0.7}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 font-bold text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Book Now
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              size="lg"
              onClick={scrollToServices}
              className="w-full sm:w-auto glass-strong text-white hover:glass-strong hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full border-2 border-white/40 shadow-xl"
            >
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Party Details
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Case B: Event is live
  if (currentEvent) {
    return (
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
         data-theme="dark"
      >
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 animate-pulse"
        />
        <VideoBackground />

        <div ref={contentRef} className="relative z-10 container mx-auto px-4 text-center text-white max-w-6xl">
          <SplitText
            text="WE'RE LIVE NOW!"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-10 text-balance drop-shadow-2xl leading-tight"
            delay={80}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />

          <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-12 text-balance font-display flex items-center justify-center gap-4 drop-shadow-lg">
            <Sparkles className="h-6 w-6 sm:h-10 sm:w-10 animate-spin" />
            <SplitText
              text="Join the Party Right Now!"
              className="inline-block"
              delay={40}
              duration={0.3}
              ease="power2.out"
              splitType="words"
              from={{ opacity: 0, y: -20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              onLetterAnimationComplete={() => {}} 
            />
            <Sparkles className="h-6 w-6 sm:h-10 sm:w-10 animate-spin" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-bold text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white"
            >
              <Instagram className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Follow on Instagram
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              size="lg"
              onClick={scrollToServices}
              className="w-full sm:w-auto glass-strong text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full border-2 border-white/40 shadow-xl"
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              See Next Events
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Case C: Event finished, show next event
  if (nextEvent && nextEvent.status === "finished") {
    return (
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
         data-theme="dark"
      >
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary"
        />
        <VideoBackground />

        <div ref={contentRef} className="relative z-10 container mx-auto px-4 text-center text-white max-w-6xl">
          <SplitText
            text="That Was Epic!"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-balance drop-shadow-2xl"
            delay={60}
            duration={0.3}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y : -20 }}
            to={{ opacity: 1, y : 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />

          <SplitText
            text="Next party in..."
            className="text-2xl sm:text-3xl md:text-4xl mb-8 text-balance font-display drop-shadow-lg"
            delay={40}
            duration={0.25}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
            onLetterAnimationComplete={() => {}}
          />

          <div className="mb-10 flex justify-center">
            <CountdownTimer targetDate={nextEvent.date} size={timerSize}/>
          </div>

          <Button
            size="lg"
            onClick={scrollToContact}
            className="glass-strong text-white hover:scale-105 transition-all text-lg px-8 py-6 rounded-full border-2 border-white/40 shadow-2xl"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Now
          </Button>
        </div>
      </section>
    )
  }

  // Case D: No events scheduled
  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
       data-theme="dark"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0"
      />
      <VideoBackground />

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 text-center text-white max-w-6xl">
        <div className="mb-12">
          <SplitText
            text="Dance."
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-balance leading-tight drop-shadow-2xl block"
            delay={50}
            duration={0.3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            onLetterAnimationComplete={() => {}}

          />
          <SplitText
            text="Enjoy."
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-balance leading-tight drop-shadow-2xl block"
            delay={70}
            duration={0.35}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            onLetterAnimationComplete={() => {}}
          />
          <SplitText
            text="Celebrate."
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-balance leading-tight drop-shadow-2xl block"
            delay={90}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            onLetterAnimationComplete={() => {}}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 font-bold text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Book a Party
            <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            size="lg"
            onClick={scrollToServices}
            className="w-full sm:w-auto glass-strong text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full border-2 border-white/40 shadow-xl"
          >
            <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            See Services
          </Button>
        </div>
      </div>
    </section>
  )
}