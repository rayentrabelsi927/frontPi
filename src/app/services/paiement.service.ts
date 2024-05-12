import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private baseURL = environment.apiUrl+"/api/payment";

  constructor(private httpClient: HttpClient) { }
 


  processPayment(payment: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseURL}`,payment );

  
}
  
}