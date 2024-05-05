import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private baseURL = "http://localhost:8089/projectARCTIC3/api/payment";

  constructor(private httpClient: HttpClient) { }
 


  processPayment(payment: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseURL}`,payment );

  
}
  
}