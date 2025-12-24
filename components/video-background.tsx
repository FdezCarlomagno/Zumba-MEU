"use client"

import { useEffect, useRef, useState } from "react"

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const videoSrc = "/background/Videobgpagina.mp4"

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const render = () => {
      if (video.readyState >= 2 && !video.paused) {
        const scale = Math.max(
          canvas.width / video.videoWidth,
          canvas.height / video.videoHeight
        )

        const drawWidth = video.videoWidth * scale
        const drawHeight = video.videoHeight * scale

        const x = (canvas.width - drawWidth) / 2
        const y = (canvas.height - drawHeight) / 2

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(video, x, y, drawWidth, drawHeight)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    const onReady = () => {
      resize()
      setIsLoaded(true)

      video
        .play()
        .then(() => render())
        .catch(console.error)
    }

    window.addEventListener("resize", resize)

    if (video.readyState >= 3) {
      onReady()
    } else {
      video.addEventListener("loadeddata", onReady)
    }

    return () => {
      window.removeEventListener("resize", resize)
      video.removeEventListener("loadeddata", onReady)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* VIDEO */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="hidden"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* OVERLAY OSCURO PARA TEXTO */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* GRADIENT SUAVE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 pointer-events-none" />
    </div>
  )
}
