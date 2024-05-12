import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminchartsService {

  constructor(private http: HttpClient) { }
  getCategoriesCount() {
    return this.http.get<any[]>(environment.apiUrl+'/Articles/categoriesCount');
  }

  getCountByCondition() {
    return this.http.get<any[]>(environment.apiUrl+'/Articles/countByCondition');
  }

  getCountByCategoryAndCondition() {
    return this.http.get<any[]>(environment.apiUrl+'/Articles/countByCategoryAndCondition');
  }
}

