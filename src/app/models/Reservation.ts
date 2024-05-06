import { User } from './User'; 
import { Field } from './Field'; 

export interface Reservation {
  reservationId: number;
  startDate: Date; 
  endDate: Date; 
  nbPlayers: number;
  resStatus: Rstatus; // Use enum Rstatus from './Rstatus';
  resType: TypeR; // Use enum TypeR from './TypeR';
  users: User[]; 
  fields: Field; 
}

export enum Rstatus {
  Confirmed = 'confirmed',
  Pending = 'pending',
  Cancelled = 'cancelled',
  Finished = 'finished'
}

export enum TypeR {
  FreeForAll = 'FreeForAll',
  Closed = 'Closed'
}