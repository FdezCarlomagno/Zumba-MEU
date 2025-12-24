"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMobile } from "@/hooks/use-mobile"

gsap.registerPlugin(ScrollTrigger)

type MediaType = "image" | "video"

type ExperienceItem = {
  title: string
  subtitle: string
  media: string
  type: MediaType
  size: "lg" | "md" | "sm" | "usm" | "xlg"
  offsetY: number
  offsetX?: number
}

const experiences: ExperienceItem[] = [
  {
    title: "Christmas Party",
    subtitle: "22/11/2025",
    media: "/experienceImages/expImg1.jpg",
    type: "image",
    size: "usm",
    offsetY: -150,
    offsetX: -170,
  },
  {
    title: "Christmas Party",
    subtitle: "22/11/2025",
    media: "/experienceImages/expVid1.mp4",
    type: "video",
    size: "md",
    offsetY: 100,
    offsetX: -260,
  },
  {
    title: "Wings Party",
    subtitle: "Unknown",
    media: "/experienceImages/expImg3.jpg",
    type: "image",
    size: "md",
    offsetY: -40,
    offsetX: -320,
  },
  {
    title: "Wings Party",
    subtitle: "Unknown",
    media: "/experienceImages/expImg5.jpg",
    type: "image",
    size: "lg",
    offsetY: 80,
    offsetX: -350,
  },
  {
    title: "Christmas Party",
    subtitle: "22/11/2025",
    media: "/experienceImages/expVid2.mp4",
    type: "video",
    size: "lg",
    offsetY: -90,
    offsetX: -420,
  },
  {
    title: "The Zumba Kids",
    subtitle: "Feel the rhythm",
    media: "/experienceImages/expImg6.jpg",
    type: "image",
    size: "sm",
    offsetY: -160,
    offsetX: -420,
  },
  {
    title: "Relay for Life",
    subtitle: "The Zumba Kids",
    media: "/experienceImages/expImg7.jpg",
    type: "image",
    size: "usm",
    offsetY: 120,
    offsetX: -780,
  },
  {
    title: "Christmas Party",
    subtitle: "22/11/2025",
    media: "/experienceImages/expVid3.mp4",
    type: "video",
    size: "xlg",
    offsetY: 0,
    offsetX: -700,
  },
  {
    title: "Wings Party",
    subtitle: "0/0/0",
    media: "/experienceImages/expVid4.mp4",
    type: "video",
    size: "sm",
    offsetY: 140,
    offsetX: -750,
  },
  {
    title: "Wings Party",
    subtitle: "Dance. Play. Celebrate.",
    media: "/experienceImages/expVid5.mp4",
    type: "video",
    size: "sm",
    offsetY: -150,
    offsetX: -1000,
  },
]

const sizeClasses = {
  xlg: "w-[320px] h-[400px]",
  lg: "w-[260px] h-[320px]",
  md: "w-[210px] h-[260px]",
  sm: "w-[150px] h-[190px]",
  usm: "w-[120px] h-[150px]",
}

// Mantenemos el registro fuera para evitar duplicados
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ... (tus constantes de experiences y sizeClasses se mantienen igual)

export default function ExperienceGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  /* =========================
      DESKTOP GSAP
  ========================== */
  useEffect(() => {
    // Si es mobile, NO HACEMOS NADA aquí.
    if (isMobile || !sectionRef.current || !containerRef.current) return

    const container = containerRef.current
    const scrollWidth = container.scrollWidth - window.innerWidth - 1000

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { x: window.innerWidth * 0.6 },
        {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollWidth + window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true, // Ayuda a recalcular si cambia el tamaño
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  /* =========================
      MOBILE CLEANUP (La "Trampa" de seguridad)
  ========================== */
  useEffect(() => {
    if (isMobile) {
      // 1. Matamos absolutamente todos los triggers activos
      ScrollTrigger.getAll().forEach(st => st.kill())
      
      // 2. Limpiamos las propiedades de GSAP en los elementos críticos
      if (containerRef.current) {
        gsap.set(containerRef.current, { 
          clearProps: "all", 
          x: 0, 
          y: 0, 
          translateX: 0, 
          translateY: 0 
        })
      }
      
      // 3. Forzamos que el cuerpo del documento no tenga inline styles de pinning
      document.body.style.overflow = ""
    }
  }, [isMobile])

  if (isMobile) {
    const mobileSizes = {
      xlg: "w-full h-[340px]",
      lg: "w-4/5 h-[280px]",
      md: "w-3/4 h-[220px]",
      sm: "w-1/2 h-[180px]",
      usm: "w-2/5 h-[140px]",
    }

    return (
      <section data-theme="light" className="py-12 px-4 overflow-x-hidden">
        {/* Usamos !important en el transform para que GSAP no pueda sobreescribirlo 
            mientras el componente esté montado en mobile */}
        <div 
          ref={containerRef}
          className="flex flex-col space-y-20" 
          style={{ 
            transform: "none !important", 
            WebkitTransform: "none !important" 
          } as React.CSSProperties}
        >
          {experiences.map((exp, index) => {
            const alignment = index % 3 === 0 ? "mr-auto" : index % 3 === 1 ? "mx-auto" : "ml-auto"

            return (
              <div key={index} className={`${mobileSizes[exp.size]} ${alignment}`}>
                <div className="relative w-full h-full overflow-hidden shadow-xl">
                  {exp.type === "image" ? (
                    <img src={exp.media} alt={exp.title} className="w-full h-full object-cover" />
                  ) : (
                    <video src={exp.media} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">{exp.subtitle}</p>
                  <h3 className="text-lg font-serif text-neutral-900">{exp.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  /* =========================
      DESKTOP RENDER
  ========================== */
  return (
    <section ref={sectionRef} data-theme="light" className="relative h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="flex items-center h-screen gap-32 px-32"
        style={{ width: "max-content" }}
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 ${sizeClasses[exp.size]}`}
            style={{ transform: `translate(${exp.offsetX ?? 0}px, ${exp.offsetY}px)` }}
          >
            {/* ... resto del contenido igual ... */}
            <div className="relative w-full h-full overflow-hidden">
               {exp.type === "image" ? (
                 <img src={exp.media} alt={exp.title} className="w-full h-full object-cover" draggable={false} />
               ) : (
                 <video src={exp.media} className="w-full h-full object-cover" autoPlay loop muted playsInline />
               )}
            </div>
            <div className="mt-1">
               <p className="text-[10px] uppercase tracking-widest text-neutral-500">{exp.subtitle}</p>
               <h3 className="text-[22px] font-serif text-neutral-900">{exp.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}