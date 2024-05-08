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
  usersWithParticipation: any[] = [];
  usersWithoutParticipation: any[] = [];


  currentPage1: number = 1;
  itemsPerPage1: number = 3;
  currentPage2: number = 1;
  itemsPerPage2: number = 3;
  
    constructor(
      private sportTeamService: SportTeamService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

     // Pagination for users with participation
  get pagedUsersWithParticipation(): any[] {
    const startIndex = (this.currentPage1 - 1) * this.itemsPerPage1;
    return this.usersWithParticipation.slice(startIndex, startIndex + this.itemsPerPage1);
  }

  get pagesWithParticipation(): number[] {
    const totalPages = Math.ceil(this.usersWithParticipation.length / this.itemsPerPage1);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChangedWithParticipation(page: number): void {
    this.currentPage1 = page;
  }

  // Pagination for users without participation
  get pagedUsersWithoutParticipation(): any[] {
    const startIndex = (this.currentPage2 - 1) * this.itemsPerPage2;
    return this.usersWithoutParticipation.slice(startIndex, startIndex + this.itemsPerPage2);
  }

  get pagesWithoutParticipation(): number[] {
    const totalPages = Math.ceil(this.usersWithoutParticipation.length / this.itemsPerPage2);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChangedWithoutParticipation(page: number): void {
    this.currentPage2 = page;
  }

    fetchUsersForSportTeam(teamId: number): void {
      this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
        (data: any[]) => {
          this.usersWithParticipation = data.filter(user => user.participationTeam === true);
          console.log('Users with participation:', this.usersWithParticipation);
          this.usersWithoutParticipation = data.filter(user => user.participationTeam === false);
          console.log('Users without participation:', this.usersWithoutParticipation);
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
        userData.badge,
        userData.createdDate,
        userData.lastModifiedDate,
        userData.accountLocked,
        userData.enabled,
        userData.adresse
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


    acceptUser(userId: number): void {
      this.sportTeamService.acceptUserToSportTeam(this.sportTeamId, userId).subscribe(
        (response: any) => {
          console.log('User accepted successfully:', response);
          this.fetchUsersForSportTeam(this.sportTeamId);
        },
        (error: any) => {
          console.error('Error accepting user:', error);
          this.fetchUsersForSportTeam(this.sportTeamId);
        }
      );
    }
    

    navigateToUpdateTeamPage(teamId: number): void {
      this.router.navigate(['/update-team', teamId]);
    }
    
    
}