import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminchartsService {

  constructor(private http: HttpClient) { }
  getCategoriesCount() {
    return this.http.get<any[]>('http://localhost:8089/projectARCTIC3/Articles/categoriesCount');
  }

  getCountByCondition() {
    return this.http.get<any[]>('http://localhost:8089/projectARCTIC3/Articles/countByCondition');
  }

  getCountByCategoryAndCondition() {
    return this.http.get<any[]>('http://localhost:8089/projectARCTIC3/Articles/countByCategoryAndCondition');
  }
}

