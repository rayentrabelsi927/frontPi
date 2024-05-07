import { Injectable } from '@angular/core';
import { SportTeam } from '../models/SportTeam';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportTeamService {
  private baseURL = "http://localhost:8089/projectARCTIC3/SportTeam/";

  constructor(private httpClient: HttpClient) { }

  


  getAll(): Observable<SportTeam[]> {
    return this.httpClient.get<SportTeam[]>(this.baseURL + 'all');
  }

  
  
  getSportTeamById(id: String): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}get/${id}`);
  }

 
  

  addSportTeam(sportTeamName: string, captainId: number, logo: File): Observable<any> {  
    const formData: FormData = new FormData();
    formData.append('nameTeam', sportTeamName);
    formData.append('logo', logo, logo.name);
    return this.httpClient.post<any>(this.baseURL + 'add-with-photo/' + captainId, formData);
  }


  updateSportTeamCap(sportTeamId: number, nameTeam: string, updatedTeam: SportTeam, selectedFile: File): Observable<SportTeam> {
    const formData: FormData = new FormData();
    formData.append('nameTeam', nameTeam);
    formData.append('updatedTeam', JSON.stringify(updatedTeam));
    if (selectedFile) {
      formData.append('logo', selectedFile, selectedFile.name);
    }
    return this.httpClient.put<SportTeam>(`${this.baseURL}update-with-photo/${sportTeamId}`, formData);
  }
  
  

  addUserToSportTeam(sportTeamId: number, userId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}addUser/${sportTeamId}/${userId}`, {});
  }


  addUserByEmail(sportTeamId: number, userEmail: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}addUserByEmail/${sportTeamId}/${userEmail}`, {});
  }
  
  
  addUserByEmailToSportTeam(sportTeamId: number, userEmail: string): Observable<any> {
    const url = `${this.baseURL}${sportTeamId}/add-user?userEmail=${userEmail}`;
    return this.httpClient.post<any>(url, {});
  }
  
removeUserFromSportTeam(sportTeamId: number, userId: number): Observable<any> {
  const url = `${this.baseURL}removeUser/${sportTeamId}/${userId}`;
  return this.httpClient.post<any>(url, {});
}
  
  
  getUsersForSportTeam(teamId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}${teamId}/users`);
  }



  deleteSportTeam(sportTeamId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}delete/${sportTeamId}`);
  }
  

  participateSportTeam(sportTeamId: number, userId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}participateSportTeam/${sportTeamId}/${userId}`, null);
  }
  
  // cancelParticipationSportTeam(sportTeamId: number, userId: number): Observable<any> {
  //   return this.httpClient.post<any>(`${this.baseURL}cancelParticipateSportTeam/${sportTeamId}`, null, {
  //     headers: {
  //       userId: userId.toString()
  //     }
  //   });
  // }
  cancelParticipationSportTeam(sportTeamId: number, userId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}cancelParticipateSportTeam/${sportTeamId}/${userId}`, null);
  }
  
  countUsersJoinedInSportTeam(sportTeamId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}${sportTeamId}/user-count`);
  }
  

  isUserCaptain(userId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}user/${userId}/is-captain`);
  }

  isUserCaptainTeam(teamId: number, userId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}teams/${teamId}/captain/${userId}`);
  }

  makeTeamReservation(sportTeamId: number, captainId: number, fieldId: number, reservation: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}${sportTeamId}/reservations?captainId=${captainId}&fieldId=${fieldId}`, reservation);
  }

  getSportTeamIdByCaptainId(captainId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}captain/${captainId}`);
  }

  acceptUserToSportTeam(sportTeamId: number, userId: number): Observable<string> {
    return this.httpClient.post<string>(`${this.baseURL}${sportTeamId}/accept-user/${userId}`, {});
  }

}

