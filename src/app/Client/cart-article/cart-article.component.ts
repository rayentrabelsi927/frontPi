import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CartArticleService } from 'src/app/services/cart-article.service';


@Component({
  selector: 'app-cart-article',
  templateUrl: './cart-article.component.html',
  styleUrls: ['./cart-article.component.css']
})
export class CartArticleComponent implements OnInit {

  cart: Article[] = [];
  totalCartPrice: number = 0; 
  totalsPerUser: { [key: string]: number } = {};
 articlesPerUser: { [key: string]: Article[] } = {};

  private baseUrl = 'http://localhost:8089/projectARCTIC3';
 




  constructor(private cartService: CartArticleService, private http: HttpClient, private router: Router, private articleService: ArticleService) {
    this.cart = this.cartService.getCart();
    
  }
  

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalPerUser();
    

  }
  calculateTotalPerUser() {
    this.http.get<any[]>(`${this.baseUrl}/all-with-userids-and-usernames`).subscribe(response => {
      const articlesWithUserIdsAndUsernames = response;
  
      this.totalsPerUser = {};
      this.articlesPerUser = {};
  
      this.cart.forEach(cartItem => {
        const articleId = cartItem.articleId;
        const article = articlesWithUserIdsAndUsernames.find(a => a[0] === articleId);
  
        if (article) {
          const userName = article[8].replace(' null', '');
          const price = article[5];
  
          if (!this.totalsPerUser[userName]) {
            this.totalsPerUser[userName] = 0;
            this.articlesPerUser[userName] = [];
          }
  
          this.totalsPerUser[userName] += price;
          this.articlesPerUser[userName].push(article);
        }
      });
      //console.log('Total per user:', this.totalsPerUser);
      //console.log('Articles per user:', this.articlesPerUser);
    });
  }
  
  
  
  getFormattedUserName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.slice(0, parts.length - 1).join(' ');
  }

  displayUserItems(user: string): void {
    
    const parts = user.split(' ');
    const userId = parts.length > 2 ? parts[2] : ''; 
    const totalAmount = this.totalsPerUser[user];
    const userArticles = this.articlesPerUser[user];
    console.log('User ID:', userId);
    console.log('User Name:', `${parts[0]} ${parts[1]}`); 
    console.log('Total Amount:', totalAmount);
    console.log('Articles associés à', user, ':', userArticles);
  }
  


  getObjectKeys(obj: any) {
    const keys = Object.keys(obj);
    console.log('Object keys:', keys);
    return keys;
  }
  addToCart(article: Article): void {
    this.cartService.addToCart(article);
    this.cart = this.cartService.getCart();
    this.calculateTotalPerUser();
  }
  
  removeFromCart(articleId: number): void {
    this.cartService.removeFromCart(articleId);
    this.cart = this.cartService.getCart();
    this.calculateTotalPerUser();
  }
  
  clearCart(): void {
    this.cartService.clearCart();
    this.cart = this.cartService.getCart();
  }
  
  getTotal(): number {
    return this.cartService.getTotal();
  }
  
  redirectToArticleDetails(article: Article): void {
    this.router.navigate(['articleDetails', article.articleId]);
  }
  
  
  
}  