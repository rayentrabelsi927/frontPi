// import { Component, OnInit } from '@angular/core';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { ActivatedRoute } from '@angular/router';
// import { User } from 'src/app/models/User';
// import { SportTeamService } from 'src/app/services/sport-team.service';

// @Component({
//   selector: 'app-details-team-client',
//   templateUrl: './details-team-client.component.html',
//   styleUrls: ['./details-team-client.component.css']
// })
// export class DetailsTeamClientComponent implements OnInit {
  // currentPage = 1;
  // itemsPerPage = 3;
  // userEmail: string = ''; 
  // sportTeamId: number =0;
  // sportTeam: any = { nameTeam: '', logoTeam: '' };
  // users: any[] = [];
  // userId: number = 5; 
  
  //   constructor(
  //     private sportTeamService: SportTeamService,
  //     private route: ActivatedRoute
    
  //   ) {}

   

  //   fetchUsersForSportTeam(teamId: number): void {
  //     this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
  //       (data: any[]) => {
  //         this.users = data.map(user => this.createUserFromApiResponse(user));
  //       },
  //       (error: any) => {
  //         console.error('Error fetching users for sport team:', error);
  //       }
  //     );
  //   }
    
   
  //   private createUserFromApiResponse(userData: any): User {
  //     return new User(
  //       userData.userId,
  //       userData.username,
  //       userData.firstName,
  //       userData.lastName,
  //       userData.email,
  //       userData.password,
  //       userData.phone,
  //       userData.role,
  //       userData.imgUser,
  //       userData.lastLogin,
  //       userData.badge
  //     );
  //   }
    
  
  //   ngOnInit(): void {
  //     this.route.paramMap.subscribe(params => {
  //       this.sportTeamId = +params.get('id')!;
  //       console.log('Sport Team ID:', this.sportTeamId);
  //       this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
  //         (data: any) => {
  //           console.log('API Response:', data); 
  //           this.sportTeam.nameTeam = data.nameTeam; 
  //           this.sportTeam.logoTeam = data.logoTeam;
  //           this.fetchUsersForSportTeam(this.sportTeamId);
  //           console.log('Sport Team:', this.sportTeam);
  //         },
  //         error => {
  //           console.error('Error fetching sport team:', error);
  //         }
  //       );
  //     });
  //   }

  //   participateSportTeam(): void {
      
  //     this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
  //       response => {
  //         console.log(response); 
  //         this.fetchUsersForSportTeam(this.sportTeamId);
  //       },
  //       error => {
  //         console.error('Error joining team:', error); 
          
  //         this.fetchUsersForSportTeam(this.sportTeamId);
  //       }
  //     );
  //   }
  //   get pagedUsers(): User[] {
  //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //     return this.users.slice(startIndex, startIndex + this.itemsPerPage);
  //   }

  // userEmail: string = ''; 
  // sportTeamId: number = 0;
  // sportTeam: any = { nameTeam: '', logoTeam: '' };
  // users: any[] = [];
  // userId: number = 5; 
  // pagedUsers: any[] = [];
  // itemsPerPage: number = 3;
  // pageSize: number = 3; // Change this value based on your requirement

  // constructor(
  //   private sportTeamService: SportTeamService,
  //   private route: ActivatedRoute
  // ) {}

  // fetchUsersForSportTeam(teamId: number): void {
  //   this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
  //     (data: any[]) => {
  //       this.users = data.map(user => this.createUserFromApiResponse(user));
  //       this.pageChanged(1);  // Call pageChanged method to initialize pagination
  //     },
  //     (error: any) => {
  //       console.error('Error fetching users for sport team:', error);
  //     }
  //   );
  // }

  // createUserFromApiResponse(userData: any): User {
  //   return new User(
  //     userData.userId,
  //     userData.username,
  //     userData.firstName,
  //     userData.lastName,
  //     userData.email,
  //     userData.password,
  //     userData.phone,
  //     userData.role,
  //     userData.imgUser,
  //     userData.lastLogin,
  //     userData.badge
  //   );
  // }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.sportTeamId = +params.get('id')!;
  //     console.log('Sport Team ID:', this.sportTeamId);
  //     this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
  //       (data: any) => {
  //         console.log('API Response:', data); 
  //         this.sportTeam.nameTeam = data.nameTeam; 
  //         this.sportTeam.logoTeam = data.logoTeam;
  //         this.fetchUsersForSportTeam(this.sportTeamId);
  //         console.log('Sport Team:', this.sportTeam);
  //       },
  //       error => {
  //         console.error('Error fetching sport team:', error);
  //       }
  //     );
  //   });
  // }

  // participateSportTeam(): void {
  //   this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
  //     response => {
  //       console.log(response); 
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //     },
  //     error => {
  //       console.error('Error joining team:', error); 
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //     }
  //   );
  // }

  // pageChanged(page: number): void {
  //   const startIndex = (page - 1) * this.itemsPerPage;
  //   const endIndex = Math.min(startIndex + this.itemsPerPage, this.users.length);
  //   this.pagedUsers = this.users.slice(startIndex, endIndex);
  // }
// }
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

  // userEmail: string = ''; 
  // sportTeamId: number = 0;
  // sportTeam: any = { nameTeam: '', logoTeam: '' };
  // users: any[] = [];
  // userId: number = 5; 
  // pagedUsers: any[] = [];
  // itemsPerPage: number = 3;
  // pageSize: number = 3; // Change this value based on your requirement

  // constructor(
  //   private sportTeamService: SportTeamService,
  //   private route: ActivatedRoute
  // ) {}

  // fetchUsersForSportTeam(teamId: number): void {
  //   this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
  //     (data: any[]) => {
  //       this.users = data.map(user => this.createUserFromApiResponse(user));
  //       this.pageChanged(1); // Call pageChanged method to initialize pagination
  //     },
  //     (error: any) => {
  //       console.error('Error fetching users for sport team:', error);
  //     }
  //   );
  // }

  // createUserFromApiResponse(userData: any): User {
  //   return new User(
  //     userData.userId,
  //     userData.username,
  //     userData.firstName,
  //     userData.lastName,
  //     userData.email,
  //     userData.password,
  //     userData.phone,
  //     userData.role,
  //     userData.imgUser,
  //     userData.lastLogin,
  //     userData.badge
  //   );
  // }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.sportTeamId = +params.get('id')!;
  //     console.log('Sport Team ID:', this.sportTeamId);
  //     this.sportTeamService.getSportTeamById(this.sportTeamId.toString()).subscribe(
  //       (data: any) => {
  //         console.log('API Response:', data); 
  //         this.sportTeam.nameTeam = data.nameTeam; 
  //         this.sportTeam.logoTeam = data.logoTeam;
  //         this.fetchUsersForSportTeam(this.sportTeamId);
  //         console.log('Sport Team:', this.sportTeam);
  //       },
  //       error => {
  //         console.error('Error fetching sport team:', error);
  //       }
  //     );
  //   });
  // }

  // participateSportTeam(): void {
  //   this.sportTeamService.participateSportTeam(this.sportTeamId, this.userId).subscribe(
  //     response => {
  //       console.log(response); 
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //     },
  //     error => {
  //       console.error('Error joining team:', error); 
  //       this.fetchUsersForSportTeam(this.sportTeamId);
  //     }
  //   );
  // }

  // pageChanged(page: number): void {
  //   const startIndex = (page - 1) * this.itemsPerPage;
  //   const endIndex = Math.min(startIndex + this.itemsPerPage, this.users.length);
  //   this.pagedUsers = this.users.slice(startIndex, endIndex);
  // }
  sportTeamId: number = 0;
  sportTeam: any = { nameTeam: '', logoTeam: '' };
  users: any[] = [];
  pagedUsers: any[] = [];
  totalItems: number = 0;
  pageSize: number = 3; // Change this value based on your requirement
  currentPage: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(
    private sportTeamService: SportTeamService,
    private route: ActivatedRoute
  ) {}

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

  fetchUsersForSportTeam(teamId: number): void {
    this.sportTeamService.getUsersForSportTeam(teamId).subscribe(
      (data: any[]) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.pagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        this.changePage(this.currentPage);
      },
      (error: any) => {
        console.error('Error fetching users for sport team:', error);
      }
    );
  }

  
  paginate(array: any[], pageSize: number, pageNumber: number): any[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pagedUsers = this.paginate(this.users, this.pageSize, this.currentPage);
  }
}

