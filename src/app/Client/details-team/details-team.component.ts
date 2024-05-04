import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportTeam } from 'src/app/models/SportTeam';
import { User } from 'src/app/models/User';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-details-team',
  templateUrl: './details-team.component.html',
  styleUrls: ['./details-team.component.css']
})
export class DetailsTeamComponent implements OnInit {
  userEmail: string = ''; 
  sportTeamId: number =0;
  sportTeam: any = { nameTeam: '', logoTeam: '' };
  users: any[] = [];
  
    constructor(
      private sportTeamService: SportTeamService,
      private route: ActivatedRoute,
      private router: Router
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

    addUserToTeam(): void {
      if (this.userEmail) {
        this.sportTeamService.addUserByEmailToSportTeam(this.sportTeamId, this.userEmail).subscribe({
          next: (response: any) => {
            console.log('User added successfully:', response);
            // Refresh the users list after adding the user
            this.fetchUsersForSportTeam(this.sportTeamId);
          },
          error: (error: any) => {
            console.error('Error adding user:', error);
            this.fetchUsersForSportTeam(this.sportTeamId);

          }
        });
      } else {
        console.error('User email is required.');
      }
    }


    removeUserfromTeam(userId: number): void {
      if (userId) {
        this.sportTeamService.removeUserFromSportTeam(this.sportTeamId, userId).subscribe({
          next: (response: any) => {
            console.log('User removed successfully:', response);
            // Refresh the users list after removing the user
            this.fetchUsersForSportTeam(this.sportTeamId);
          },
          error: (error: any) => {
            console.error('Error removing user:', error);
            this.fetchUsersForSportTeam(this.sportTeamId);
          }
        });
      } else {
        console.error('User ID is required.');
      }
    }

    RemoveUserfromTeam(userId: number): void {
      if (userId) {
        this.sportTeamService.removeUserFromSportTeam(this.sportTeamId, userId).subscribe({
          next: (response: any) => {
            console.log('User removed successfully:', response);
            this.fetchUsersForSportTeam(this.sportTeamId);
          },
          error: (error: any) => {
            console.error('Error removing user:', error);
            this.fetchUsersForSportTeam(this.sportTeamId);
          }
        });
      } else {
        console.error('User ID is required.');
      }
    }

    navigateToUpdateTeamPage(teamId: number): void {
      this.router.navigate(['/update-team', teamId]);
    }
    
    
}