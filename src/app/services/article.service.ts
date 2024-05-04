import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private baseUrl = 'http://localhost:8089/projectARCTIC3/Articles'; 

  constructor(private http: HttpClient ) { }


  addArticle(label:string, description: string, category: string, price: number, condition: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('nameArticle', label);
    formData.append('descriptionArticle', description);
    formData.append('category', category);
    formData.append('priceArticle', price.toString());
    formData.append('conditionArticle', condition);
    formData.append('imgArticle', file, file.name);
    return this.http.post(`${this.baseUrl}/addArticle`, formData);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getConditions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/conditions`);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/ar`);
  }
  
  updateArticle(label: string, description: string, category: string, price: number, condition: string, file: File, articleId: number): Observable<any> {
    const formData = new FormData();
    formData.append('nameArticle', label); // Mettre à jour le champ 'nameArticle' avec la valeur de 'label'
    formData.append('descriptionArticle', description);
    formData.append('category', category);
    formData.append('priceArticle', price.toString());
    formData.append('conditionArticle', condition);
    formData.append('imgArticle', file, file.name);
    return this.http.put(`${this.baseUrl}/updateArticle/${articleId}`, formData);
}


  
  deleteArticle(articleId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${articleId}`);
  }

 
  getArticleById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${articleId}`);
  }
  getMaxPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/maxprice`);
  }

  getMinPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/minprice`);
  }
  
  
  filterArticles(category: string, condition: string, price: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/filtre`, {
      params: { category, condition, price }
    });
  }

  getUserIdByName(userName: string): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}/getUserIdByName?username=${userName}`).pipe(
      map(response => response)
    );
  }
  





  getCategoriesPercentage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories-percentage`);
  }

  getCategoriesCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories-count`);
  }

  getConditionsPercentage(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conditions-percentage`);
  }
  
  

}
