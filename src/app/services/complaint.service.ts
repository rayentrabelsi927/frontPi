import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../models/Complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseURL = 'http://localhost:8089/projectARCTIC3/Complaint';

  constructor(private httpClient: HttpClient) { }

  getAllComplaints(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/reservations-complaint`);
  }

  saveComplaintsForUsersWithCancelledReservations(): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.baseURL}/users-with-cancelled-reservations/save-complaints`, null);
  }


  getAll(): Observable<Complaint[]> {
    return this.httpClient.get<Complaint[]>(`${this.baseURL}/all`);
  }
}
  
