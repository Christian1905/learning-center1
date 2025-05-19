/**
 * Represents an event entity in the system
 */
export class Event {
  /** Unique identifier for the event */
  id: number;

  /** Name of the event */
  name: string;

  /** Detailed description of the event */
  description: string;

  /** Date and time when the event is scheduled */
  scheduledAt: string;

  /**
   * Creates a new Event instance
   * @param event - The event initialization object
   * @param event.id - The event ID (defaults to 0 if not provided)
   * @param event.name - The event name (defaults to empty string if not provided)
   * @param event.description - The event description (defaults to empty string if not provided)
   * @param event.scheduledAt - The event scheduled date (defaults to current date if not provided)
   */
  constructor(event: {id?: number, name?: string, description?: string, scheduledAt?: string}) {
    this.id = event.id || 0;
    this.name = event.name || '';
    this.description = event.description || '';
    this.scheduledAt = event.scheduledAt || new Date().toISOString();
  }
}

/**
 * Represents an attendee entity in the system
 */
export class Attendee {
  /** Unique identifier for the attendee */
  id: number;

  /** First name of the attendee */
  firstName: string;

  /** Last name of the attendee */
  lastName: string;

  /** ID of the event the attendee is registered for */
  eventId: number;

  /** Unique ticket identifier for the attendee */
  ticketIdentifier: string;

  /** Date and time when the attendee checked in */
  checkedInAt: string | null;

  /**
   * Creates a new Attendee instance
   * @param attendee - The attendee initialization object
   * @param attendee.id - The attendee ID (defaults to 0 if not provided)
   * @param attendee.firstName - The attendee's first name (defaults to empty string if not provided)
   * @param attendee.lastName - The attendee's last name (defaults to empty string if not provided)
   * @param attendee.eventId - The event ID (defaults to 0 if not provided)
   * @param attendee.ticketIdentifier - The ticket identifier (defaults to empty string if not provided)
   * @param attendee.checkedInAt - The check-in date (defaults to null if not provided)
   */
  constructor(attendee: {
    id?: number,
    firstName?: string,
    lastName?: string,
    eventId?: number,
    ticketIdentifier?: string,
    checkedInAt?: string | null
  }) {
    this.id = attendee.id || 0;
    this.firstName = attendee.firstName || '';
    this.lastName = attendee.lastName || '';
    this.eventId = attendee.eventId || 0;
    this.ticketIdentifier = attendee.ticketIdentifier || '';
    this.checkedInAt = attendee.checkedInAt || null;
  }
}

/**
 * Represents a rating entity in the system
 */
export class Rating {
  /** Unique identifier for the rating */
  id: number;

  /** ID of the attendee who provided the rating */
  attendeeId: number;

  /** ID of the event being rated */
  eventId: number;

  /** Rating value (1-5) */
  rating: number;

  /** Date and time when the rating was submitted */
  ratedAt: string;

  /**
   * Creates a new Rating instance
   * @param rating - The rating initialization object
   * @param rating.id - The rating ID (defaults to 0 if not provided)
   * @param rating.attendeeId - The attendee ID (defaults to 0 if not provided)
   * @param rating.eventId - The event ID (defaults to 0 if not provided)
   * @param rating.rating - The rating value (defaults to 0 if not provided)
   * @param rating.ratedAt - The rating submission date (defaults to current date if not provided)
   */
  constructor(rating: {
    id?: number,
    attendeeId?: number,
    eventId?: number,
    rating?: number,
    ratedAt?: string
  }) {
    this.id = rating.id || 0;
    this.attendeeId = rating.attendeeId || 0;
    this.eventId = rating.eventId || 0;
    this.rating = rating.rating || 0;
    this.ratedAt = rating.ratedAt || new Date().toISOString();
  }
}
