import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-all-sport-team',
  templateUrl: './all-sport-team.component.html',
  styleUrls: ['./all-sport-team.component.css']
})
export class AllSportTeamComponent {
  // sportTeam:SportTeam[]=[];
  errorMessage: any;
  valeurInput: string = '';
  sportTeam:any[]=[];
  userId!:any;

  currentPage: number = 1;
  itemsPerPage: number = 3

  constructor(private sportTeamService: SportTeamService,private router: Router,private userTok: TokenService) { }

  get pagedSportTeams(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sportTeam.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.sportTeam.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.getAllSportTeam();
    this.userId = this.userTok.currentUser();


  }

  getAllSportTeam(): void {
    this.sportTeamService.getAll().subscribe(
      (data: any[]) => {
        data.forEach(team => {
          console.log("team logo:", team.logoTeam); 
          this.sportTeamService.countUsersJoinedInSportTeam(team.teamId).subscribe(
            userCount => {
              this.sportTeam.push({ ...team, userCount });
            },
            error => {
              console.error('Error:', error);
            }
          );
        });
      }
    );
    
  }

  navigateToAddTeam(): void {
    this.router.navigate(['/add-team']);
  }

  navigateToUpdateTeamPage(teamId: number): void {
    this.router.navigate(['/update-team', teamId]);
  }
  
  navigateToDetailsTeamPage(teamId: number): void {
    this.router.navigate(['/details-team', teamId]);
  }
  

  navigateToDetails(teamId: number): void {
    
    this.sportTeamService.isUserCaptainTeam(teamId, this.userId).subscribe(
      isCaptain => {
        console.log("Is captain:", isCaptain); 
        if (isCaptain) {
          this.router.navigate(['/details-team', teamId]);
        } else {
          this.router.navigate(['/details-team-client', teamId]);
        }
      },
      error => {
        console.error('Error checking captain status:', error);
      }
    );
  }
  


  
}