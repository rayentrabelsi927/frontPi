import { Feedback } from "./Feedback";

export class Transaction {
    transactionId!: number;
    amountTransaction!: number;
    payementDateTransaction!: Date;
    feedbacks!: Feedback[]; // Supposons que Feedback est un autre modèle
    articles!: any[]; // Supposons que Article est un autre modèle
    housing!: any;
    users!: any;

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