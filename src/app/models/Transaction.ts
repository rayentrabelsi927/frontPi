import { Article } from "./Article";
import { Feedback } from "./Feedback";
import { Housing } from "./Housing";
import { User } from "./User";

export class Transaction {
    transactionId!: number;
    amountTransaction!: number;
    payementDateTransaction!: Date;
    feedbacks!: Feedback[]; // Supposons que Feedback est un autre modèle
    articles!: Article[]; // Supposons que Article est un autre modèle
    housing!: Housing;
    users!: User;

    constructor(
      transactionId: number,
      amountTransaction: number,
      payementDateTransaction: Date,
      feedbacks: Feedback[],
      articles: Article[],
      housing:Housing
    ) {
      this.housing =housing;
      this.transactionId = transactionId;
      this.amountTransaction = amountTransaction;
      this.payementDateTransaction = payementDateTransaction;
      this.feedbacks = feedbacks;
      this.articles = articles;
      this.housing=housing;
    }
  }