import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import { Attendee, Rating } from '../../registration/models/event.entity';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Verifica si un ticket es válido y si el asistente hizo check-in
   */
  validateTicket(ticketIdentifier: string): Observable<{
    isValid: boolean;
    message: string;
    attendee?: Attendee;
  }> {
    return this.http.get<Attendee[]>(`${this.apiUrl}/attendees?ticketIdentifier=${ticketIdentifier}`).pipe(
      map(attendees => {
        if (attendees.length === 0) {
          return { isValid: false, message: 'Invalid Ticket Identifier' };
        }

        const attendee = attendees[0];
        if (!attendee.checkedInAt) {
          return { isValid: false, message: 'You can only rate events you have attended to' };
        }

        return { isValid: true, message: 'Valid ticket', attendee };
      })
    );
  }

  /**
   * Verifica si el asistente ya ha calificado el evento
   */
  hasRated(attendeeId: number, eventId: number): Observable<boolean> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings?attendeeId=${attendeeId}&eventId=${eventId}`).pipe(
      map(ratings => ratings.length > 0)
    );
  }

  /**
   * Registra una nueva calificación para un evento
   */
  rateEvent(attendeeId: number, eventId: number, rating: number): Observable<Rating> {
    const newRating: Partial<Rating> = {
      attendeeId,
      eventId,
      rating,
      ratedAt: new Date().toISOString()
    };

    return this.http.post<Rating>(`${this.apiUrl}/ratings`, newRating);
  }

  /**
   * Proceso completo de calificación de un evento
   */
  submitRating(ticketIdentifier: string, rating: number): Observable<{
    success: boolean;
    message: string;
  }> {
    return this.validateTicket(ticketIdentifier).pipe(
      switchMap(validation => {
        if (!validation.isValid) {
          return of({ success: false, message: validation.message });
        }

        const attendee = validation.attendee!;
        return this.hasRated(attendee.id, attendee.eventId).pipe(
          switchMap(hasRated => {
            if (hasRated) {
              return of({ success: false, message: 'You have already rated this event' });
            }

            return this.rateEvent(attendee.id, attendee.eventId, rating).pipe(
              map(() => ({ success: true, message: 'Event successfully rated' }))
            );
          })
        );
      })
    );
  }
}
