import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { Visit } from '../models/visit';
import { Housing } from '../models/Housing';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private addURL="http://localhost:8089/projectARCTIC3/Housing/add";
  private getALLURL="http://localhost:8089/projectARCTIC3/Housing/all";
  private getByIdURL="http://localhost:8089/projectARCTIC3/Housing/get";
  private deleteURL="http://localhost:8089/projectARCTIC3/Housing/delete";
  private updateURL="http://localhost:8089/projectARCTIC3/Housing/updateHousing";
   private recURL="http://localhost:8089/projectARCTIC3/Housing/recommend-houses?userAddress=Esprit el ghazela tunis";
   private addTimeSlot ="http://localhost:8089/projectARCTIC3/Housing/housing/addTimeSlot";
 private getALLATSURL="http://localhost:8089/projectARCTIC3/Housing/availableTimeSlots";
 private getALLVisitsURL="http://localhost:8089/projectARCTIC3/Housing/visits";
 private getHousingOwner="http://localhost:8089/projectARCTIC3/Housing/housingsByOwner";
 private getATSdispoURL="http://localhost:8089/projectARCTIC3/Visit/getAvailableTimeSlotsWithoutVisitOverlap";
  

  constructor(private httpClient: HttpClient) { }
   public getHousings(): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.getALLURL}`);
  }
  public getHousingsOwner(id:number): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.getHousingOwner}/${id}`);
  }

  public getATS(id:number): Observable<AvailabilityTimeSlot[]> {
    return this.httpClient.get<AvailabilityTimeSlot[]>(`${this.getALLATSURL}/${id}`).pipe(
      tap(data => console.log('Data from getATS:', data)));
  }
  public getATSdispo(id:number): Observable<AvailabilityTimeSlot[]> {
    return this.httpClient.get<AvailabilityTimeSlot[]>(`${this.getATSdispoURL}/${id}`).pipe(
      tap(data => console.log('Data from getATS:', data)));
  }
  public getVisits(id:number): Observable<Visit[]> {
    return this.httpClient.get<Visit[]>(`${this.getALLVisitsURL}/${id}`).pipe(
      tap(data => console.log('Data from getVisits:', data)));
  }
  //public addHousing(housing: Housing): Observable<Housing[]> {
    //return this.httpClient.post<Housing[]>(`${this.addURL}`,housing);
  //}


  addHousingWithImages(
    typeHousing: string,
    descriptionHousing: string,
    locationHousing: string,
    availabilityHousing: boolean,
    priceHousing: number,
    files: File[]
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('typeHousing', typeHousing);
    formData.append('descriptionHousing', descriptionHousing);
    formData.append('locationHousing', locationHousing);
    formData.append('availabilityHousing', availabilityHousing.toString());
    formData.append('priceHousing', priceHousing.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i], files[i].name); // Ajoute chaque fichier à FormData
    }

    return this.httpClient.post<any>(`${this.addURL}`, formData);
  }
  getHousingById(id:number){
    return this.httpClient.get<Housing>(`${this.getByIdURL}/${id}`);
  }
  deleteHousing(id:number){
    return this.httpClient.delete(`${this.deleteURL}/${id}`)
  }
  updateHousing(housing:Housing,id:number){
    return this.httpClient.put(`${this.updateURL}/${id}`,housing)
  }
 
  
  public  recHousing(): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.recURL}`);
  }

 public  addAvailabilityTimeSlotToHousing(housingId: number, timeSlot: AvailabilityTimeSlot): Observable<any> {
   
    return this.httpClient.post<any>(`${this.addTimeSlot}/${housingId}`, timeSlot);
  }
 
}
