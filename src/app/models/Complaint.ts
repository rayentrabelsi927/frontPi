
export class Complaint {
    complaintId!: number;
    descriptionComplaint!: string;
    statusComplaint!: Rstatus;
  }

  export enum Rstatus {
    Pending = 'pending',
    Prcoessed = 'processed'
  }