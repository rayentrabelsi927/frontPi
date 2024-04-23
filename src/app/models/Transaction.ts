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

   
  }