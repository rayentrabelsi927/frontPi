import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CartArticleService } from 'src/app/services/cart-article.service';
import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { PaiementService } from 'src/app/services/paiement.service';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { transaction_ban } from 'src/app/models/transaction_ban';
import { User } from 'src/app/models/User';

const environment = {
  production: false,
  stripe: 'pk_test_51Oz6fDRqZpxfJakaVhNnthrrrLDDvwGzM9ob8vPtIknT9zSQZCKAVxwAmlsKAKtKpgjlvNvy69DYhnKmIRwEYqAG004YSQ4ePE', // Remplacez par votre clé publique Stripe
  serverUrl: '/api',
};

@Component({
  selector: 'app-cart-article',
  templateUrl: './cart-article.component.html',
  styleUrls: ['./cart-article.component.css']
})
export class CartArticleComponent implements OnInit {
  stripePromise = loadStripe(environment.stripe);

  cart: Article[] = [];
  totalCartPrice: number = 0; 
  totalsPerUser: { [key: string]: number } = {};
 articlesPerUser: { [key: string]: Article[] } = {};
 cartItemsFormatted: any[] = [];
 userId!:any;
  private baseUrl = 'http://localhost:8089/projectARCTIC3';
  possible: transaction_ban | undefined ;
  userget: any;





  constructor(private cartService: CartArticleService, private usertoken :TokenService,private http: HttpClient, private router: Router,private paiementService: PaiementService,private transactionservice : TransactionService, private articleService: ArticleService) {
    this.cart = this.cartService.getCart();

   
  }
  

  ngOnInit(): void {
    this.userId=this.usertoken.currentUser();
    this.transactionservice.getByIdIfBnned(this.userId).subscribe(data => {
      this.possible = data as transaction_ban;
      console.log(this.possible.banned); 
    });
    this.cart = this.cartService.getCart();
    this.calculateTotalPerUser();
    

  }
  calculateTotalPerUser() {
    this.http.get<any[]>(`${this.baseUrl}/Articles/all-with-userids-and-usernames`).subscribe(response => {
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
      console.log('Total per user:', this.totalsPerUser);
      console.log('Articles per user:', this.articlesPerUser);
    });
  }
  
  
  
 
  getArticlesUsedByUser(user: string): any[] {
    const articles = this.articlesPerUser[user] || [];
    console.log("Articles used by", user, ":", articles);
    return articles;
}

  async getArticlesUsedByUserAsJson(user: string) {
  const articles = this.getArticlesUsedByUser(user);
  const articlesJson = articles.map(article => ({
      "articleId": article[0], 
      "categoryArticle": article[1], 
      "conditionArticle": article[2], 
      "descriptionArticle": article[4]
  }));

  let abc: Number;
abc = this.totalsPerUser[user] as Number;
let result = abc.valueOf() * 100;
  const transaction =  {
    "amountTransaction": result,
    "feedbacks": [],
    "articles":articlesJson,
    "users":{"userId":this.userId} ,
    
  "housing":null
          
  };
  const transactionString = JSON.stringify(transaction);

  sessionStorage.setItem("transaction", transactionString);


  // Création de l'objet payment
  const payment = {
    name: "article",
    currency: 'usd',
    amount: result, // convertir dollars en cents
    quantity: '1',
    cancelUrl: 'http://localhost:4200/cancel',
    successUrl: 'http://localhost:4200/success',
  };

  const stripe = await this.stripePromise;
this.transactionservice.findbyID(this.userId).subscribe((user: User) => {
  this.userget = user;
  
  });







  // Appel de l'API backend pour démarrer le processus de paiement
  this.paiementService.processPayment(payment).subscribe((data: any) => {
    stripe?.redirectToCheckout({
      
      sessionId: data.id,
    }).then((result: any) => {
      // Vérifier si la redirection est un succès ou non
      if (result.error) {
        alert('Erreur lors de la redirection :'+ result.error.message);
        
      } else {
    sessionStorage.setItem("transaction","true" );
      }
    });
  });











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