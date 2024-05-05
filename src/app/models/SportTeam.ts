import { User } from './User'; 

export interface SportTeam {
  teamId: number;
  nameTeam: string;
  logoTeam: string;
  users: User[]; 
  captainId: User; 
}
