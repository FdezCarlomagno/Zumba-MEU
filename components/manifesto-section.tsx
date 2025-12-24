"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !wordsRef.current) return

    const mm = gsap.matchMedia()
    const words = Array.from(wordsRef.current.children)

    // TRAMPA CRÍTICA: Primero hacemos visibles todos los elementos
    gsap.set(words, {
      opacity: 1,
      y: 0,
      scale: 1
    })

    // DESKTOP animation
    mm.add("(min-width: 768px)", () => {
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 1.5,
          markers: false,
        },
        opacity: 0,
        y: 150,
        scale: 0.8,
        stagger: 0.3,
        ease: "power4.out",
        duration: 1.5
      })
    })

    // MOBILE — Animación QUE SE REPITE AL ENTRAR Y SALIR
    mm.add("(max-width: 767px)", () => {
      // Primero aseguramos visibilidad
      gsap.set(words, {
        opacity: 1,
        y: 0,
        scale: 1
      })

      // Luego creamos las animaciones
      setTimeout(() => {
        words.forEach((word, index) => {
          // Reset para animación (ocultamos temporalmente)
          gsap.set(word, {
            opacity: 0,
            y: 60,
            scale: 0.9
          })

          // Animación con toggleActions COMPLETO
          gsap.to(word, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: word,
              start: "top 90%",    // Se activa cuando llega al 90%
              end: "top 30%",      // Termina cuando llega al 30%
              toggleActions: "play reverse play reverse", // ¡ESTO ES CLAVE!
              // "play reverse play reverse" significa:
              // 1. play al ENTRAR (scrollear hacia abajo)
              // 2. reverse al SALIR (scrollear hacia abajo y salir)
              // 3. play al VOLVER A ENTRAR (scrollear hacia arriba)
              // 4. reverse al VOLVER A SALIR (scrollear hacia arriba y salir)
              markers: false,
              // Asegurar que se resetee correctamente
              refreshPriority: 1,
            }
          })
        })
      }, 100)
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="
        bg-background
        py-16
        md:min-h-screen
        flex
        md:items-center
        justify-center
        overflow-hidden
      "
    >
      <div
        ref={wordsRef}
        className="
          container mx-auto px-4
          text-center
          space-y-6
          md:space-y-10
        "
      >
        <h2 
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-foreground"
          style={{ opacity: 1 }}
        >
          Dance.
        </h2>
        <h2 
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-primary"
          style={{ opacity: 1 }}
        >
          Enjoy.
        </h2>
        <h2 
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-accent"
          style={{ opacity: 1 }}
        >
          Celebrate.
        </h2>
      </div>
    </section>
  )
}