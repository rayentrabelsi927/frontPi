import { Feedback } from "./Feedback";
import { User } from "./User";

export class Transaction {
    transactionId!: number;
    amountTransaction!: number;
    payementDateTransaction!: Date;
    feedbacks!: Feedback[]; // Supposons que Feedback est un autre modèle
    articles!: any[]; // Supposons que Article est un autre modèle
    housing!: any;
    users!: User;

    constructor(
      transactionId: number,
      amountTransaction: number,
      payementDateTransaction: Date,
      feedbacks: Feedback[],
      articles: any[],
      housing:any
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