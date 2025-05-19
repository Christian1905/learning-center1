export interface Event {
  id: number;
  name: string;
  description: string;
  scheduledAt: string;
}

export interface Attendee {
  id: number;
  firstName: string;
  lastName: string;
  eventId: number;
  ticketIdentifier: string;
  checkedInAt: string | null;
}

export interface Rating {
  id: number;
  attendeeId: number;
  eventId: number;
  rating: number;
  ratedAt: string;
}
