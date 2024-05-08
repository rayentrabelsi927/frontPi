import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-team-client',
  templateUrl: './details-team-client.component.html',
  styleUrls: ['./details-team-client.component.css']
})
export class DetailsTeamClientComponent implements OnInit {

  userEmail: string = ''; 
  sportTeamId: number = 0;
  sportTeam: any = { nameTeam: '', logoTeam: '' };
  users: any[] = [];
   
  joinButtonText: string = 'Join Team';
  joinButtonAction: () => void = this.participateSportTeam;
  buttonColor: any = 'primary';

  userId!:any;
  userIDD:number = 5;
  currentPage: number = 1;
  itemsPerPage: number = 3

  
  constructor(
    private sportTeamService: SportTeamService,
    private route: ActivatedRoute,
    private userTok: TokenService
  ) {}
 
  get pagedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }

  fetchUsersForSportTeam(teamId: number): void {
    this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
      (data: any[]) => {
        const usersWithParticipation = data.filter(user => user.participationTeam === true);
        this.users = usersWithParticipation.map(user => this.createUserFromApiResponse(user));
        this.pageChanged(1); 
      },
      (error: any) => {
        console.error('Error fetching users for sport team:', error);
      }
    );
  }
  
  createUserFromApiResponse(userData: any): User {
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
      userData.ownedHousing,
      userData.rentedHousing,
      userData.createdDate,
      userData.lastModifiedDate,
      userData.accountLocked,
      userData.enabled,
      userData.adresse
    );
  }

  ngOnInit(): void {
    this.userId = this.userTok.currentUser();
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
    this.participateSportTeamCheckAndRefreshButton();
  }

 
  participateSportTeam(): void {
    this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
      response => {
        console.log(response); 
        
        
        this.fetchUsersForSportTeam(this.sportTeamId);
        this.participateSportTeamCheckAndRefreshButton();
      },
      error => {
        console.error('Error joining team:', error); 
        
        this.fetchUsersForSportTeam(this.sportTeamId);
        this.participateSportTeamCheckAndRefreshButton();
      }
    );
  }
  
  
  participateSportTeamCheckAndRefreshButton(): void {
    this.sportTeamService.getUsersForSportTeam(this.sportTeamId).subscribe(
      (data: any[]) => {
        const user = data.find(user => user.userId === this.userId);
        if (user) {
          if (user.participationTeam) {
            this.joinButtonText = 'Leave Team';
            this.joinButtonAction = this.leaveTeam.bind(this);
          } else {
            this.joinButtonText = 'Cancel Application';
            this.joinButtonAction = this.cancelApplication.bind(this);
          }
        } else {
          this.joinButtonText = 'Join Team';
          this.joinButtonAction = this.participateSportTeam.bind(this);
        }
      },
      error => {
        console.error('Error fetching users for sport team:', error);
      },
      () => {
        this.updateButtonColor();
      }
    );
  }

  updateButtonColor(): void {
    if (this.joinButtonText === 'Join Team') {
      this.buttonColor = 'primary';
    } else {
      this.buttonColor = 'danger';
    }
  }

  
  joinTeam(): void {
    this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
      response => {
        console.log('Joined team successfully:', response);
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success!',
        //   text: 'Your application to the sport team has been sent. Please wait for the decision.',
        // });
       
        this.fetchUsersForSportTeam(this.sportTeamId);
        this.participateSportTeamCheckAndRefreshButton(); // Refresh button after joining
      },
      error => {
        console.error('Error joining team:', error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'You Are already in a Team!!',
        // });
        this.fetchUsersForSportTeam(this.sportTeamId);
        this.participateSportTeamCheckAndRefreshButton();
      }
    );
  }

  
  // leaveTeam(): void {
  //   this.sportTeamService.cancelParticipationSportTeam(this.sportTeamId, this.userId).subscribe(
  //     response => {
  //       console.log('Left team successfully:', response);
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //       this.participateSportTeamCheckAndRefreshButton(); 
  //     },
  //     error => {
  //       console.error('Error leaving team:', error);
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //       this.participateSportTeamCheckAndRefreshButton();
  //     }
  //   );
  // }
  leaveTeam(): void {
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to leave the team.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sportTeamService.cancelParticipationSportTeam(this.sportTeamId, this.userId).subscribe(
          response => {
            console.log('Left team successfully:', response);
            this.fetchUsersForSportTeam(this.sportTeamId);
            this.participateSportTeamCheckAndRefreshButton(); 
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to leave the team. Please try again later.',
            });
         
            
          },
          error => {
            console.error('Error leaving team:', error);
            this.fetchUsersForSportTeam(this.sportTeamId);
            this.participateSportTeamCheckAndRefreshButton();

            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'You have left the team successfully.',
            });
          }
        );
      }
    });
  }
  
  cancelApplication(): void {
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel your application to join the team.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sportTeamService.cancelParticipationSportTeam(this.sportTeamId, this.userId).subscribe(
          response => {
            console.log('Canceled application successfully:', response);
            this.fetchUsersForSportTeam(this.sportTeamId);
            this.participateSportTeamCheckAndRefreshButton();

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to cancel your application. Please try again later.',
            });
           
            
          },
          error => {
            console.error('Error canceling application:', error);
            this.fetchUsersForSportTeam(this.sportTeamId);
            this.participateSportTeamCheckAndRefreshButton();

          
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Your application has been canceled successfully.',
            });
          }
        );
      }
    });
  }

  // cancelApplication(): void {
  //   this.sportTeamService.cancelParticipationSportTeam(this.sportTeamId, this.userId).subscribe(
  //     response => {
  //       console.log('Canceled application successfully:', response);
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //       this.participateSportTeamCheckAndRefreshButton();
  //     },
  //     error => {
  //       console.error('Error canceling application:', error);
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //       this.participateSportTeamCheckAndRefreshButton();
  //     }
  //   );
  // }


  
}

