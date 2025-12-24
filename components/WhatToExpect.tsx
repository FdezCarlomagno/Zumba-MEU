"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const EXPECT_ITEMS = [
  { text: "High-energy music", highlight: false },
  { text: "Kid-friendly environment", highlight: false },
  { text: "Safe & supervised", highlight: false },
  { text: "Fun for all ages", highlight: true },
]

export default function WhatToExpectSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemsContainerRef.current || !titleRef.current) return

    const items = Array.from(itemsContainerRef.current.children)
    const mm = gsap.matchMedia()

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      // @ts-ignore
      const { isMobile } = context.conditions;

      // TRAMPA: Primero asegurarnos que el título sea visible
      gsap.set(titleRef.current, {
        opacity: 1,
        scale: 1,
        y: 0
      })

      // Luego aplicar la animación con un pequeño delay
      setTimeout(() => {
        if (titleRef.current) {
          gsap.fromTo(titleRef.current, 
            {
              opacity: 0,
              scale: 0.9,
              y: 30
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          )
        }
      }, 100)

      items.forEach((item, index) => {
        const isEven = index % 2 !== 0
        // Ajustamos el offset para mobile
        const xOffset = isMobile ? (isEven ? 20 : -20) : (isEven ? 200 : -200)

        // TRAMPA: Primero hacemos visible el elemento
        gsap.set(item, {
          opacity: 1,
          x: 0,
          scale: 1
        })

        setTimeout(() => {
          gsap.fromTo(item, 
            {
              opacity: 1,
              x: xOffset,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              immediateRender: false,
              scrollTrigger: {
                trigger: item,
                start: isMobile ? "top 90%" : "top 85%",
                end: "top 60%",
                scrub: true,
              },
              ease: "power2.out",
            }
          )
        }, 150 + (index * 50))
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-32 w-full"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* TÍTULO - Responsivo pero manteniendo el mismo estilo */}
        <div ref={titleRef} style={{ opacity: 1 }}>
          <h2 className="text-4xl md:text-8xl font-black text-center mb-8 md:mb-24 uppercase tracking-tighter text-zinc-900 font-display">
            What to <span className="text-primary italic">expect?</span>
          </h2>
        </div>

        {/* CONTENEDOR DE ITEMS - Responsivo */}
        <div 
          ref={itemsContainerRef}
          className="flex flex-col space-y-4 md:space-y-12 max-w-5xl mx-auto"
        >
          {EXPECT_ITEMS.map((item, index) => {
            const isEven = index % 2 !== 0
            
            return (
              <div
                key={index}
                className={`flex w-full ${isEven ? "justify-end" : "justify-start"}`}
                style={{ opacity: 1 }}
              >
                <div
                  className={`
                    /* Mobile: casi ancho completo, Desktop: 75% */
                    w-[95%] md:w-[75%] 
                    /* Padding más pequeño en mobile */
                    p-4 md:p-12 
                    /* Bordes redondeados más pequeños en mobile */
                    rounded-[1.5rem] md:rounded-[3rem] 
                    shadow-sm border-2 transition-colors duration-300
                    ${item.highlight 
                      ? "bg-yellow-400 text-black shadow-md z-10 md:scale-105" 
                      : "bg-zinc-100 text-zinc-900 border-transparent"}
                  `}
                >
                  <p className={`
                    /* Tamaño de texto responsive: más pequeño en mobile */
                    text-2xl md:text-6xl lg:text-7xl 
                    font-bold 
                    /* Line-height ajustado para mobile */
                    leading-[1.1] md:leading-[0.9]
                    ${item.highlight ? "uppercase font-display italic" : "tracking-tighter"}
                    /* Asegurar que el texto sea legible en mobile */
                    break-words
                  `}>
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}