import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transaction';
import { statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseURL = "http://localhost:8089/projectARCTIC3/Transaction/";

  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.baseURL + 'all');
  }
  
  getTransactionById(id: String): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}get/${id}`);
  }

  addTransaction(transaction:any): Observable<Transaction> {  
    return this.httpClient.post<Transaction>(`${this.baseURL}`+'add', {
      "amountTransaction": transaction.amountTransaction,
        "payementDateTransaction": transaction.payementDateTransaction,
        "feedbacks": [],
        "articles": transaction.articles
    });  
  }  


  addTransaction2(transaction:any): Observable<Transaction> {  
    return this.httpClient.post<Transaction>(`${this.baseURL}`+'add2',transaction);  
  }  



  addFeedbackToTransaction(transactionId: number, feedbackData: any ): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}add/feedback/${transactionId}`, {
      "commentFeedback": feedbackData.commentaire,
      "gradeFeedback":feedbackData.rating

    });

  
}
  


stat(): Observable<statistics> {
  return this.httpClient.get<statistics>(this.baseURL + 'statistique');
}
}