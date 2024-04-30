import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-details-team-client',
  templateUrl: './details-team-client.component.html',
  styleUrls: ['./details-team-client.component.css']
})
export class DetailsTeamClientComponent implements OnInit {
  
  userEmail: string = ''; 
  sportTeamId: number =0;
  sportTeam: any = { nameTeam: '', logoTeam: '' };
  users: any[] = [];
  userId: number = 5; 
  
    constructor(
      private sportTeamService: SportTeamService,
      private route: ActivatedRoute
    
    ) {}

   

    fetchUsersForSportTeam(teamId: number): void {
      this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
        (data: any[]) => {
          this.users = data.map(user => this.createUserFromApiResponse(user));
        },
        (error: any) => {
          console.error('Error fetching users for sport team:', error);
        }
      );
    }
    
   
    private createUserFromApiResponse(userData: any): User {
      return new User(
        userData.userId,
        userData.username,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.phone,
        userData.role,
        userData.imgUser,
        userData.lastLogin,
        userData.badge
      );
    }
    
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.sportTeamId = +params.get('id')!;
        console.log('Sport Team ID:', this.sportTeamId);
        this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
          (data: any) => {
            console.log('API Response:', data); 
            this.sportTeam.nameTeam = data.nameTeam; 
            this.sportTeam.logoTeam = data.logoTeam;
            this.fetchUsersForSportTeam(this.sportTeamId);
            console.log('Sport Team:', this.sportTeam);
          },
          error => {
            console.error('Error fetching sport team:', error);
          }
        );
      });
    }

    participateSportTeam(): void {
      
      this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
        response => {
          console.log(response); 
          this.fetchUsersForSportTeam(this.sportTeamId);
        },
        error => {
          console.error('Error joining team:', error); 
          
          this.fetchUsersForSportTeam(this.sportTeamId);
        }
      );
    }
}
