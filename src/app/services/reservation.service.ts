import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Field';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseURL = 'http://localhost:8089/projectARCTIC3/Reservation';

  constructor(private httpClient: HttpClient) { }

//cbon
  getAllReservations(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/all`);
  }


  

  getAllReservationsWithField(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/withFieldId`);
  }


 
  deleteReservation(reservationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${reservationId}`);
  }

  getReservation(reservationId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/get/${reservationId}`);
  }


  getReservationWithField(reservationId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/getWithField/${reservationId}`);
  }

  
//admin
  updateReservation(reservationId: number, reservation: Reservation): Observable<any> {
    return this.httpClient.put<any>(`${this.baseURL}/update/${reservationId}`, reservation);
  }

  //Taw
  makeReservationForUser(userId: number, fieldId: number, reservation: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/users/${userId}/${fieldId}/reserve`, reservation);
  }

  deleteReservationForUser(userId: number, reservationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/users/${userId}/${reservationId}`);
  }

  updateReservationForUser(userId: number, reservationId: number, updatedReservation: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseURL}/users/${userId}/${reservationId}`, updatedReservation);
  }

  getReservationsForUser(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/users/${userId}/reservations`);
  }

  cancelReservation(reservationId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.baseURL}/cancel/${reservationId}`, {});
  }
}
