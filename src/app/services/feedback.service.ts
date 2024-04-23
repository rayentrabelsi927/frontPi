import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


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

  addfeddback(feedBack:any): Observable<object> {  
    return this.httpClient.post(`${this.baseURL}`+'add', {
      
        "commentFeedback": feedBack.commentFeedback,
        "gradeFeedback": feedBack.gradeFeedback       
    });  
  }  
  
}