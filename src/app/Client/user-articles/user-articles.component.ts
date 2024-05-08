import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.css']
})
export class UserArticlesComponent implements OnInit{
  articles: any[] = [];
  userId!: any;
 


  constructor(
    private articleService: ArticleService,
    private router: Router,
    private userToken: TokenService
   
  ) { }

  ngOnInit(): void {
    this.userId = this.userToken.currentUser();
    if (this.userId) {
      this.loadArticles();
    }
  }
     


    loadArticles() {
      this.articleService.getItemsPerUser(this.userId).subscribe((articles: Article[]) => {
        this.articles = articles;
        console.log(articles);
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
      this.router.navigate(['addItem', { articleId: articleId }]);
    }

 
}
