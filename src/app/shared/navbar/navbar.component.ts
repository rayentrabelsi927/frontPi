import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { CartArticleService } from 'src/app/services/cart-article.service';
import { FavoritesListService } from 'src/app/services/favorites-list.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  favoritesCount: number = 0;
  private cartSubscription: any;
  private listSubscription: any;
  userId:any;
  user:any;
  role:any;
  constructor(
   
    private cartService: CartArticleService,
    private favoritesList: FavoritesListService,
    private router: Router,private users :UserService,
    private token:TokenService
  ) { }

  
  ngOnInit(): void {
   this.role=sessionStorage.getItem("role");

    this.userId =this.token.currentUser();
    console.log("aaaaaaaaaa"+this.userId)

    this.user=this.users.getUserById(this.userId);

console.log(this.user);





    this.favoritesCount = this.favoritesList.countFavorites();
    this.cartItemCount = this.cartService.countArticles();

    this.cartSubscription = this.cartService.getCartChangedObservable().subscribe(() => {
      this.cartItemCount = this.cartService.countArticles();
    });

    this.listSubscription = this.favoritesList.getlistChangedObservable().subscribe(() => {
      this.favoritesCount = this.favoritesList.countFavorites();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }
  






  redirectToCart() {
    this.router.navigate(['/cart']);
}

redirectToFavorites() {
  this.router.navigate(['/favorites']);
}



}
