import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SportTeam } from 'src/app/models/SportTeam';
import { SportTeamService } from 'src/app/services/sport-team.service';

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
  constructor(private sportTeamService: SportTeamService,private router: Router) { }

  ngOnInit(): void {
    this.getAllSportTeam();


  }


 
  // getAllSportTeam(): void {
  //   this.sportTeamService.getAll().subscribe(
  //     (data:any[])=>{
  //       this.sportTeam=data;
  //     }
  //   )
  // }

  getAllSportTeam(): void {
    this.sportTeamService.getAll().subscribe(
      (data: any[]) => {
        data.forEach(team => {
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
  

  
}