export type EventStatus = "upcoming" | "live" | "finished" | "none"

export interface Event {
  id: string
  name: string
  date: string
  status: EventStatus
  description?: string
}

export interface EventsData {
  events: Event[]
}
