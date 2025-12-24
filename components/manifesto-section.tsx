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

    // DESKTOP animation
    mm.add("(min-width: 768px)", () => {
      const words = wordsRef.current!.children

      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
        opacity: 0,
        y: 120,
        stagger: 0.25,
        ease: "power3.out",
      })
    })

    // MOBILE — simple fade in
    mm.add("(max-width: 767px)", () => {
      gsap.from(wordsRef.current!, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="a
        bg-background
        py-12
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
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-foreground">
          Dance.
        </h2>
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-primary">
          Enjoy.
        </h2>
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-accent">
          Celebrate.
        </h2>
      </div>
    </section>
  )
}
