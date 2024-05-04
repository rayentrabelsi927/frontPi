import { Injectable } from '@angular/core';
import { FavoritesListService } from './favorites-list.service';
import { ArticleService } from './article.service';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

 
  constructor(private favorites: FavoritesListService, private articleService: ArticleService) { }

  getRecommendedArticles(): Observable<Article[]> {
    return this.articleService.getArticles().pipe(
      map(allArticles => {
        const favorites = this.favorites.getFavorites();
        const categoryCounts = new Map<string, number>();

        favorites.forEach(fav => {
          const count = categoryCounts.get(fav.categoryArticle) || 0;
          categoryCounts.set(fav.categoryArticle, count + 1);
        });

        let highestCategories: string[] = [];
        let highestCount = 0;
        categoryCounts.forEach((count, category) => {
          if (count > highestCount) {
            highestCount = count;
            highestCategories = [category];
          } else if (count === highestCount) {
            highestCategories.push(category);
          }
        });

        const recommendedArticles = allArticles.filter(article =>
          highestCategories.includes(article.categoryArticle) &&
          !favorites.some(fav => fav.articleId === article.articleId)
        );

        
        recommendedArticles.sort(() => Math.random() - 0.5);

        return recommendedArticles.slice(0, 3);
      })
    );
  }

}
