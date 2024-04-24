import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Housing } from '../models/housing';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private addURL="http://localhost:8080/Housing/add";
  private getALLURL="http://localhost:8080/Housing/all";

  constructor(private httpClient: HttpClient) { }
   public getHousings(): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.getALLURL}`);
  }
  public addHousing(housing: Housing): Observable<Housing[]> {
    return this.httpClient.post<Housing[]>(`${this.addURL}`,housing);
  }
  

}
