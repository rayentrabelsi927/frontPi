import { Feedback } from "./Feedback";

export class bannedUser {
    username!: String;
    idtransaction!: number;
    Feedback!: Feedback;
    
  
    constructor(
        username: String,
        idtransaction: number,
        Feedback: Feedback
      
    ) {
      this.username=username;
      this.idtransaction=idtransaction;
      this.Feedback=Feedback;
    
    }
  }