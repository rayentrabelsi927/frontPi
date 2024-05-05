import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { bannedUser } from '../models/bannedUser';


  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  private baseURL = "http://localhost:8089/projectARCTIC3/feedBack/";

  constructor(private httpClient: HttpClient) { }
  
  getfeedbackList(): Observable<any>{
    return this.httpClient.get(this.baseURL + 'all', { responseType: 'json' });
  }
  getfeedbackById(id: String): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}get/${id}`);
  }

  removeban(id: number): Observable<any> {  
    return this.httpClient.delete(`${this.baseURL}delete/${id}`);  
  }

  addfeddback(feedBack:any): Observable<object> {  
    return this.httpClient.post(`${this.baseURL}`+'add', {
      
        "commentFeedback": feedBack.commentFeedback,
        "gradeFeedback": feedBack.gradeFeedback       
    });  
  } 
  
  getbanneduserList(): Observable<bannedUser>{
    return this.httpClient.get<bannedUser>(this.baseURL + 'badfeedback', { responseType: 'json' });
  }

  



}