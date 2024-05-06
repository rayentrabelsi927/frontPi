import { Housing } from "./housing";

export class Transaction {
    transactionId: number;
    amountTransaction: number;
    payementDateTransaction: Date;
    housing: Housing; // Référence à l'objet Housing associé à cette transaction
  
    constructor(
      transactionId: number,
      amountTransaction: number,
      payementDateTransaction: Date,
      housing: Housing
    ) {
      this.transactionId = transactionId;
      this.amountTransaction = amountTransaction;
      this.payementDateTransaction = payementDateTransaction;
      this.housing = housing;
    }
}
