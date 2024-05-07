import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8089/projectARCTIC3/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/getallevents`);
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${eventId}`);
  }

  addEvent(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addevent`, formData);
  
    
  }

  updateEvent(eventId: number, event: Event): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${eventId}`, event);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${eventId}`);
  }
}
