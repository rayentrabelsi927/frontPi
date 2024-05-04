import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { FavoritesListService } from 'src/app/services/favorites-list.service';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { CartArticleComponent } from '../cart-article/cart-article.component';
import { CartArticleService } from 'src/app/services/cart-article.service';
import { HttpClient } from '@angular/common/http';
//import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  articles: any[] = [];
  categories: string[] = [];
  conditions: string[] = [];
  selectedCategory: string = '';
  selectedCondition: string = '';
  selectedPrice: number = 0; 
  filteredArticles: any[] = [];
  maxPrice: number = 0;
  minPrice: number = 0;
  priceStep: number = 1;
  recommendedArticles: Article[] = [];
 
  showPopupFlag: boolean = false;
  popupArticle: Article | null = null;
  paginatedArticles: any[] = [];


  constructor(
    private articleService: ArticleService,
    private router: Router,
    private favoritesList: FavoritesListService,
    private recommendationService: RecommendationService,
    private cartService: CartArticleService
    
   
  
   
  ) { }

  showPopup(article: Article): void {
    this.popupArticle = article;
    this.showPopupFlag = true;
  }

  closePopup(): void {
    this.showPopupFlag = false;
  }

  ngOnInit(): void {
    this.loadArticles();
    this.getCategories();
    this.getConditions();
  
    this.articleService.getMaxPrice().subscribe((maxPrice: number) => {
      this.maxPrice = maxPrice;
      this.articleService.getMinPrice().subscribe((minPrice: number) => {
        this.minPrice = minPrice;
        this.selectedPrice = minPrice; 
        this.priceStep = (maxPrice - minPrice) / 100; 
      });
    });
    this.getRecommendedArticles();
  
   /* this.paginator.page.subscribe((event) => {
      this.paginateArticles(event);
    });*/
  }    
  loadArticles() {
    this.articleService.getArticles().subscribe((data: any[]) => {
      this.articles = data;
      this.filteredArticles = data;
      console.log("il y'a", data);
    });
  }


  deleteArticle(articleId: number) {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        console.log('Article supprimé avec succès');
        this.loadArticles();
      }
    );
  }


  updateArticle(articleId: number) {
    console.log(articleId);
    this.router.navigate(['addArticle', { articleId: articleId }]);
  }

  addToFavoritesList(article: any): void {
    this.favoritesList.addToFavorites(article);
    console.log('Article ajouté à la liste :', article);
    
  }

  viewFavoritesList(): void {
    this.router.navigateByUrl('favorites');
  }

  getCategories(): void {
    this.articleService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getConditions(): void {
    this.articleService.getConditions()
      .subscribe(conditions => this.conditions = conditions);
  }


  filterArticles(): void {
    let filteredArticles = this.articles;
    if (this.selectedCategory) {
      filteredArticles = filteredArticles.filter(article => article.categoryArticle === this.selectedCategory);
    }
    if (this.selectedCondition) {
      filteredArticles = filteredArticles.filter(article => article.conditionArticle === this.selectedCondition);
    }
    if (this.selectedPrice) {
      filteredArticles = filteredArticles.filter(article => article.priceArticle <= this.selectedPrice);
    }
    this.filteredArticles = filteredArticles;
  }
  
  
  
  clear(): void {
    this.selectedCategory = '';
    this.selectedCondition = '';
    this.selectedPrice = 0;
    this.loadArticles();
  
    
  }
  
  getRecommendedArticles(): void {
    this.recommendationService.getRecommendedArticles().subscribe(recommendedArticles => {
      this.recommendedArticles = recommendedArticles;
    });
  }

  refreshRecommendedArticles(): void {
    const favoritesIds = this.favoritesList.getFavorites().map(fav => fav.articleId);
    this.recommendedArticles = this.recommendedArticles.filter(article => !favoritesIds.includes(article.articleId));
    console.log("recommendation", this.recommendedArticles);
  }
  
  viewArticleDetails(article: Article): void {
    this.router.navigate(['articleDetails', article.articleId]);
  }
  
  addToCart(article: any): void {
    this.cartService.addToCart(article);
    console.log('Article ajouté au panier :', article);
}
 

paginateArticles(event: any): void {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
}

  
}