import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  id!: number;
  article: Article = {
  articleId: 0,
  nameArticle:'',
  descriptionArticle: '',
  categoryArticle: '',
  conditionArticle: '',
  priceArticle: 0,
  imgArticle: '',
  note: '',
  userName: '',
  };
  
  constructor(
  private route: ActivatedRoute,
  private articleService: ArticleService
  ) { }
  
  ngOnInit(): void {
  this.id = this.route.snapshot.params['articleId'];
  this.loadArticle();
  }
  
  loadArticle(): void {
  this.articleService.getArticleById(this.id).subscribe((article: Article) => {
  this.article = article;
  if (this.article.imgArticle) {
  console.log('Image loaded successfully');
  } else {
  console.error('Failed to load image');
  }
  });
  }
  }