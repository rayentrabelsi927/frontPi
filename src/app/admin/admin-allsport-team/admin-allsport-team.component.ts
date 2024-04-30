import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportTeamService } from 'src/app/services/sport-team.service';

@Component({
  selector: 'app-admin-allsport-team',
  templateUrl: './admin-allsport-team.component.html',
  styleUrls: ['./admin-allsport-team.component.css']
})
export class AdminAllsportTeamComponent implements OnInit{
 // sportTeam:SportTeam[]=[];
 errorMessage: any;
 valeurInput: string = '';
 sportTeam:any[]=[];
 constructor(private sportTeamService: SportTeamService,private router: Router) { }

 ngOnInit(): void {
   this.getAllSportTeam();
  

 }



 getAllSportTeam(): void {
   this.sportTeamService.getAll().subscribe(
     (data:any[])=>{
       this.sportTeam=data;
     }
   )
 }



 navigateToAddTeam(): void {
   this.router.navigate(['admin/add-team']);
 }

 navigateToUpdateTeamPage(teamId: number): void {
   this.router.navigate(['admin/update-team', teamId]);
 }
 
 navigateToDetailsTeamPage(teamId: number): void {
   this.router.navigate(['admin/details-team', teamId]);
 }
 
 deleteSportTeam(sportTeamId: number): void {
  this.sportTeamService.deleteSportTeam(sportTeamId).subscribe(
    () => {
      console.log('Sport team deleted successfully.');
      this.getAllSportTeam()
    },
    (error) => {
      console.error('Error deleting sport team:', error);
    }
  );
}

}
