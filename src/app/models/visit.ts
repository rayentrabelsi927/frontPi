import { Housing } from "./Housing";
import { User } from "./User";

export class Visit {
  visiteID: number;
  description!: string;
  startDateTime: Date;
  endDateTime: Date;
  visiteur?: User;
  housing?: Housing;
  constructor(id: number, startDateTime: Date, endDateTime: Date, housing: Housing) {
    this.visiteID = id;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.housing = housing;
  }
}
