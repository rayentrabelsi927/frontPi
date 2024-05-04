import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-add-upadate-article',
  templateUrl: './add-upadate-article.component.html',
  styleUrls: ['./add-upadate-article.component.css']
})
export class AddUpadateArticleComponent {

  mode: 'ajout' | 'modification' = 'ajout'; 
  categories: string[] = [];
  conditions: string[] = [];
  selectedCategory: string = '';
  selectedCondition: string = '';
  description: string = '';
  label: string='';
price: number = 0; 
fileURL: string | ArrayBuffer | null = null;

  file: File | null = null;
 
  article: Article = {
    articleId: 0,
    nameArticle: '',
    descriptionArticle: '',
    categoryArticle: '',
    conditionArticle: '',
    priceArticle: 0,
    imgArticle: '',
    note: '' ,
    userName: ''
    
  };
  id!:number;
  constructor(private articleService: ArticleService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['articleId'];
    this.getCategories();
    this.getConditions();
    if (this.id) {
      this.mode = 'modification';
      this.loadArticle();
    }
}

loadArticle(): void {
    this.articleService.getArticleById(this.id).subscribe((article: Article) => {
        this.article = article;
        this.label = article.nameArticle;
        this.description = article.descriptionArticle;
        this.selectedCategory = article.categoryArticle;
        this.selectedCondition = article.conditionArticle;
        this.price = article.priceArticle;
        
        if (this.article.imgArticle) {
            console.log('Image loaded successfully');
        } else {
            console.error('Failed to load image');
        }
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
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.fileURL = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  

  addArticle(): void {
    if (!this.file) {
      console.error('Aucun fichier sélectionné');
      return;
    }
  
    this.articleService.addArticle(this.label,this.description, this.selectedCategory, this.price, this.selectedCondition, this.file)
      .subscribe(
        () => {
          console.log('Article ajouté avec succès');
         
          this.clearForm();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
          
        }
      );
  }
  


  updateArticle(): void {
 /*   const updatedFields: any = {};
  
    if (this.description.trim() !== '') {
      updatedFields.description = this.description;
    } else {
      updatedFields.description = this.article.descriptionArticle;
    }
  
    if (this.selectedCategory.trim() !== '') {
      updatedFields.category = this.selectedCategory;
    } else {
      updatedFields.category = this.article.categoryArticle;
    }
  
    if (this.price !== this.article.priceArticle) {
      updatedFields.price = this.price;
    } else {
      updatedFields.price = this.article.priceArticle;
    }
  
    if (this.selectedCondition.trim() !== '') {
      updatedFields.condition = this.selectedCondition;
    } else {
      updatedFields.condition = this.article.conditionArticle;
    }
  
    updatedFields.file = this.file !== null ? this.file : this.article.imgArticle;
  
    this.articleService.updateArticle(
      updatedFields.description,
      updatedFields.category,
      updatedFields.price,
      updatedFields.condition,
      updatedFields.file,
      this.id
    ).subscribe((response: any) => {
      console.log('Article mis à jour avec succès');
  
      this.clearForm();
  
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'article :', error);
    });*/
  }
  

  onSubmit(): void {
    if (this.mode === 'ajout') {
      this.addArticle(); 
    } else if (this.mode === 'modification') {
      this.updateArticle();
    }
  }
  

  clearForm(): void {
    this.selectedCategory = '';
    this.selectedCondition = '';
    this.description = '';
    this.price = 0;
    this.file = null;
    this.fileURL = null; 
  }
  
 



}




