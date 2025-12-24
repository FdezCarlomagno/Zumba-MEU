import type { Event, EventStatus } from "./types"

export function getEventStatus(eventDate: string): EventStatus {
  const now = new Date()
  const event = new Date(eventDate)
  const diff = event.getTime() - now.getTime()

  // Event is live (within 4 hours window)
  if (Math.abs(diff) < 4 * 60 * 60 * 1000 && diff < 2 * 60 * 60 * 1000) {
    return "live"
  }

  // Event is upcoming
  if (diff > 0) {
    return "upcoming"
  }

  // Event is finished
  return "finished"
}

export function getNextEvent(events: Event[]): Event | null {
  const now = new Date()
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return upcomingEvents[0] || null
}

export function getCurrentEvent(events: Event[]): Event | null {
  return events.find((event) => getEventStatus(event.date) === "live") || null
}
