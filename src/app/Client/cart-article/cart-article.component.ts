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
  articleList: any[] = [];

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
    this.http.get<any[]>(`${this.baseUrl}/Articles/all-with-userids-and-usernames`).subscribe(response => {
      const articlesWithUserIdsAndUsernames = response;
  
      this.totalsPerUser = {};
      this.articlesPerUser = {};
  
      this.cart.forEach(cartItem => {
        const articleId = cartItem.articleId;
        const article = articlesWithUserIdsAndUsernames.find(a => a[0] === articleId);
  console.log(article)

  

  const data = [1, "Technology", "Good", "chap2-1.jpg", "beau", 15, 3, null, "trabelsi rayen 3"];







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
  
  
  
  getFormattedUserName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.slice(0, parts.length - 1).join(' ');
  }

  displayUserItems(user: string): void {
    
    /*const parts = user.split(' ');
    const userId = parts.length > 2 ? parts[2] : ''; 
    const totalAmount = this.totalsPerUser[user];
    const userArticles = this.articlesPerUser[user];
    console.log('User ID:', userId);
    console.log('User Name:', `${parts[0]} ${parts[1]}`); 
    console.log('Total Amount:', totalAmount);
    console.log('Articles associés à', user, ':', userArticles);
    const articlesForUser = this.getArticlesByUserId(`${parts[0]} ${parts[1]}`);

    this.convertToArticle(userArticles);
for(const article of userArticles){
  console.log("1:"+article)

console.log ( this.convertToArticle(article))

}

console.log(this.articleList)*/

}

 getArticlesByUserId(userId: string): Article[] {
  const userArticles: Article[] = [];
  for (const article of this.cart) {
      if (article.userName === userId) {
          userArticles.push(article);
      }
  }
  return userArticles;
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
  

  convertToArticle(data: any): void {
    if (data && data.length === 9) { // Vérifie si les données sont présentes et complètes
        const articleId = data[0];
        const categoryArticle = data[1];
        const conditionArticle = data[2];
        const imgArticle = data[3];
        const descriptionArticle = data[4];
        const priceArticle = data[5];
        const userId = data[6];

        const articleObject = {
            "articleId": articleId,
            "categoryArticle": categoryArticle,
            "conditionArticle": conditionArticle,
            "imgArticle": imgArticle,
            "descriptionArticle": descriptionArticle,
            "priceArticle": priceArticle,
            "users": {
                "userId": userId
            }
        };

        this.articleList.push(articleObject);
    } else {
        console.log("Données invalides pour convertir en article :", data);
    }
}


    }


  
  
  
  
  
  
