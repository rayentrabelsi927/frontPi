import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AvailabilityTimeSlot } from '../models/availability-time-slot';
import { Visit } from '../models/visit';
import { Housing } from '../models/Housing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private addURL=environment.apiUrl+"/Housing/add";
  private getALLURL=environment.apiUrl+"/Housing/all";
  private getByIdURL=environment.apiUrl+"/Housing/get";
  private deleteURL=environment.apiUrl+"/Housing/delete";
  private updateURL=environment.apiUrl+"/Housing/updateHousing";
   private recURL=environment.apiUrl+"/Housing/recommend-houses";
   private addTimeSlot =environment.apiUrl+"/Housing/housing/addTimeSlot";
 private getALLATSURL=environment.apiUrl+"/Housing/availableTimeSlots";
 private getALLVisitsURL=environment.apiUrl+"/Housing/visits";
 private getHousingOwner=environment.apiUrl+"/Housing/housingsByOwner";
 private getATSdispoURL=environment.apiUrl+"/Visit/getAvailableTimeSlotsWithoutVisitOverlap";
 private addVisitUrl=environment.apiUrl+"/Visit/create";
 private getAdress=environment.apiUrl+"/User/users";
  

  constructor(private httpClient: HttpClient) { }
   public getHousings(): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.getALLURL}`);
  }
  public getHousingsOwner(id:number): Observable<Housing[]> {
    return this.httpClient.get<Housing[]>(`${this.getHousingOwner}/${id}`);
  }
 
  getAddress(id: number): Observable<string> {
    return this.httpClient.get(`${this.getAdress}/${id}`, { responseType: 'text' });
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
    userId:number,
    typeHousing: string,
    descriptionHousing: string,
    locationHousing: string,
    availabilityHousing: boolean,
    priceHousing: number,
    files: File[]
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('userId', userId.toString());
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
 
  
  recHousing(adresse: string) {
    // Construire les paramètres de la requête
    const params = new HttpParams().set('userAddress', adresse);

    // Envoyer la requête HTTP GET avec les paramètres
    return this.httpClient.get<any[]>(this.recURL, { params });
  }

 public  addAvailabilityTimeSlotToHousing(housingId: number, timeSlot: any): Observable<any> {
   
    return this.httpClient.post<any>(`${this.addTimeSlot}/${housingId}`, timeSlot);
  }
  public addVisit(housingId: any, idATS: any): Observable<any> {
   
      // Construire l'URL avec les paramètres requis
      const url = `http://localhost:8080/projectARCTIC3/Visit/create/${idATS}/${housingId}`;
  
      // Envoyer une requête POST vers l'URL construite
      return this.httpClient.post<any>(url, null);
    }
 
}
