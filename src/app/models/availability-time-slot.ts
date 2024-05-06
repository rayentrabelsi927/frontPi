import { Housing } from "./housing";

export class AvailabilityTimeSlot {
    id: number;
    startTime: Date;
    endTime: Date;
    housing: Housing;
  
    constructor(id: number, startTime: Date, endTime: Date, housing: Housing) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.housing = housing;
    }
  }
