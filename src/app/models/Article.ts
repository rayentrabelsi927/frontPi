import { Transaction } from "./Transaction";
import { User } from "./User";

export class Article {
    articleId: number;
    nameArticle: string;
    categoryArticle: string;
    conditionArticle: string;
    imgArticle: string;
    descriptionArticle: string;
    priceArticle: number;
    users: User; 
    transactions?: Transaction; // Déclarer transactions comme optionnel

    constructor(
      articleId: number,
      nameArticle:string,
      categoryArticle: string,
      conditionArticle: string,
      imgArticle: string,
      descriptionArticle: string,
      priceArticle: number,
      users: User,
      transactions?: Transaction // Paramètre optionnel
    ) {
      this.articleId = articleId;
      this.nameArticle = nameArticle;

      this.categoryArticle = categoryArticle;
      this.conditionArticle = conditionArticle;
      this.imgArticle = imgArticle;
      this.descriptionArticle = descriptionArticle;
      this.priceArticle = priceArticle;
      this.users = users;
      this.transactions = transactions; // Affecter la valeur du paramètre optionnel
    }
}
