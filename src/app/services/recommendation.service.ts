import { Injectable, OnInit } from '@angular/core';
import { FavoritesListService } from './favorites-list.service';
import { ArticleService } from './article.service';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService{


userId = this.userToken.currentUser();
  constructor(private favorites: FavoritesListService, private articleService: ArticleService,   private userToken: TokenService) { }

  getRecommendedArticles(): Observable<Article[]> {
    const userId = this.userToken.currentUser();
    if (userId === null) {
        throw new Error('User ID is null');
    }

    return this.articleService.getArticlesf(userId).pipe(
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