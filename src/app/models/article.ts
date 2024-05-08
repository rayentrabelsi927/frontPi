import { User } from './User'; 

export interface Article {
    articleId: number;
    nameArticle: string;
    descriptionArticle: string;
    categoryArticle: string;
    conditionArticle: string;
    priceArticle: number;
    imgArticle: string;
    note: string;
    section?: string; 
    userName: string;
   
   
}

  