import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, Attendee, Rating } from '../models/event.entity';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(`${this.apiUrl}/attendees`);
  }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings`);
  }

  getEventWithStats(eventId: number): Observable<{
    event: Event,
    checkedInCount: number,
    averageRating: number | null
  }> {
    return forkJoin({
      event: this.http.get<Event>(`${this.apiUrl}/events/${eventId}`),
      attendees: this.http.get<Attendee[]>(`${this.apiUrl}/attendees?eventId=${eventId}`),
      ratings: this.http.get<Rating[]>(`${this.apiUrl}/ratings?eventId=${eventId}`)
    }).pipe(
      map(({ event, attendees, ratings }) => {
        const checkedInCount = attendees.filter(a => a.checkedInAt !== null).length;
        const validRatings = ratings.length;
        const averageRating = validRatings > 0
          ? Number((ratings.reduce((acc, r) => acc + r.rating, 0) / validRatings).toFixed(1))
          : null;

        return {
          event,
          checkedInCount,
          averageRating
        };
      })
    );
  }
}
