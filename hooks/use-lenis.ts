"use client"

import { useEffect } from "react"

export function useLenis() {
  useEffect(() => {
    // Dynamically import Lenis
    let lenis: any

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      lenis?.destroy()
    }
  }, [])
}
