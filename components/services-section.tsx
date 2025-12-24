"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

type Service = {
  title: string
  description: string
  images: string[]
}

const services: Service[] = [
  {
    title: "Zumba Kids",
    description:
      "High-energy dance classes designed specifically for children, filled with music, movement and joy.",
    images: [
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=1600",
      "https://images.unsplash.com/photo-1515165562835-c4c1b572fb66?q=80&w=1600",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1600",
    ],
  },
  {
    title: "Kids Disco",
    description:
      "Disco lights, party beats and interactive games that turn every event into a real celebration.",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600",
    ],
  },
  {
    title: "Zumba Party",
    description:
      "High-energy Zumba sessions for adults, perfect for birthdays and celebrations.",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1600",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600",
    ],
  },
  {
    title: "Birthday Disco Parties",
    description:
      "All-inclusive party experiences with music, lights, games and unforgettable memories.",
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1600",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1600",
    ],
  },
]

/* -------------------------------------------- */

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeService, setActiveService] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const isMobile = useMobile()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  /* Auto-ciclo de imágenes */
  useEffect(() => {
    if (isMobile) return

    // Limpiar intervalo anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Crear nuevo intervalo para el servicio activo
    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => {
        const serviceImages = services[activeService].images
        return (prev + 1) % serviceImages.length
      })
    }, 3000) // Cambia cada 3 segundos

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeService, isMobile])

  /* Sticky + service detection */
  useEffect(() => {
    if (!sectionRef.current || isMobile) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: visualRef.current,
        pinSpacing: false,
      })

      services.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#service-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveService(index)
            setActiveImage(0)
          },
          onEnterBack: () => {
            setActiveService(index)
            setActiveImage(0)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  /* Animación suave de transición entre imágenes */
  useEffect(() => {
    if (isMobile) return

    const currentImages = imageRefs.current
    const totalImages = services[activeService].images.length

    // Animar todas las imágenes
    currentImages.forEach((container, index) => {
      if (!container) return

      const imgElement = container.querySelector('img')
      if (!imgElement) return

      const isActive = index === activeImage
      const isPrevious = index === (activeImage - 1 + totalImages) % totalImages
      
      // Resetear antes de animar
      gsap.set(imgElement, {
        scale: 1.1,
        opacity: 0,
        zIndex: isActive ? 10 : isPrevious ? 5 : 0
      })

      // Animación suave
      gsap.to(imgElement, {
        scale: isActive ? 1 : 1.1,
        opacity: isActive ? 1 : 0,
        duration: 1.5,
        ease: "power2.out",
        overwrite: true
      })
    })
  }, [activeImage, activeService, isMobile])

  /* MOBILE con animaciones Framer Motion */
  if (isMobile) {
    // Variantes de animación para las cards
    const cardVariants = {
      hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.9,
        rotateX: 10
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.8
        }
      }
    }

    // Variantes para la imagen
    const imageVariants = {
      hidden: { scale: 1.1, opacity: 0.7 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }

    // Variantes para el contenido
    const contentVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          delay: 0.2,
          duration: 0.4
        }
      }
    }

    // Variantes para el botón
    const buttonVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.3
        }
      },
      hover: {
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      },
      tap: {
        scale: 0.95
      }
    }

    return (
      <section className="py-16 px-6 space-y-20">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden"
            style={{
              // Asegurar visibilidad inicial
              opacity: 1
            }}
          >
            {/* Imagen con animación */}
            <motion.div
              variants={imageVariants}
              className="relative overflow-hidden"
            >
              <motion.img
                src={service.images[0]}
                className="w-full h-[300px] object-cover"
                alt={service.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Badge de servicio */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 left-4"
              >
                <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-black">
                  Service {i + 1}
                </span>
              </motion.div>
            </motion.div>

            {/* Contenido con animación escalonada */}
            <motion.div 
              variants={contentVariants}
              className="p-6 space-y-4"
            >
              <motion.h3 
                className="text-2xl font-serif font-bold text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {service.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {service.description}
              </motion.p>
              
              {/* Botón con animación */}
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="w-full rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                  <span>Book Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Elementos decorativos animados */}
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        ))}
      </section>
    )
  }

  /* DESKTOP - Mantenemos exactamente igual */
  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="light"
      className="relative min-h-[400vh] bg-background"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24 px-16">
        {/* LEFT */}
        <div className="py-[50vh] space-y-[50vh]">
          {services.map((service, i) => (
            <div
              key={i}
              id={`service-${i}`}
              className="min-h-screen flex flex-col justify-center"
            >
              <p className="uppercase tracking-widest text-xs text-muted-foreground mb-3">
                Service {i + 1}
              </p>
              <h2 className="text-5xl font-display font-bold mb-6">
                {service.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mb-10">
                {service.description}
              </p>
              <Button className="w-fit rounded-full px-8 py-6 text-lg">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* RIGHT - Contenedor visual mejorado */}
        <div
          ref={visualRef}
          className="sticky top-0 h-screen flex items-center"
        >
          <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
            {services[activeService].images.map((img, i) => (
              <div
                key={i}
                ref={(el) => {
                  imageRefs.current[i] = el
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={img}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  alt={`${services[activeService].title} - Image ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}