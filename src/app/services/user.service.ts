import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User} from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8089/projectARCTIC3/User';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/all`);
  }

  updateUserLock(userId: number, user: User): Observable<User> {
    const url = `${this.baseURL}/lock/${userId}`;
    return this.httpClient.put<User>(url, user);
  }

  updateUserEnable(userId: number, user: User): Observable<User> {
    const url = `${this.baseURL}/enable/${userId}`;
    return this.httpClient.put<User>(url, user);
  }
  
  getUserById(id: String): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/${id}`);
  }

//   updateUser(user: User): Observable<User> {
//     return this.httpClient.put<User>(`${this.baseURL}/update`, user);
// }
}
