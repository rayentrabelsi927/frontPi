import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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


  
  joinReservation(reservationId: number, userId: number): Observable<string> {
    const url = `${this.baseURL}/join/${reservationId}/${userId}`;
    return this.httpClient.post<string>(url, {}).pipe(
      catchError(error => throwError(error))
    );
  }

  hasUserJoinedReservation(reservationId: number, userId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}/joined/${reservationId}/${userId}`);
  }

  cancelUserReservation(userId: number, reservationId: number): Observable<void> {
    const url = `${this.baseURL}/cancel/${reservationId}/${userId}`;
    return this.httpClient.put<void>(url, {}).pipe(
      catchError(error => {
        console.error('Error canceling user reservation:', error);
        return throwError('An error occurred while canceling the reservation.');
      })
    );
  }

  countReservationsByUser(userId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/count/users/${userId}`);
  }

}
