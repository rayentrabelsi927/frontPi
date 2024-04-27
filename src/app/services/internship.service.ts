import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Internship } from 'src/app/models/internship';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private baseUrl = "http://localhost:8089/projectARCTIC3/internships";

  constructor(private httpClient: HttpClient) { }

  createInternship(internship: Internship): Observable<Internship> {
    return this.httpClient.post<Internship>(`${this.baseUrl}/createInternship`, internship);
  }

  getAllInternships(): Observable<Internship[]> {
    return this.httpClient.get<Internship[]>(`${this.baseUrl}/getAllInternship`);
  }

  getInternshipById(internshipId: number): Observable<Internship> {
    return this.httpClient.get<Internship>(`${this.baseUrl}/getInternshipById/${internshipId}`);
  }

  updateInternship(internshipId: number, internship: Internship): Observable<Internship> {
    return this.httpClient.put<Internship>(`${this.baseUrl}/updateInternship/${internshipId}`, internship);
  }

  deleteInternship(internshipId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteInternship/${internshipId}`);
  }



////////////////FILEEE//////////////////////

  addFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(`${this.baseUrl}/addfile`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFiles(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/files`);
  }

  deleteFile(fileID: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/deleteFile/${fileID}`);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue lors de la tentative d\'ajout du fichier.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
