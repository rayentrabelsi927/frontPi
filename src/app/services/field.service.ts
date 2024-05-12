import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Field } from '../models/Field';
import { Observable } from 'rxjs';
import { ApiConfiguration } from './api-configuration';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FieldService {
  
  private baseURL = environment.apiUrl+'/Field';

  constructor(private httpClient: HttpClient, ) { }

  addField(field: Field): Observable<Field> {
    return this.httpClient.post<Field>(`${this.baseURL}/add`, field);
  }

  updateField(field: Field): Observable<Field> {
    return this.httpClient.put<Field>(`${this.baseURL}/update`, field);
  }

  getFieldById(numField: number): Observable<Field> {
    return this.httpClient.get<Field>(`${this.baseURL}/get/${numField}`);
  }

  deleteField(numField: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${numField}`);
  }

  getAllFields(): Observable<Field[]> {
    return this.httpClient.get<Field[]>(`${this.baseURL}/all`);
  }
}
