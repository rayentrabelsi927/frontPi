import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FreelanceJob } from 'src/app/models/freelance';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class FreelanceService {

  private baseUrl = "http://localhost:8089/projectARCTIC3/freelance";

  constructor(private httpClient: HttpClient) { }


////////////////////////Freelance///////////////////////

// Ajouter un emploi freelance
addFreelanceJob(freelanceJob: FreelanceJob, userId:number): Observable<FreelanceJob> {
  return this.httpClient.post<FreelanceJob>(`${this.baseUrl}/addfreelance/${userId}`, freelanceJob);
}

// Mettre à jour un emploi freelance
updateFreelanceJob(freelanceJob: FreelanceJob): Observable<FreelanceJob> {
  return this.httpClient.put<FreelanceJob>(`${this.baseUrl}/updatefreelance`, freelanceJob);
}

// Obtenir un emploi freelance par ID
getFreelanceJobById(jobId: number): Observable<FreelanceJob> {
  return this.httpClient.get<FreelanceJob>(`${this.baseUrl}/getfreelance/${jobId}`);
}

// Supprimer un emploi freelance par ID
deleteFreelanceJob(jobId: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.baseUrl}/deletefreelance/${jobId}`);
}

// Obtenir tous les emplois freelance
getAllFreelanceJobs(): Observable<FreelanceJob[]> {
  return this.httpClient.get<FreelanceJob[]>(`${this.baseUrl}/allfreelance`);
}


}
