import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles-management',
  templateUrl: './articles-management.component.html',
  styleUrls: ['./articles-management.component.css']
})
export class ArticlesManagementComponent implements OnInit {
  articles: any[] = [];
  categories: string[] = [];
  conditions: string[] = [];

  


  constructor(
    private articleService: ArticleService,
    private router: Router,
   
    
   
  
   
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    this.getCategories();
    this.getConditions();
  
  }
  
   


  loadArticles() {
    this.articleService.getArticles().subscribe((data: any[]) => {
      this.articles = data;
    });
  }
  getCategories(): void {
    this.articleService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getConditions(): void {
    this.articleService.getConditions()
      .subscribe(conditions => this.conditions = conditions);
  }

  deleteArticle(articleId: number) {
    // Supprimer immédiatement l'article de la liste locale
    this.articles = this.articles.filter(article => article.articleId !== articleId);
    
    // Effectuer la suppression sur le serveur en arrière-plan
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        console.log('Article supprimé avec succès');
        // Pas besoin de recharger les articles ici, car la liste locale a déjà été mise à jour
      }
    );
  }
  
  
  updateArticle(articleId: number) {
    console.log(articleId);
    this.router.navigate(['admin/adminActions', { articleId: articleId }]);
  }
}


