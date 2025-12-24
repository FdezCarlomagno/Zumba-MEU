"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ManifestoSection } from "@/components/manifesto-section"
import ExperienceGallery from "@/components/experience-gallery"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import eventsData from "@/data/events.json"
import { getNextEvent, getCurrentEvent, getEventStatus } from "@/lib/event-utils"
import type { Event } from "@/lib/types"
import WhatsAppButton from "@/components/whatsappButton"
import BlobCursor from '@/components/BlobCursor'
import Ribbons from '@/components/Ribbons';
import WhatToExpect from '@/components/WhatToExpect'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  // Update event statuses based on current time
  const events: Event[] = eventsData.events.map((event) => ({
    ...event,
    status: getEventStatus(event.date),
  }))

  const currentEvent = getCurrentEvent(events)
  const nextEvent = getNextEvent(events)

  return (
    <>
      <SmoothScroll />
      <Navigation currentEvent={currentEvent} nextEvent={nextEvent}/>
      <WhatsAppButton />
      {/* <div style={{
          position: "fixed",
          pointerEvents: "auto",
          inset: 0,
          zIndex: 9999,

        }}>
        <Ribbons
          baseThickness={30}
          colors={['#ffffff']}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={true}
        />
      </div> */}
      <main>
        <HeroSection currentEvent={currentEvent} nextEvent={nextEvent} />
        <ManifestoSection />
        <WhatToExpect/>
        <ExperienceGallery />
        <CallToAction />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
