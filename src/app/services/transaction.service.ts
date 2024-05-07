import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { statisticsFeedback } from '../models/statisticsFeedback';
import { transaction_ban } from '../models/transaction_ban';
import { statisticstransaction } from '../models/statisticsTransaction';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseURL = "http://localhost:8089/projectARCTIC3/Transaction/";

  constructor(private httpClient: HttpClient) { }
  

 
  getByIdIfBnned(id: number): Observable<transaction_ban> {
    return this.httpClient.get<transaction_ban>(`${this.baseURL}byId/${id}`);
  }

  findbyID(id: number): Observable<any> {
    console.log(id)
    return this.httpClient.get<any>(`http://localhost:8089/projectARCTIC3/User/${id}`);
  }

  getAll(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.baseURL + 'all');
  }
  
  getTransactionById(id: any): Observable<Transaction[]> {
    console.log(id)
    return this.httpClient.get<Transaction[]>(`${this.baseURL}transactionbyIdUser/${id}`);
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
  


stat(): Observable<statisticsFeedback> {
  return this.httpClient.get<statisticsFeedback>(this.baseURL + 'statistique');
}


stattransaction(): Observable<statisticstransaction> {
  return this.httpClient.get<statisticstransaction>(this.baseURL + 'statistiquetransaction');
}
}