import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartArticleService } from 'src/app/services/cart-article.service';
import { FavoritesListService } from 'src/app/services/favorites-list.service';

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
  constructor(
   
    private cartService: CartArticleService,
    private favoritesList: FavoritesListService,
    private router: Router,
  ) { }

  
  ngOnInit(): void {
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
